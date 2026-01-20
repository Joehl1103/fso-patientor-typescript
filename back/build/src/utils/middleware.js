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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewPatientData = parseNewPatientData;
exports.parseNewEntryData = parseNewEntryData;
exports.errorMiddleware = errorMiddleware;
const patientValidation_1 = require("./patientValidation");
const entryValidation_1 = require("./entryValidation");
const types_1 = require("../data/types");
const z = __importStar(require("zod"));
const utilityFunctions_1 = require("./utilityFunctions");
function parseNewPatientData(req, _res, next) {
    try {
        patientValidation_1.patientDataSchema.parse(req.body);
        return next();
    }
    catch (e) {
        next(e);
    }
    next(new Error('Something went wrong'));
}
;
function parseNewEntryData(req, _res, next) {
    try {
        const body = req.body;
        if (!body.type) {
            throw new Error('Type is missing.');
        }
        const entry = body;
        switch (entry.type) {
            case types_1.EntryType.HEALTHCHECK:
                entryValidation_1.healthCheckEntrySchema.parse(entry);
                break;
            case types_1.EntryType.HOSPITAL:
                entryValidation_1.hospitalEntrySchema.parse(entry);
                break;
            case types_1.EntryType.OCCUPATIONAL:
                entryValidation_1.occupationalEntrySchema.parse(entry);
                break;
            default:
                (0, utilityFunctions_1.exhaustiveTypeGuard)(entry);
        }
        next();
    }
    catch (e) {
        next(e);
    }
}
;
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof z.ZodError) {
        return res.status(400).send({ error: err.issues });
    }
    else if (err instanceof Error) {
        return res.status(400).send({ error: err.message });
    }
    else {
        return res.status(400).send('Something went wrong.');
    }
}
;
//# sourceMappingURL=middleware.js.map