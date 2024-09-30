import { Config } from "./config";
import { Logger } from "./logger";
import { NameModel } from "./model";
import { ConsoleView } from "./view";

export class GreetingController {
  constructor(
    private model: NameModel,
    private view: ConsoleView,
    private Logger: Logger,
    private config: Config
  ) {}

  greet(): void {
    this.view.askForName((name) => {
      this.model.setName(name);
      const greeting = `${this.config.getGreeting()} ${this.model.getName()}!`;
      this.view.displayGreeting(greeting);
      this.Logger.log(`Greeted user: ${name}`);
      this.view.close();
    });
  }
}
