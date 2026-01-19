import * as z from 'zod';
import { EntryType, HealthCheckRating, Diagnosis } from '../data/types';

export const entrySchema = z.object({
  type: z.enum(EntryType),
});

export const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.custom<Array<Diagnosis['code']>>((val): val is Array<Diagnosis['code']> =>
    Array.isArray(val) && val.every(item => typeof item === 'string')
  ),
  type: z.string()
});

export const healthCheckEntrySchema = newBaseEntrySchema.extend({
  healthCheckRating: z.enum(HealthCheckRating)
});

export const occupationalEntrySchema = newBaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  })
});

export const hospitalEntrySchema = newBaseEntrySchema.extend({
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});


