'use strict';
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  // // Never create methods inside the constructor functions. It will create copies for each instances and impacts the performance
};
const vinoth = new Person('Vinoth', 1988);
// $ Using the 'new' keyword, the following 4 things happen:
// $ 1 . New {} object is created
// $ 2 . Function is called, 'this' keyword is set to the created {} object
// $ 3 . {} object is linked to prototype
// $ 4 . function automatically returns the {} object

console.log(vinoth);
console.log(vinoth instanceof Person);

Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};
console.log(Person.prototype);
console.log(vinoth.__proto__ === Person.prototype);

vinoth.calcAge();
console.log(Person.prototype.isPrototypeOf(vinoth));

console.log(vinoth.__proto__);
console.log(vinoth.__proto__.__proto__); //// This is the Object.prototype which is the top of the prototype chain
console.log(vinoth.__proto__.__proto__.__proto__);

const arr = [4, 4, 2, 6, 7, 4, 3, 2, 6, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// // We can create new methods in the Array.prototype. But its not recommended
Array.prototype.unique = function () {
  return [...new Set(this)]; // * this will return only the unique array elements
};
// $ We can call the unique method we defined in the prototype just like normal array methods
console.log(arr.unique());
const h1 = document.querySelector('h1');
console.dir(h1);

/////// Using ES6 Classes///////
class PersonCl {
  // * Classes can also be expressed like in this case, const PersonCl = class {}, like this.
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // $ Methods needs to be added outside the constructor function, to avoid repetition on its instances.
  // $ Methods created outside will be added to .prototype property. These are called Instance Methods.
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.fullName}`);
  }
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
  // * Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
  // $ The static method will not be added to the .prototype property. This method is dedicated to this class object only and will not be available to instances of this class.
  static hey() {
    console.log('Hey there!');
  }
}
const rudra = new PersonCl('Rudra Siva', 2023);
console.log(rudra);
rudra.fullName;

// // Points to be taken
// $ Classes are not hoisted. Even though function declarations are.
// $ Classes are First Class Citizens
// $ Classes are executed in strict mode

///// Using Object.create
const PersonProto = {
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  },
  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};
const buvi = Object.create(PersonProto);
buvi.init('Buvi Vinoth', 1996);
buvi.calcAge();
console.log(buvi);

// // Inheritance between classes using constructor functions
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// ? Linking Prototypes
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(
    ` Hello, my name is ${this.firstName} and I study ${this.course}`
  );
};
const vinodh = new Student('Vinoth', 1988, 'Javascript.');
vinodh.introduce();
vinodh.calcAge();
console.log(vinodh.__proto__);
console.log(vinodh.__proto__.__proto__);
console.log(vinodh instanceof Student);
console.log(vinodh instanceof Person); // * This is true because of the link, 'Student.prototype = Object.create(Person.prototype);'
console.log(vinodh instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// // Inheritance between classes using ES6 classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // $ super() must always happen first. It sets the this keyword to the Object returned from this constructor
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      ` Hello, my name is ${this.fullName} and I study ${this.course}`
    );
  }
  calcAge() {
    console.log(
      `I'm a ${new Date().getFullYear() - this.birthYear} years old student.`
    );
  }
}
const meenu = new StudentCl('Bhuvi Vinoth', 1996, 'Computer Science');
meenu.introduce();
meenu.calcAge();

// // Inheritance between classes using Object.create()
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (fullName, birthYear, course) {
  PersonProto.init.call(this, fullName, birthYear);
  this.course = course;
};
const siva = Object.create(StudentProto);
siva.introduce = function () {
  console.log(` Hello, my name is ${this.fullName} and I study ${this.course}`);
};
siva.init('Siva Vinodh', 1988, 'JavaScript');
siva.introduce();
siva.calcAge();
console.log(siva);

//// More class examples

// $ Public Fields
// $ Private Fields
// $ Public Methods
// $ Private Methods
// $ There is also a static method

class Account {
  // * Public fields needs to be declared over here before constructor
  // * Public fields (instances)
  locale = navigator.language;

  // * Private Fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // this._pin = pin;
    this.#pin = pin;
    // this._movements = []; // ? Protected Property with _ in front.
    // this.locale = navigator.language; // $ It's not necessary to specify the parameters.
    console.log(`Thanks for opening an account with us, ${this.owner}`);
  }

  // $ Public Interface
  deposit(amount) {
    // this._movements.push(amount);
    this.#movements.push(amount);
    return this;
  }
  withdraw(amount) {
    this.deposit(-amount);
    return this;
  }

  // _approveLoan(amount) {
  #approveLoan(amount) {
    return amount <= 5000 ? true : false;
  }

  static helper() {
    console.log(' Helper function');
  }

  requestLoan(amount) {
    // this._approveLoan(amount)
    if (this.#approveLoan(amount)) {
      console.log(
        `Thank you for banking with us ${this.owner}. Your loan request for the amount of US $ ${amount} is approved by the bank. It should be reflected in your bank account soon.`
      );
      this.deposit(amount);
      return this;
    } else {
      console.log(
        `Your loan request for the amount of US $ ${amount} is rejected by the bank. Please contact our nearest branch for more details. We apologize for the inconvenience.`
      );
      return this;
    }
  }
  getMovements() {
    // return this._movements;
    return this.#movements;
  }
}

const acc1 = new Account('John', 'USD', 1111);
acc1.deposit(500);
acc1.withdraw(50);
acc1.requestLoan(5000);
acc1.requestLoan(6000);
console.log(acc1.getMovements());
// console.log(acc1.#movements)   //// Not accessible outside class
console.log(acc1);

//// Chaining Methods
console.log(
  acc1
    .deposit(300)
    .deposit(500)
    .deposit(1300)
    .withdraw(200)
    .withdraw(150)
    .deposit(2500)
    .getMovements()
);
