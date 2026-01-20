import * as z from 'zod';
import { Gender } from '../data/types';
/**
 *  code for validating american ssns: .regex(/^(\d{3})\-(\d{2})\-(\d{4})$/),
 */
export declare const patientDataSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    dateOfBirth: z.ZodString;
    ssn: z.ZodString;
    gender: z.ZodEnum<typeof Gender>;
    occupation: z.ZodString;
    entries: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<typeof import("../data/types").EntryType>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=patientValidation.d.ts.map