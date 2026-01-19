import test from 'node:test';
import assert from 'node:assert';
import diagnosesService from './diagnoses';

test('getByCode returns diagnosis', async () => {
  const diagnosis = await diagnosesService.getDiagnosisByCode('M24.2');
  assert.deepStrictEqual(diagnosis, {
    "code": "M24.2",
    "name": "Disorder of ligament",
    "latin": "Morbositas ligamenti"
  });
});
