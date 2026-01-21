import { Request, Response, NextFunction } from "express";
import { newPatientDataSchema } from "./patientValidation";
import {
  healthCheckEntrySchema,
  occupationalEntrySchema,
  hospitalEntrySchema
} from "./entryValidation";
import { EntryType, EntryWithoutId } from "../data/types";
import * as z from 'zod';
import { exhaustiveTypeGuard } from "./utilityFunctions";

export function parseNewPatientData(req: Request, _res: Response, next: NextFunction) {
  try {
    newPatientDataSchema.parse(req.body);
    return next();
  } catch (e: unknown) {
    next(e);
  }
};

export function parseNewEntryData(req: Request, _res: Response, next: NextFunction) {
  try {
    const body = req.body as EntryWithoutId;
    if (!body.type) {
      throw new Error('Type is missing.');
    }
    const entry: EntryWithoutId = body;
    switch (entry.type) {
      case EntryType.HEALTHCHECK:
        healthCheckEntrySchema.parse(entry);
        break;
      case EntryType.HOSPITAL:
        hospitalEntrySchema.parse(entry);
        break;
      case EntryType.OCCUPATIONAL:
        occupationalEntrySchema.parse(entry);
        break;
      default:
        exhaustiveTypeGuard(entry);
    }
    next();
  } catch (e: unknown) {
    next(e);
  }
};

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof z.ZodError) {
    console.error('error',err);
    return res.status(400).send({ error: err.issues });
  } else if (err instanceof Error) {
    console.error('error',err);
    return res.status(400).send({ error: err.message });
  } else {
    console.error('error',err);
    return res.status(400).send('Something went wrong.');
  }
};
