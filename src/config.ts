export class Config {
  private greeting: string = "Hello";
  setGreeting(greeting: string): void {
    this.greeting = greeting;
  }

  getGreeting(): string {
    return this.greeting;
  }
}
