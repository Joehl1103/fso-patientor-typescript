import data from './../data/diagnoses';
import { Diagnosis } from '../data/types';

function getDiagnoses(): Diagnosis[] {
  return data;
};

export default {
  getDiagnoses
};
