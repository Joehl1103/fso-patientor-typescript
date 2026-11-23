import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import styles from "./patient-page.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { PatientFormValues, PatientListItem } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

import { Link } from 'react-router-dom';

interface Props {
  patients: PatientListItem[]
  setPatients: React.Dispatch<React.SetStateAction<PatientListItem[]>>
	error: string;
}

const PatientListPage = ({ patients, setPatients, error: errorFromApp }: Props) => {
	
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    const patient = await patientService.create(values);
    setPatients(patients.concat(patient));
    setModalOpen(false);
  };

	if(errorFromApp){
		switch(errorFromApp){
			case "Network Error":
				return <h2 className={styles.patientPageTemp}>503: Service Unavailable</h2>;
			default:
				return <h2 className={styles.patientPageTemp}>something else</h2>;
		}
	}

	if(patients.length === 0){
		return  (
			<Box className={styles.patientPageTemp}>
				<br/>
				<CircularProgress/>
				<p>Loading patients....</p>
			</Box>
		);
	} else {
		return (
			<div className="App">
				<Box>
					<Typography align="center" variant="h6">
						Patient list
					</Typography>
				</Box>
				<Table className={styles.patientTable}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell>Occupation</TableCell>
							<TableCell>Health Rating</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.values(patients).map((patient: PatientListItem) => (
							<TableRow key={patient.id}>
								<TableCell><Link to={`/${patient.id}`}>{patient.name}</Link></TableCell>
								<TableCell>{patient.gender}</TableCell>
								<TableCell>{patient.occupation}</TableCell>
								<TableCell>
									<HealthRatingBar showText={false} rating={1} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<AddPatientModal
					modalOpen={modalOpen}
					onSubmit={submitNewPatient}
					error={error}
					onClose={closeModal}
				/>
				<Button variant="contained" onClick={() => openModal()}>
					Add New Patient
				</Button>
			</div >
		);
}};

export default PatientListPage;
