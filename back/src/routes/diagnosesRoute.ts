import express from 'express';
import { Request, Response } from 'express';
import { Diagnosis } from '../data/types';
import diagnosesService from '../services/diagnosesService';
const router = express.Router();

 
router.get('/', (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
