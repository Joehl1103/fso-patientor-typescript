import { InputLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BaseEntryFormTypes } from '../../../../../types';
import DiagnosticCodes from './DiagnosticCodes';
import { isDayjsObject } from '../utils';
import { convertDateToString } from '../utils';
import dayjs from 'dayjs';

interface Props {
  baseEntryFormData: BaseEntryFormTypes,
  setBaseEntryFormData: React.Dispatch<React.SetStateAction<BaseEntryFormTypes>>,
}

function BaseEntryForm(
  {
    baseEntryFormData,
    setBaseEntryFormData,
  }: Props) {
  const excludedKeys: Array<string> = ['diagnosisCodes', 'date', 'type'];
  const baseEntryKeys: string[] = Object
    .keys(baseEntryFormData)
    .filter(k => !excludedKeys.includes(k)) as (keyof typeof baseEntryFormData)[];

  function handleBaseEntryFormChange(field: string, value: unknown) {
    if (!field || !value) {
      throw new Error('field or value empty for handleBaseEntryFormChange');
    }
    if (field === 'description' || field === 'specialist') {
      setBaseEntryFormData((prev) => {
        return {
          ...prev,
          [field]: value
        };
      });
    }
    if (field === 'date') {
      if (isDayjsObject(value)) {
        setBaseEntryFormData((prev) => {
          return {
            ...prev,
            date: convertDateToString(value)
          };
        });
      } else {
        throw new Error('value is not a Dayjs object.');
      }
    }
  }

  return (
    <div>
      <div>
        {
          baseEntryKeys.map((k: string) => {
            return (
              <div key={k}>
                <InputLabel>{k}</InputLabel>
                <TextField
                  name={k}
                  value={baseEntryFormData[k as keyof typeof baseEntryFormData]}
                  onChange={({ target }) => handleBaseEntryFormChange(target.name, target.value)}
                  size="small"
                />
                <br />
              </div>
            );
          })
        }
      </div>
      <div>
        <InputLabel>Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={baseEntryFormData.date ? dayjs(baseEntryFormData.date) : null}
            onChange={(value) => handleBaseEntryFormChange('date', value)}
          />
        </LocalizationProvider>
      </div>
      <DiagnosticCodes
        baseEntryFormData={baseEntryFormData}
        setBaseEntryFormData={setBaseEntryFormData}
      />
    </div >
  );
}

export default BaseEntryForm;

