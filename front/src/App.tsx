// React hooks
import { useState, useEffect, useMemo } from "react";

// External libraries
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Material UI
import { Button, Divider, Container, Typography, IconButton } from '@mui/material';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

// Shared types and config
import { apiBaseUrl } from "./constants";
import { PatientListItem } from "./types";

// API services
import patientService from "./services/patients";

// Local components
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import createAppTheme, { ColorMode } from "./theme";

// Styles
import styles from "./App.module.css";

const App = () => {
  const [patients, setPatients] = useState<PatientListItem[]>([]);
	const [error,setError] = useState<string>("");
  const [mode, setMode] = useState<ColorMode>(() => {
    return localStorage.getItem("themeMode") === "dark" ? "dark" : "light";
  });
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

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

	function ColorModeToggle(){
		return (
			<IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} color="inherit">
				{mode === 'dark' ? <LightModeIcon/> : <ModeNightIcon/>}
			</IconButton>
		);
	}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Container>
						<ColorModeToggle/>
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
