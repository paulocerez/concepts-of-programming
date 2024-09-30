"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIContainer = void 0;
exports.setupDI = setupDI;
const config_1 = require("./config");
const controller_1 = require("./controller");
const logger_1 = require("./logger");
const model_1 = require("./model");
const view_1 = require("./view");
// DI framework
class DIContainer {
    constructor() {
        this.container = new Map();
    }
    register(key, instance) {
        this.container.set(key, instance);
    }
    resolve(key) {
        const instance = this.container.get(key);
        if (!instance) {
            throw new Error(`No instance registered for key: ${key}`);
        }
        return instance;
    }
}
exports.DIContainer = DIContainer;
// manual dependency registration
function setupDI() {
    const container = new DIContainer();
    container.register("config", new config_1.Config());
    container.register("logger", new logger_1.Logger());
    container.register("model", new model_1.NameModel());
    container.register("view", new view_1.ConsoleView());
    container.register("controller", new controller_1.GreetingController(container.resolve("model"), container.resolve("view"), container.resolve("logger"), container.resolve("config")));
    return container;
}
