// React hooks
import { useState, useEffect } from "react";

// External libraries
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Material UI
import { Button, Divider, Container, Typography, IconButton } from '@mui/material';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Shared types and config
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useMemo } from "react";
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
	const [mode,setMode] = useState<'light' | 'dark'>(() => {return(localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';});

	const theme = useMemo(
		() => createTheme({
			palette: {
				mode,
			}
		}),[mode]
	);

	function toggleColorMode(){
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	}

  useEffect(() => {
		localStorage.setItem('themeMode',mode);
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
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
			<IconButton onClick={toggleColorMode} color="inherit">
				{mode === 'dark' ? <LightModeIcon/> : <ModeNightIcon/>}
			</IconButton>
      <div className="App">
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

