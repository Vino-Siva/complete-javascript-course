'use strict';
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.speed} km/h`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// bmw.brake();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();
// mercedes.brake();

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.speed} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    return (this.speed = speed * 1.6);
  }
}
const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();

console.log(ford);
