"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRating = exports.EntryType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
;
var EntryType;
(function (EntryType) {
    EntryType["HEALTHCHECK"] = "Healthcheck";
    EntryType["OCCUPATIONAL"] = "OccupationalHealthcare";
    EntryType["HOSPITAL"] = "Hospital";
})(EntryType || (exports.EntryType = EntryType = {}));
;
;
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
;
;
;
//# sourceMappingURL=types.js.map