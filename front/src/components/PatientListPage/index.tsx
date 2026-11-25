// React hooks
import { useState } from "react";

// External libraries
import { Link } from 'react-router-dom';

// Material UI
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";

// Shared types
import { PatientFormValues, PatientListItem } from "../../types";

// API services
import patientService from "../../services/patients";

// Local components
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";

// Styles
import styles from "./patient-page.module.css";

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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
			<div>
				<Box>
					<Typography align="center" variant="h6">
						Patient list
					</Typography>
				</Box>
				<Table className={styles.patientTable}>
					<TableHead>
						<TableRow>
							<TableCell className={styles.patientName}>Name</TableCell>
							<TableCell className={styles.secondaryColumn}>Gender</TableCell>
							<TableCell className={styles.secondaryColumn}>Occupation</TableCell>
							<TableCell className={styles.ratingCell}>Health Rating</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.values(patients).map((patient: PatientListItem) => (
							<TableRow key={patient.id}>
								<TableCell className={styles.patientName}>
									<span >
										{patient.name}
										<Link to={`/${patient.id}`}>{" "}<FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.nameLink}/></Link>
									</span>
								</TableCell>
								<TableCell className={styles.secondaryColumn}>{patient.gender}</TableCell>
								<TableCell className={styles.secondaryColumn}>{patient.occupation}</TableCell>
								<TableCell className={styles.ratingCell}>
									<HealthRatingBar showText={false} rating={patient.rating} />
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
				<Box className={styles.buttonDiv}>
					<Button variant="contained" onClick={() => openModal()}>
						Add New Patient
					</Button>
				</Box>
			</div >
		);
}};

export default PatientListPage;


