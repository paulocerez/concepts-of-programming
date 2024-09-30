import { GreetingController } from "./controller";
import { setupDI } from "./dependency";

const container = setupDI();
const controller = container.resolve<GreetingController>("controller");
controller.greet();
