"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingController = void 0;
class GreetingController {
    constructor(model, view, Logger, config) {
        this.model = model;
        this.view = view;
        this.Logger = Logger;
        this.config = config;
    }
    greet() {
        this.view.askForName((name) => {
            this.model.setName(name);
            const greeting = `${this.config.getGreeting()} ${this.model.getName()}!`;
            this.view.displayGreeting(greeting);
            this.Logger.log(`Greeted user: ${name}`);
            this.view.close();
        });
    }
}
exports.GreetingController = GreetingController;
