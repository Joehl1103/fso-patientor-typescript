import { describe, test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './../../app';

void test('patient list does not include entries', async () => {
  const response = await request(app)
    .get('/api/patients')
    .expect(200);
  
  const patients = response.body as Array<Record<string, unknown>>;
  assert.ok(patients.length > 0, 'Expected at least one patient in the response');
  
  for (const patient of patients) {
    assert.strictEqual(patient.entries, undefined, `Patient ${patient.name} should not have entries in list response`);
    assert.strictEqual(patient.ssn, undefined, `Patient ${patient.name} should not have ssn in list response`);
    assert.ok(patient.id, 'Patient should have id');
    assert.ok(patient.name, 'Patient should have name');
    assert.ok(patient.gender, 'Patient should have gender');
    assert.ok(patient.occupation, 'Patient should have occupation');
    assert.ok(patient.dateOfBirth, 'Patient should have dateOfBirth');
  }
});

void test('get patient by id', async () => {
  await request(app)
    .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667')
    .expect(200)
    .then(res => {
      assert.deepStrictEqual(res.body, {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": [
          {
            id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
            date: '2015-01-02',
            type: 'Hospital',
            specialist: 'MD House',
            diagnosisCodes: ['S62.5'],
            description:
              "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
            discharge: {
              date: '2015-01-16',
              criteria: 'Thumb has healed.',
            },
          }
        ],
      });
    });
});

void describe('add an entry for a patient', () => {
  const todayDate: string = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`;
  const baseEntryObject = {
    "description": "description",
    "date": todayDate,
    "specialist": "specialist",
    "diagnosisCodes": ["M24.2"]
  };
  const url = '/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries';
  void test('adding without type throws error ', async () => {
    const response = await request(app)
      .post(url)
      .send(baseEntryObject)
      .expect(400);
    assert.equal(response.status, 400);
    assert.equal((JSON.parse(response.text) as { error: string }).error, "Type is missing.");
  });

  void test('Healthcheck entry succeeds', async () => {
    const res = await request(app)
      .post(url)
      .send({
        ...baseEntryObject,
        type: "Healthcheck",
        healthCheckRating: 0
      })
      .expect(201);
    assert.deepStrictEqual(JSON.parse(res.text), {
      description: "description",
      date: todayDate,
      specialist: "specialist",
      diagnosisCodes: ["M24.2"],
      type: "Healthcheck",
      healthCheckRating: 0
    });
  });

  void test('Occupational entry succeeds', async () => {
    const res = await request(app)
      .post(url)
      .send({
        ...baseEntryObject,
        type: "OccupationalHealthcare",
        employerName: 'employer',
        sickLeave: {
          startDate: "2025-12-01",
          endDate: "2025-12-01"
        }
      })
      .expect(201);
    assert.deepStrictEqual(JSON.parse(res.text), {
      description: "description",
      date: todayDate,
      specialist: "specialist",
      diagnosisCodes: ["M24.2"],
      type: "OccupationalHealthcare",
      employerName: 'employer',
      sickLeave: {
        startDate: "2025-12-01",
        endDate: "2025-12-01"
      }
    });
  });

  void test('Hospital entry succeeds', async () => {
    const res = await request(app)
      .post(url)
      .send({
        ...baseEntryObject,
        type: "Hospital",
        discharge: {
          date: "2025-12-01",
          criteria: "criteria"
        }
      })
      .expect(201);
    assert.deepStrictEqual(JSON.parse(res.text), {
      description: "description",
      date: todayDate,
      specialist: "specialist",
      diagnosisCodes: ["M24.2"],
      type: "Hospital",
      discharge: {
        date: "2025-12-01",
        criteria: "criteria"
      }
    });
  });
});
