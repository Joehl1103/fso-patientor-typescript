import test from 'node:test';
import assert from 'node:assert';
import { fetchDiagnoses } from './EntryDisplay';
import { Diagnosis } from '../../../types';

test('returns diagnoses from codes', async () => {
  const codes: string[] = ['M24.2', 'M51.2'];
  const diagnoses: Diagnosis[] = await fetchDiagnoses(codes);
  assert.deepStrictEqual(diagnoses, [
    {
      "code": "M24.2",
      "name": "Disorder of ligament",
      "latin": "Morbositas ligamenti"
    },
    {
      "code": "M51.2",
      "name": "Other specified intervertebral disc displacement",
      "latin": "Alia dislocatio disci intervertebralis specificata"
    }]);
});
