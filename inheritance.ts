class Person {
  constructor(private firstName: string, private lastName: string) {}
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  describe(): string {
    return `This is ${this.firstName} ${this.lastName}.`;
  }
}

class Employee extends Person {
  constructor(firstName: string, lastName: string, private jobTitle: string) {
    super(firstName, lastName);
  }

  describe(): string {
    return super.describe() + ` I'm a ${this.jobTitle}.`;
  }
}

let employee = new Employee("John", "Doe", "Front-end Developer");
