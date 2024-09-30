export class NameModel {
  private name: string = "";
  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
