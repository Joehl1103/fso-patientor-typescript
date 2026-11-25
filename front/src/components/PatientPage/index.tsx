// React hooks
import { useState, useEffect } from 'react';

// External libraries
import { useParams } from "react-router-dom";
import * as z from 'zod';

// Material UI
import { Divider, IconProps, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

// Shared types
import { Patient, Entry } from "../../types.ts";

// API services
import services from '../../services/patients';

// Local components
import EntryDisplay from './Entries/EntryDisplay.tsx';
import EntryForm from './Entries/EntryForm/index.tsx';
import Header from './Entries/EntryForm/Header.tsx';

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
			{/* Patient Info Table*/}
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
			{/* Patient Entries */}
      <div>
        <Typography variant='h5' className={styles.entriesHeading}>Entries</Typography>
				<Header setEntryFormVisible={setEntryFormVisible} entryFormVisible={entryFormVisible}/>
				<Divider/>
				{/* Entry Form */}
        {entryFormVisible
          ? <EntryForm
            setEntryFormVisible={setEntryFormVisible}
            patientId={params.id}
            setEntries={setEntries}
          />
          : null}
				{/* Individual Entries */}
				<Divider/>
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
