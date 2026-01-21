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

export function parseApiErrors(
  {error, setError}: {
    error: unknown, 
    setError: React.Dispatch<React.SetStateAction<string>>
  }
): void {
  if (axios.isAxiosError(error)) {
    if (error?.response?.data && typeof error?.response?.data === "string") {
      const message = error.response.data.replace('Something went wrong. Error: ', '');
      setError(message);
    } else if (error?.response?.data && 
               typeof error?.response?.data === "object" && 
               Array.isArray(error?.response?.data?.error)) {
      const errorMessageArray: string[] = error.response.data.error.map(err => {
        if (err.path.length === 0 || err.path.length > 1) {
          throw new Error(`Length of array for the zod error path is: ${err.path.length}`);
        }
        return `${err.message} for ${err.path}`;
      });
      
      if (errorMessageArray.length === 1) {
        setError(errorMessageArray[0]);
      } else if (errorMessageArray.length > 1) {
        setError(errorMessageArray.join(", "));
      } else {
        setError('Some other error');
      }
    } else {
      setError('Some other error');
    }
  } else {
    setError('Some other error');
  }
}
