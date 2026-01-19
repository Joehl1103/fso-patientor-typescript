export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female"
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum EntryType {
  HEALTHCHECK = "Healthcheck",
  OCCUPATIONAL = "OccupationalHealthcare",
  HOSPITAL = "Hospital"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}


export type HealthCheckRatingKeys = keyof typeof HealthCheckRating;

export interface HealthCheckEntry extends BaseEntry {
  type: typeof EntryType.HEALTHCHECK;
  healthCheckRating: HealthCheckRating;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: typeof EntryType.OCCUPATIONAL;
  employerName: string;
  sickLeave?: SickLeave

}

type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: typeof EntryType.HOSPITAL;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutSsn = Omit<Patient, "ssn">;

export interface BaseEntryFormTypes {
  description: string,
  specialist: string,
  date: string | null,
  diagnosisCodes: Array<Diagnosis['code']>,
  type: EntryType
}

interface SickLeaveInputData {
  startDate: string | null,
  endDate: string | null
}
interface DischargeInputData {
  date: string | null,
  criteria: string
}

export interface ConditionalData {
  healthCheckRatingKey: HealthCheckRatingKeys,
  employerName: string,
  sickLeave: SickLeaveInputData,
  discharge: DischargeInputData
}


export type NotificationType = "Good" | "Bad";
