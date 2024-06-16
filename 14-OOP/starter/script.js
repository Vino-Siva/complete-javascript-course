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
  console.log(2024 - this.birthYear);
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
    console.log(2024 - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.fullName}`);
  }
  get age() {
    return 2024 - this.birthYear;
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
    console.log(2024 - this.birthYear);
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
