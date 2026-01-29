import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, Patient, EntryWithoutId } from '../data/types';
import { errorMiddleware, parseNewPatientData, parseNewEntryData } from '../utils/middleware';
const router = express.Router();
import * as z from 'zod';

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatients());
});

/**
 * Solution: https://stackoverflow.com/questions/74312002/how-to-use-express-js-req-params-with-typescript
 */
interface IParam {
  id: string;
}

router.get('/:id', (req: Request, res: Response) => {
  try {
    const params: unknown = req.params;
    if (!params || Object.keys(params).length === 0) {
      throw new Error('No parameters');
    }
    const { id } = params as unknown as IParam;
    if (!id) {
      throw new Error('No id parameter.');
    }
    const patient: Patient = patientsService.getPatientById(id);
    res.json(patient);
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(500).json(e.issues);
    } else if (e instanceof Error) {
      res.status(500).json(e.message);
    } else {
      res.status(500).json('Something went wrong');
    };
  };
});

router.post('/', parseNewPatientData, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NewPatientEntry>): Patient => {
  const newPatient: Patient = patientsService.addPatient(req.body);
  res.json(newPatient);
  return newPatient;
});

router.post('/:id/entries', parseNewEntryData, (req: Request<unknown, unknown, EntryWithoutId>, res: Response<EntryWithoutId>) => {
  const entry: EntryWithoutId = req.body;
  res.status(201).json(entry);
});

router.use(errorMiddleware);

export default router;
