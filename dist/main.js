"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diContainer_1 = require("./diContainer");
const container = (0, diContainer_1.setupDI)();
const controller = container.resolve("controller");
controller.greet();
