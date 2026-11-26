import axios from "axios";
import { Patient, PatientFormValues, PatientListItem, Gender } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<PatientListItem[]> => {
  const { data } = await axios.get<PatientListItem[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export function validateNewPatient(object: PatientFormValues): PatientFormValues {
	const errors: string[] = [];
	const dobCorrect: boolean = /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(object.dateOfBirth);
	if(!dobCorrect){
		errors.push("Date of Birth must be in the following format: `DD-MM-YYYY`.");
	}
	const ssnCorrect: boolean = /^[\d]{3}-[\d]{3}-[\d]{4}$/.test(object.ssn);
	if(!ssnCorrect){
		errors.push("SSN must be in the following format: `XXX-XXX-XXXX`.");
	}
	const genderLC: string = object.gender.toLowerCase();
	const isMaleOrFemale: boolean = ["male","female"].includes(genderLC);
	if(!isMaleOrFemale){
		errors.push("Gender must be either `Male` or `Female`.");
	}
	if(errors.length > 0){
		throw new Error(errors.join(" "));
	}
	return {
		...object,
		gender: genderLC
	};
}

export const create = async (object: PatientFormValues): Promise<Patient> => {
	try {
	const validatedPatient: PatientFormValues = validateNewPatient(object);
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    validatedPatient
  );
  return data;
	} catch (e){
		if(e instanceof Error){
			throw new Error(e.message);
		}
	}
};

export default {
  getAll, getById, create
};

