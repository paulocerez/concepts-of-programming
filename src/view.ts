import * as readline from "readline";

export class ConsoleView {
  private readline: readline.Interface;

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  askForName(callback: (name: string) => void): void {
    this.readline.question("Please enter your name: ", (name) => {
      callback(name);
    });
  }

  displayGreeting(greeting: string): void {
    console.log(greeting);
  }

  close(): void {
    this.readline.close();
  }
}
