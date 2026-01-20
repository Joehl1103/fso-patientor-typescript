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
exports.hospitalEntrySchema = exports.occupationalEntrySchema = exports.healthCheckEntrySchema = exports.newBaseEntrySchema = exports.entrySchema = void 0;
const z = __importStar(require("zod"));
const types_1 = require("../data/types");
exports.entrySchema = z.object({
    type: z.enum(types_1.EntryType),
});
exports.newBaseEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.custom((val) => Array.isArray(val) && val.every(item => typeof item === 'string')),
    type: z.string()
});
exports.healthCheckEntrySchema = exports.newBaseEntrySchema.extend({
    healthCheckRating: z.enum(types_1.HealthCheckRating)
});
exports.occupationalEntrySchema = exports.newBaseEntrySchema.extend({
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string()
    })
});
exports.hospitalEntrySchema = exports.newBaseEntrySchema.extend({
    discharge: z.object({
        date: z.string(),
        criteria: z.string()
    })
});
//# sourceMappingURL=entryValidation.js.map