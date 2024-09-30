"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor() {
        this.greeting = "Hello";
    }
    setGreeting(greeting) {
        this.greeting = greeting;
    }
    getGreeting() {
        return this.greeting;
    }
}
exports.Config = Config;
