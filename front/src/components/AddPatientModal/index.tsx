// Material UI
import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import styles from "./AddPatientModal.module.css";

// Shared types
import { PatientFormValues } from "../../types";

// Local components
import AddPatientForm from "./AddPatientForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => Promise<void>;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog 
		PaperProps={{ className: styles.dialog }}
		fullWidth={true} 
		open={modalOpen} 
		onClose={() => onClose()}
	>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
