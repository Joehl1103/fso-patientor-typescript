"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("./../data/patients"));
const uuid_1 = require("uuid");
const patientValidation_1 = require("../utils/patientValidation");
function getPatientsWithoutSsns() {
    return patients_1.default.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: patient.entries
        };
    });
}
;
function getPatientById(id) {
    const patientArray = patients_1.default.filter((patient) => {
        return patient.id === id;
    });
    if (!patientArray || patientArray.length === 0) {
        throw new Error('There does not appear to be a patient with that id or something else went wrong.');
    }
    ;
    if (patientArray[0]) {
        const patient = patientArray[0];
        patientValidation_1.patientDataSchema.parse(patient);
        return patient;
    }
    throw new Error('Patient data is undefined.');
}
;
function addPatient(newPatientEntry) {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, newPatientEntry);
    return newPatient;
}
exports.default = {
    getPatientsWithoutSsns,
    getPatientById,
    addPatient
};
//# sourceMappingURL=patientsService.js.map