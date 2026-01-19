import express, { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import { Entry, Patient } from './../data/types';
const router = express.Router();
import patientService from "../services/patientsService";

router.post('/:id', (req: Request<{ id: string }, unknown, { entry: Entry, id: string }>, res: Response) => {
  const { entry: newEntry, id }: { entry: Entry, id: string } = req.body as { entry: Entry, id: string };
  const existingPatient: Patient = patientService.getPatientById(id);
  const entryWithId: Entry = { ...newEntry, id: uuid() };
  const updatedEntries: Entry[] = existingPatient.entries.concat(entryWithId);
  res.status(200).send(updatedEntries);
});

export default router;
