// React hooks
import { useState, useEffect } from "react";

// External libraries
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Material UI
import { Button, Divider, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Shared types and config
import { apiBaseUrl } from "./constants";
import { PatientListItem } from "./types";

// API services
import patientService from "./services/patients";

// Local components
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

// Styles
import styles from "./App.module.css";

const App = () => {
  const [patients, setPatients] = useState<PatientListItem[]>([]);
	const [error,setError] = useState<string>("");

  useEffect(() => {
		axios.get<void>(`${apiBaseUrl}/ping`)
			.then((_) => {
				const fetchPatientList = async () => {
					const patients = await patientService.getAll();
					setPatients(patients);
				};
				setInterval(async () => fetchPatientList(),500);
			})
			.catch(e => {
				if(e instanceof Error){
					setError(e.message);
				}
			});
  }, []);
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Router>
          <Container>
            <Typography className={styles.appHeader} variant="h3">
              Patientor
            </Typography>
            <Button className={styles.appHomeButton} component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider className={styles.appDivider} />
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} error={error} />} />
              <Route path="/:id" element={<PatientPage />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
