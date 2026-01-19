import dayjs, { Dayjs } from 'dayjs';
import { Diagnosis, HealthCheckRatingKeys } from '../../../../types';
import { exhaustiveTypeGuard } from '../../../../utilities';

export function convertDateToString(date: Dayjs | null | undefined): string {
  if (!date) {
    throw new Error('date is null or undefined.');
  }
  const year: string = date.year().toString();
  const month: string = (date.month() + 1).toString().length === 1 ? `0${(date.month() + 1).toString()}` : (date.month() + 1).toString();
  const day: string = date.date().toString();
  return `${year}-${month}-${day}`;
}

export function isDayjsObject(value: unknown): value is Dayjs {
  return typeof value === 'object' && value !== null && value !== undefined && dayjs.isDayjs(value);
}

export function isDiagnosisCode(value: unknown): value is Diagnosis['code'] {
  return typeof value === 'string' && value !== null && value !== undefined && value.length > 0;
}

export function getHealthCheckRating(healthCheckRatingKey: HealthCheckRatingKeys): HealthCheckRating {
  switch (healthCheckRatingKey) {
    case "Healthy":
      return 0;
    case "LowRisk":
      return 1;
    case "HighRisk":
      return 2;
    case "CriticalRisk":
      return 3;
    default:
      exhaustiveTypeGuard(healthCheckRatingKey);
  }
}
