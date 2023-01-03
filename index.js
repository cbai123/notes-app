console.log('The notes app is running');
class Hello {
  constructor(name) {
    this.name = name;
  };

  getHello() {
    console.log(`Hello ${this.name}!`);
  };
}

const hello = new Hello('Chris');
hello.getHello();