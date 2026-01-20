import * as z from 'zod';
import { EntryType, HealthCheckRating } from '../data/types';
export declare const entrySchema: z.ZodObject<{
    type: z.ZodEnum<typeof EntryType>;
}, z.core.$strip>;
export declare const newBaseEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodCustom<string[], string[]>;
    type: z.ZodString;
}, z.core.$strip>;
export declare const healthCheckEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodCustom<string[], string[]>;
    type: z.ZodString;
    healthCheckRating: z.ZodEnum<typeof HealthCheckRating>;
}, z.core.$strip>;
export declare const occupationalEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodCustom<string[], string[]>;
    type: z.ZodString;
    employerName: z.ZodString;
    sickLeave: z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const hospitalEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodCustom<string[], string[]>;
    type: z.ZodString;
    discharge: z.ZodObject<{
        date: z.ZodString;
        criteria: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=entryValidation.d.ts.map