// React hooks
import { useState, useEffect } from "react";

// External libraries
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Material UI
import { Button, Divider, Container, Typography, IconButton } from '@mui/material';
import { CssBaseline } from "@mui/material";
import { experimental_extendTheme as extendTheme,Experimental_CssVarsProvider,useColorScheme } from "@mui/material/styles";
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

// Styles
import styles from "./App.module.css";

const App = () => {
  const [patients, setPatients] = useState<PatientListItem[]>([]);
	const [error,setError] = useState<string>("");

// <CssVarsProvider theme={theme} modeStorageKey="themeMode">
	const theme = extendTheme({
			colorSchemes: { light: {}, dark: {} }
	});

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
		const { mode, setMode } = useColorScheme();
		return (
			<IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} color="inherit">
				{mode === 'dark' ? <LightModeIcon/> : <ModeNightIcon/>}
			</IconButton>
		);
	}

  return (
    <Experimental_CssVarsProvider theme={theme} modeStorageKey="themeMode">
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
    </Experimental_CssVarsProvider>
  );
};

export default App;
