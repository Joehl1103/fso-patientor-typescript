"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./../../app"));
void (0, node_test_1.test)('get patient by id', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667')
        .expect(200)
        .then(res => {
        node_assert_1.default.deepStrictEqual(res.body, {
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
                    description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
                    discharge: {
                        date: '2015-01-16',
                        criteria: 'Thumb has healed.',
                    },
                }
            ],
        });
    });
}));
void (0, node_test_1.describe)('add an entry for a patient', () => {
    const todayDate = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`;
    const baseEntryObject = {
        "description": "description",
        "date": todayDate,
        "specialist": "specialist",
        "diagnosisCodes": ["M24.2"]
    };
    const url = '/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries';
    void (0, node_test_1.test)('adding without type throws error ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(url)
            .send(baseEntryObject)
            .expect(400);
        node_assert_1.default.equal(response.status, 400);
        node_assert_1.default.equal(JSON.parse(response.text).error, "Type is missing.");
    }));
    void (0, node_test_1.test)('Healthcheck entry succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(url)
            .send(Object.assign(Object.assign({}, baseEntryObject), { type: "Healthcheck", healthCheckRating: 0 }))
            .expect(201);
        node_assert_1.default.deepStrictEqual(JSON.parse(res.text), {
            description: "description",
            date: todayDate,
            specialist: "specialist",
            diagnosisCodes: ["M24.2"],
            type: "Healthcheck",
            healthCheckRating: 0
        });
    }));
    void (0, node_test_1.test)('Occupational entry succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(url)
            .send(Object.assign(Object.assign({}, baseEntryObject), { type: "OccupationalHealthcare", employerName: 'employer', sickLeave: {
                startDate: "2025-12-01",
                endDate: "2025-12-01"
            } }))
            .expect(201);
        node_assert_1.default.deepStrictEqual(JSON.parse(res.text), {
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
    }));
    void (0, node_test_1.test)('Hospital entry succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(url)
            .send(Object.assign(Object.assign({}, baseEntryObject), { type: "Hospital", discharge: {
                date: "2025-12-01",
                criteria: "criteria"
            } }))
            .expect(201);
        node_assert_1.default.deepStrictEqual(JSON.parse(res.text), {
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
    }));
});
//# sourceMappingURL=patientsRoute.test.js.map