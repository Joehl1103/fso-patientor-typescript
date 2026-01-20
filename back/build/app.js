"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosesRoute_1 = __importDefault(require("./src/routes/diagnosesRoute"));
const patientsRoute_1 = __importDefault(require("./src/routes/patientsRoute"));
const entriesRoute_1 = __importDefault(require("./src/routes/entriesRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/diagnoses', diagnosesRoute_1.default);
app.use('/api/patients', patientsRoute_1.default);
app.use('/api/entries', entriesRoute_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
exports.default = app;
//# sourceMappingURL=app.js.map