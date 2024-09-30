import { Config } from "./config";
import { GreetingController } from "./controller";
import { Logger } from "./logger";
import { NameModel } from "./model";
import { ConsoleView } from "./view";

// DI framework
export class DIContainer {
  private container: Map<string, any> = new Map();

  register<T>(key: string, instance: T): void {
    this.container.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.container.get(key);
    if (!instance) {
      throw new Error(`No instance registered for key: ${key}`);
    }
    return instance;
  }
}

// manual dependency registration
export function setupDI(): DIContainer {
  const container = new DIContainer();

  container.register("config", new Config());
  container.register("logger", new Logger());
  container.register("model", new NameModel());
  container.register("view", new ConsoleView());
  container.register(
    "controller",
    new GreetingController(
      container.resolve("model"),
      container.resolve("view"),
      container.resolve("logger"),
      container.resolve("config")
    )
  );

  return container;
}
