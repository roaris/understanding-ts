"use strict";
var Person = (function () {
    function Person(n) {
        this.age = 30;
        this.name = n;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase);
    };
    return Person;
}());
var user1;
user1 = new Person('Max');
user1.greet('Hello');
console.log(user1);
