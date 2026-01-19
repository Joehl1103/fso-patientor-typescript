import { Box, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { ConditionalData, EntryType, HealthCheckRating, HealthCheckRatingKeys } from '../../../../../types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { convertDateToString } from '../utils';

interface Props {
  entryType: EntryType,
  conditionalData: ConditionalData,
  setConditionalData: React.Dispatch<React.SetStateAction<ConditionalData>>
}

function ConditionalEntryTypes(
  {
    entryType,
    conditionalData,
    setConditionalData
  }: Props) {
  function isHealthCheckRatingKey(value: unknown): value is HealthCheckRatingKeys {
    return typeof value === 'string' && value in HealthCheckRating && isNaN(Number(value));
  }
  const { startDate, endDate } = conditionalData.sickLeave;

  function handleChange(field: string, value: unknown) {
    if (!value) {
      throw new Error('No value provided.');
    }
    if (field === "healthCheckRatingKey") {
      if (isHealthCheckRatingKey(value)) {
        setConditionalData(prev => ({ ...prev, healthCheckRatingKey: value }));
      } else {
        throw new Error('value is incorrect for HealthCheckRatingKeys');
      }
    }
    if (field === "startDate" || field === "endDate") {
      if (dayjs.isDayjs(value)) {
        setConditionalData(prev => ({ ...prev, sickLeave: { ...prev.sickLeave, [field]: convertDateToString(value) } }));
      } else {
        throw new Error('value is not a dayjs object.');
      }
    }

    if (field === 'date') {
      if (dayjs.isDayjs(value)) {
        setConditionalData(prev => ({ ...prev, discharge: { ...prev.discharge, [field]: convertDateToString(value) } }));
      } else {
        throw new Error('value is not a dayjs object.');
      }
    }

  }
  switch (entryType) {
    case EntryType.HEALTHCHECK:
      return (
        <Box sx={{ marginTop: 2 }}>
          <InputLabel>Healthcheck rating:</InputLabel>
          <Select
            sx={{ width: 200 }}
            label="Healthcheck rating"
            value={conditionalData.healthCheckRatingKey}
            onChange={({ target }) => {
              handleChange("healthCheckRatingKey", target.value);
            }}>
            {Object.keys(HealthCheckRating)
              .filter(key => isNaN(Number(key)))
              .map((n: string) => {
                return (
                  <MenuItem key={n} dense={true} value={n}>{n}</MenuItem>
                );
              })}
          </Select>
          <br />

        </Box >
      );
    case EntryType.OCCUPATIONAL:
      return (
        <Box>
          <InputLabel>Employer name:</InputLabel>
          <TextField
            value={conditionalData.employerName}
            onChange={(e) => setConditionalData(
              (prev) => ({ ...prev, employerName: e.target.value }))
            }
            size="small"
          />
          <Box>
            <InputLabel>Sick leave</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box >
                <Box>
                  <InputLabel>Start</InputLabel>
                  <DatePicker
                    name="startDate"
                    value={startDate ? dayjs(startDate) : null}
                    onChange={(value) => { handleChange("startDate", value); }}
                    sx={{ width: 200 }}
                  />
                </Box>
                <Box>
                  <InputLabel>End</InputLabel>
                  <DatePicker
                    value={endDate ? dayjs(endDate) : null}
                    onChange={(value) => { handleChange("endDate", value); }}
                    sx={{ width: 200 }}
                  />
                </Box>
              </Box>
            </LocalizationProvider>
          </Box>
        </Box >
      );
    case EntryType.HOSPITAL:
      return (
        <Box>
          <Box sx={{ paddingBottom: 1 }}>
            <InputLabel sx={{ paddingBottom: 1 }}>Discharge</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="discharge date"
                value={conditionalData.discharge.date ? dayjs(conditionalData.discharge.date) : null}
                onChange={(value) => { handleChange("date", value); }}
                sx={{ width: 200 }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <TextField
              label="discharge criteria"
              value={conditionalData.discharge.criteria}
              onChange={
                ({ target }) => setConditionalData(
                  (prev) => (
                    {
                      ...prev,
                      discharge:
                      {
                        ...prev.discharge,
                        criteria: target.value
                      }
                    }
                  ))
              }
            />
          </Box>
        </Box>
      );
  }
}

export default ConditionalEntryTypes;
