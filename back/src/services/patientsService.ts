import { NewPatientEntry, Patient, NonSensitivePatient } from "../data/types";
import data from './../data/patients';
import { v1 as uuid } from 'uuid';
import { patientDataSchema } from "../utils/patientValidation";

function getPatients(): NonSensitivePatient[] {
  return data.map((patient: Patient): NonSensitivePatient => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
  });
}

function getPatientById(id: string) {
  const patientArray: Patient[] = data.filter((patient: Patient) => {
    return patient.id === id;
  });
  if (!patientArray || patientArray.length === 0) {
    throw new Error('There does not appear to be a patient with that id or something else went wrong.');
  };
  if (patientArray[0]) {
    const patient: Patient = patientArray[0];
    patientDataSchema.parse(patient);
    return patient;
  }
  throw new Error('Patient data is undefined.');
};

function addPatient(newPatientEntry: NewPatientEntry): Patient {
  const newPatient: Patient = {
    id: uuid(),
    ...newPatientEntry
  };
  return newPatient;
}

export default {
  getPatients,
  getPatientById,
  addPatient
};
