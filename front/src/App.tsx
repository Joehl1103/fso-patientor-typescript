// React hooks
import { useState, useEffect, useMemo } from "react";

// External libraries
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Material UI
import { Box, Button, Container, Typography, IconButton } from '@mui/material';
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
import createAppTheme, { type ColorMode } from "./theme";

// Styles
import styles from "./App.module.css";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

	function handleSetMode(): void {
		const newMode =  mode === 'dark' ? 'light' : 'dark';
		setMode(newMode);
	}

	function ColorModeToggle(){
		return (
			<IconButton onClick={handleSetMode} color="inherit">
				{mode === 'dark' ? <LightModeIcon/> : <ModeNightIcon/>}
			</IconButton>
		);
	}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
					<Box className={styles.header}>
						<Box className={styles.menu}>
							<ColorModeToggle/>
							<Button className={styles.appHomeButton} component={Link} to="/" variant="contained" color="primary">
									Home
							</Button>
						</Box>
							<Typography className={styles.appHeader} variant="h3">
								Patientor
							</Typography>
					</Box>
          <Container className={styles.page}>
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} error={error} />} />
              <Route path="/:id" element={<PatientPage />} />
            </Routes>
          </Container>
					<Box className={styles.footer}>
						2025-26 by Joseph Loomis. <a href="https://github.com/Joehl1103/fso-patientor-typescript"><FontAwesomeIcon icon={faGithub} /></a>

					</Box>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
