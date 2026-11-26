import { test, expect, describe } from "vitest";
import { create, validateNewPatient } from "./patients.ts";
import type { Patient, PatientFormValues } from "../types";	


test('creating returns a patient', async () => {
	// try {
		const patient: Patient = await create({
			name: "Joey Loomis",
			dateOfBirth: "2026-11-04",
			ssn: "002-223-5543",
			gender: "Male",
			occupation: "Something"
	});
expect(patient).toStrictEqual({
			id: expect.stringMatching(/[\w\d-]+/),
			name: "Joey Loomis",
			dateOfBirth: "2026-11-04",
		//TODO: this will need to change
			ssn: "002-223-5543",
			gender: "male",
			occupation: "Something",
			entries: [],
			rating: null
	});
});

describe("validating new patient data", () => {
	test('validate correct new patient data returns sanitized data', () =>  {
		const validatedPatient: PatientFormValues = validateNewPatient({
			name: "Joey Loomis",
			dateOfBirth: "2026-11-04",
			ssn: "002-223-5543",
			gender: "male",
			occupation: "Something"
		});	
		expect(validatedPatient).toStrictEqual({
			name: "Joey Loomis",
			dateOfBirth: "2026-11-04",
			ssn: "002-223-5543",
			gender: "male",
			occupation: "Something"
		});
	});

	test("bad gender, ssn, and dob returns a joined string", () => {
		expect(() => validateNewPatient({
			name: "joey loomis",
			dateOfBirth: "11-04-1111",
			ssn: "002-2232222",
			gender: "deer",
			occupation: "something"
		})).toThrow("Date of Birth must be in the following format: `DD-MM-YYYY`. SSN must be in the following format: `XXX-XXX-XXXX`. Gender must be either `Male` or `Female`.");
	});
});
