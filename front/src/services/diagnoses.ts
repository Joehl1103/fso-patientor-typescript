import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

function validateDiagnoses(object: unknown): object is Diagnosis[] {
  if (!(typeof object === 'object') || !(object !== null)) {
    throw new Error('Item is not an object or is null.');
  }
  return 'code' in object && 'name' in object;
}

async function getDiagnoses(): Promise<Diagnosis[]> {
  const res = await axios.get(`${apiBaseUrl}/diagnoses`);
  res.data.forEach((i: unknown) => {
    if (!validateDiagnoses(i)) {
      throw new Error('Res are not diagnoses');
    }
  });
  return res.data;
}

async function getDiagnosisByCode(code: string): Promise<Diagnosis> {
  const res = await axios.get(`${apiBaseUrl}/diagnoses`);
  const diagnosis = res.data.filter((i: Diagnosis) => i.code === code);
  const numElements: number = diagnosis.length;
  if (numElements > 1) {
    throw new Error(`There are ${numElements} that corresponde to code: ${code}.`);
  }
  return diagnosis[0];
}

export default {
  getDiagnoses,
  getDiagnosisByCode
};
