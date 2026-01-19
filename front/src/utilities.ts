import * as z from 'zod';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from './types';

export function exhaustiveTypeGuard(_: never): never {
  throw new Error(`${_} is not a valid type.`);
}

function isHospitalEntry(object: unknown): object is HospitalEntry {
  return typeof object === 'object' && object !== null && (object as Record<string, unknown>).type === "Hospital";
}

function isOccupationalHealthcareEntry(object: unknown): object is OccupationalHealthcareEntry {
  return typeof object === 'object' && object !== null && (object as Record<string, unknown>).type === "OccupationalHealthcare";
}


function isHealthCheckEntry(object: unknown): object is HealthCheckEntry {
  return typeof object === 'object' && object !== null && (object as Record<string, unknown>).type === "Healthcheck";
}

export function entryTypeValidator(object: unknown): Entry {
  return z.custom<Entry>(
    (object) => isHospitalEntry(object) || isOccupationalHealthcareEntry(object) || isHealthCheckEntry(object),
    { message: "Invalid entry type" }).parse(object);
}


