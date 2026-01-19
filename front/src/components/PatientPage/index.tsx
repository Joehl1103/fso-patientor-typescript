import { useState, useEffect } from 'react';
import { Patient, Entry } from "../../types.ts";
import { useParams } from "react-router-dom";
import * as z from 'zod';
import services from '../../services/patients';
import { Typography, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddIcon from '@mui/icons-material/Add';
import { IconProps } from '@mui/material';
import EntryDisplay from './Entries/EntryDisplay.tsx';
import EntryForm from './Entries/EntryForm/index.tsx';

interface IParams {
  id: string;
}

const paramsSchema = z.object({
  id: z.string()
});

function RowAndCell({ left, right }: { left: string, right: string }) {

  return (
    <TableRow style={{ width: 200 }} hover={true}>
      <TableCell align='left' style={{ fontWeight: 'bold', width: 100 }} >{left}</TableCell>
      <TableCell align='left'>{right}</TableCell>
    </TableRow>
  );
}

function EntryFormDisplay(
  { entryFormVisible: _entryFormVisible, handleEntryFormCheck }: {
    entryFormVisible: boolean,
    handleEntryFormCheck(event: React.SyntheticEvent
    ): void
  }) {
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 0,
        paddingLeft: 0,
      }}>
      <IconButton
        onClick={handleEntryFormCheck}
        size='small'
        sx={{
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <AddIcon />
      </IconButton>
      <Typography
        variant="body2"
        sx={{ marginTop: 1.6 }}
      >add entry</Typography>
    </div>
  );
}
function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entryFormVisible, setEntryFormVisible] = useState<boolean>(false);
  const params: IParams = paramsSchema.parse(useParams());
  useEffect(() => {
    services.getById(params.id)
      .then(patient => {
        setPatient(patient);
        const entries: Entry[] = patient.entries;
        setEntries(entries);
      });
  }, [params.id]);

  if (!patient || Object.length === 0) {
    return <div>No patient to display...</div>;
  }

  function handleEntryFormCheck(event: React.SyntheticEvent) {
    event.preventDefault();
    setEntryFormVisible(true);
  }
  const iconSize: IconProps['fontSize'] = 'large';
  return (
    <div>
      <Typography variant='h4'>
        {patient.name}{' '}{patient.gender === 'male' ? <MaleIcon fontSize={iconSize} /> : <FemaleIcon fontSize={iconSize} />}
      </Typography>
      <div>
        <TableContainer style={{ marginTop: 40, marginBottom: 20, width: 300 }}>
          <Table size='small' >
            <TableBody>
              <RowAndCell key="dob" left={'Date of Birth:'} right={patient.dateOfBirth} />
              <RowAndCell key="occupation" left={'Occupation:'} right={patient.occupation} />
              <RowAndCell key="ssn" left={'SSN:'} right={patient.ssn} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Typography variant='h5' sx={{ marginBottom: 1.5 }}>Entries</Typography>
        {entryFormVisible
          ? <EntryForm
            setEntryFormVisible={setEntryFormVisible}
            patientId={params.id}
            setEntries={setEntries}
          />
          : <EntryFormDisplay
            entryFormVisible={entryFormVisible}
            handleEntryFormCheck={handleEntryFormCheck}
          />}
        {entries && entries.length > 0
          ? entries.map(e => {
            return (
              <div key={e.id}>
                <EntryDisplay entry={e} />
              </div>
            );
          })
          : <Typography variant="body1">No entries to display...</Typography>}
      </div>
    </div >
  );
}

export default PatientPage;
