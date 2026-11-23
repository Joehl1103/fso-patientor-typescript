// React hooks
import { useState, useEffect } from 'react';

// External libraries
import { useParams } from "react-router-dom";
import * as z from 'zod';

// Material UI
import { IconButton, IconProps, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

// Shared types
import { Patient, Entry } from "../../types.ts";

// API services
import services from '../../services/patients';

// Local components
import EntryDisplay from './Entries/EntryDisplay.tsx';
import EntryForm from './Entries/EntryForm/index.tsx';

// Styles
import styles from "./patient-page.module.css";

interface IParams {
  id: string;
}

const paramsSchema = z.object({
  id: z.string()
});

function RowAndCell({ left, right }: { left: string, right: string }) {

  return (
    <TableRow className={styles.patientRow} hover={true}>
      <TableCell align='left' className={styles.patientLabelCell}>{left}</TableCell>
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
    <div className={styles.entryFormHead}>
      <IconButton
        onClick={handleEntryFormCheck}
        size='small'
        className={styles.addEntryButton}
      >
        <AddIcon />
      </IconButton>
      <Typography
        variant="body2"
        className={styles.addEntryLabel}
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
      <Typography className={styles.patientName} variant='h4'>
        {patient.name}{' '}{patient.gender === 'male' ? <MaleIcon fontSize={iconSize} /> : <FemaleIcon fontSize={iconSize} />}
      </Typography>
      <div>
        <TableContainer className={styles.patientDisplayTableContainer} >
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
        <Typography variant='h5' className={styles.entriesHeading}>Entries</Typography>
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
