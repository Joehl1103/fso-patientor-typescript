import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { apiBaseUrl } from "./constants";
import { PatientListItem } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

import PatientPage from "./components/PatientPage";

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
      <div className="App">
        <Router>
          <Container>
            <Typography className="app-header" variant="h3">
              Patientor
            </Typography>
            <Button className="app-home-button" component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider sx={{ margin: "1em 0",border: "none",borderTop: "1px solid black" }}/>
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
