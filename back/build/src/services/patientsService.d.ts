import { NewPatientEntry, Patient, PatientWithoutSsn } from "../data/types";
declare function getPatientsWithoutSsns(): PatientWithoutSsn[];
declare function getPatientById(id: string): Patient;
declare function addPatient(newPatientEntry: NewPatientEntry): Patient;
declare const _default: {
    getPatientsWithoutSsns: typeof getPatientsWithoutSsns;
    getPatientById: typeof getPatientById;
    addPatient: typeof addPatient;
};
export default _default;
//# sourceMappingURL=patientsService.d.ts.map