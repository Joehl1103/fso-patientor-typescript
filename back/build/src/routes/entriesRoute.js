"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
const patientsService_1 = __importDefault(require("../services/patientsService"));
router.post('/:id', (req, res) => {
    const { entry: newEntry, id } = req.body;
    const existingPatient = patientsService_1.default.getPatientById(id);
    const entryWithId = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v4)() });
    const updatedEntries = existingPatient.entries.concat(entryWithId);
    res.status(200).send(updatedEntries);
});
exports.default = router;
//# sourceMappingURL=entriesRoute.js.map