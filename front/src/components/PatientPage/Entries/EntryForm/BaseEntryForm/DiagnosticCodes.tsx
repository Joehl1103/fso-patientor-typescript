import { useState, useEffect } from 'react';
import { Box, InputLabel, Select, Button, MenuItem } from '@mui/material';
import diagnosesService from '../../../../../services/diagnoses';
import { BaseEntryFormTypes, Diagnosis } from '../../../../../types';
import { isDiagnosisCode } from '../utils';

function DiagnosisCodeDisplay({ diagnosisCodes }: { diagnosisCodes: Array<Diagnosis['code']> }) {
  return (
    <div>
      Current selected codes:{' '}
      {diagnosisCodes.length === 1 ? diagnosisCodes : diagnosisCodes.join(', ')}
    </div>
  );
}

interface Props {
  baseEntryFormData: BaseEntryFormTypes,
  setBaseEntryFormData: React.Dispatch<React.SetStateAction<BaseEntryFormTypes>>
}

function DiagnosticCodes(
  {
    baseEntryFormData,
    setBaseEntryFormData
  }: Props) {
  const [code, setCode] = useState<Diagnosis['code'] | "">("");
  const [diagnosticCodesToDisplay, setDiagnosticCodesToDisplay] = useState<string[]>([]);
  useEffect(() => {
    diagnosesService.getDiagnoses()
      .then((res: Diagnosis[]) => {
        const diagnosticCodes: Array<Diagnosis['code']> = res
          .map(i => i.code)
          .sort();
        setDiagnosticCodesToDisplay(diagnosticCodes);
      });
  }, []);


  function handleDiagnosisCodeSubmit(event: React.SyntheticEvent) {
    event?.preventDefault();
    if (!code || code.length == 0) {
      return;
    }
    const newDiagnosisCodeArray: Array<Diagnosis['code']> = [...baseEntryFormData.diagnosisCodes].concat(code);
    setBaseEntryFormData((prev: BaseEntryFormTypes) => {
      return {
        ...prev,
        diagnosisCodes: newDiagnosisCodeArray
      };
    });
  }

  function handleChange(value: unknown) {
    if (isDiagnosisCode(value)) {
      setCode(value);
    }
  }

  if (diagnosticCodesToDisplay.length === 0) {
    return <>No diagnostic codes to display...</>;
  }

  return (
    <div>
      <div>
        <InputLabel>Diagnostic Codes</InputLabel>
        <Select
          size="small"
          value={code}
          onChange={({ target }) => handleChange(target.value)}
        >
          {diagnosticCodesToDisplay.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
        <Button onClick={handleDiagnosisCodeSubmit}>add code</Button>
      </div>
      <Box>
        {baseEntryFormData.diagnosisCodes.length > 0 && <DiagnosisCodeDisplay diagnosisCodes={baseEntryFormData.diagnosisCodes} />}
      </Box>
    </div >
  );
}

export default DiagnosticCodes;
