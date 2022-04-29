interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase);
  }
}

let user1: Greetable;
user1 = new Person('Max');
// user1.name = 'Manu';

user1.greet('Hello');
console.log(user1);
