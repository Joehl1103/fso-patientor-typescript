import { expect, test } from 'vitest';
import diagnosesService from './diagnoses';

test('getByCode returns diagnosis', async () => {
  const diagnosis = await diagnosesService.getDiagnosisByCode('M24.2');
  expect(diagnosis).toEqual({
    code: 'M24.2',
    name: 'Disorder of ligament',
    latin: 'Morbositas ligamenti',
  });
});
