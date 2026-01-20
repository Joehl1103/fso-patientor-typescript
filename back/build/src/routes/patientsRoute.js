"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
const z = __importStar(require("zod"));
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatientsWithoutSsns());
});
router.get('/:id', (req, res) => {
    try {
        const params = req.params;
        if (!params || Object.keys(params).length === 0) {
            throw new Error('No parameters');
        }
        const { id } = params;
        if (!id) {
            throw new Error('No id parameter.');
        }
        const patient = patientsService_1.default.getPatientById(id);
        res.json(patient);
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            res.status(500).json(e.issues);
        }
        else if (e instanceof Error) {
            res.status(500).json(e.message);
        }
        else {
            res.status(500).json('Something went wrong');
        }
        ;
    }
    ;
});
router.post('/', middleware_1.parseNewPatientData, (req, res) => {
    const newPatient = patientsService_1.default.addPatient(req.body);
    res.json(newPatient);
    return newPatient;
});
router.post('/:id/entries', middleware_1.parseNewEntryData, (req, res) => {
    const entry = req.body;
    res.status(201).json(entry);
});
router.use(middleware_1.errorMiddleware);
exports.default = router;
//# sourceMappingURL=patientsRoute.js.map