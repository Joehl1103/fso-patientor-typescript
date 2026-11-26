// react
import {useEffect, useState } from 'react';
import type { Dispatch,SetStateAction } from "react";
// Material UI
import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

// Shared types
import { PatientFormValues } from "../../types";

// Local components
import AddPatientForm from "./AddPatientForm";

// Styles
import styles from "./AddPatientModal.module.css";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => Promise<void>;
  error?: string;
	setError: Dispatch<SetStateAction<string>>
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error, setError }: Props) => {
	const [alertVisible,setAlertVisible] = useState<boolean>(false);
	useEffect(() =>{
		if(error && error.length > 1){
			setAlertVisible(true);
		}
	},[alertVisible,error]);
	
	function handleAlertVisibility(){
		setError("");
		setAlertVisible(false);
	}

	return (
		<Dialog 
			PaperProps={{ className: styles.dialog }}
			fullWidth={true} 
			open={modalOpen} 
			onClose={() => onClose()}
		>
			<DialogTitle>Add a new patient</DialogTitle>
			<Divider />
			<DialogContent>
				{alertVisible && <Alert className={styles.alert} data-testid="modal-alert" severity="error" onClose={handleAlertVisibility}>{error}</Alert>}
				<AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default AddPatientModal;
