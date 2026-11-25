// React hooks and types
import { useEffect, useState } from "react";

// Material UI
import { Box, Divider,Typography, Card, Chip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospital, faHelmetSafety, faHeart } from "@fortawesome/free-solid-svg-icons";

// Shared types
import { Diagnosis, Entry, EntryType, HealthCheckRating, SickLeave } from "../../../../types";

// API services and helpers
import diagnosesService from "../../../../services/diagnoses";
import { exhaustiveTypeGuard } from "../../../../utilities";

// Styles
import styles from "./EntryDisplay.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export async function fetchDiagnoses(codes: string[]) {
  return await Promise.all(
    codes.map(async (c) => await diagnosesService.getDiagnosisByCode(c))
  );
}

function DiagnosticCodes({ diagnoses }: { diagnoses: Diagnosis[] }) {
  return (
    <div>
			<p>Diagnostic codes:</p>
				<ul className={styles.diagnosisList}>
          {diagnoses.map((d) => (
            <li key={d.code}><Typography variant="body2">{`${d.code}: ${d.name}.`}</Typography></li>
          ))}
        </ul>
    </div >
  );
}

//TODO: keeping this so that I can set the icons dynamically
// function setTypeIcon(type: EntryType) {
//   switch (type) {
//     case EntryType.HEALTHCHECK:
//       return LocalHospitalIcon;
//     case EntryType.OCCUPATIONAL:
//       return EngineeringIcon;
//     case EntryType.HOSPITAL:
//       return DeviceThermostatIcon;
//     default:
//       exhaustiveTypeGuard(type);
//   }
// }

function setHealthIconClass(rating: HealthCheckRating) {
    switch (rating) {
      case HealthCheckRating["CriticalRisk"]:
        return styles.healthCritical;
      case HealthCheckRating["HighRisk"]:
        return styles.healthHigh;
      case HealthCheckRating["LowRisk"]:
        return styles.healthLow;
      case HealthCheckRating["Healthy"]:
        return styles.healthHealthy;
      default:
        exhaustiveTypeGuard(rating);
    }
  }

function renderSickLeave(sickLeave: SickLeave) {
    return (
      <div>
				<p>Sick Leave:</p>
        <ul className={styles.sickLeaveUL}>
          <li><Typography variant="body2"> Start: {sickLeave.startDate}</Typography></li>
          <li><Typography variant="body2">End: {sickLeave.endDate}</Typography></li>
        </ul>
      </div>
    );
  }

  

  function renderTypes(entry: Entry) {
    switch (entry.type) {
      case EntryType.HOSPITAL:
        return (
          <div className={styles.hospitalType} >
            <p className={styles.dischargeNote}><i>Discharge notes: discharged on {entry.discharge.date}: {entry.discharge.criteria}</i></p>
          </div>
        );
      case EntryType.HEALTHCHECK:
        const healthIconObject = {
          icon: FavoriteIcon,
          iconClassName: setHealthIconClass(entry.healthCheckRating)
        };
        return (
          <div>
						<p>Health rating:</p>
						{healthIconObject ? <healthIconObject.icon className={healthIconObject.iconClassName} /> : null}
          </div>
        );
      case EntryType.OCCUPATIONAL:
        return (
          <div>
            <p>Occupational Information</p>
						<p>Employer name: {entry.employerName}</p>
            {entry.sickLeave ? renderSickLeave(entry.sickLeave) : null}
          </div >
        );
      default:
        exhaustiveTypeGuard(entry);
    }
  }

function renderEntryIcon(entry: Entry){
	switch(entry.type){
		case EntryType.HOSPITAL:
			return <Chip icon={<FontAwesomeIcon icon={faHospital}/>} label="Hospital" size="medium" className={styles.hospitalChip}/>;
		case EntryType.OCCUPATIONAL:
			return <Chip icon={<FontAwesomeIcon icon={faHelmetSafety}/>} label="Occupational" size="medium" className={styles.occupationalChip}/>;
		case EntryType.HEALTHCHECK:
			return <Chip icon={<FontAwesomeIcon icon={faHeart}/>} label="Health check" size="medium" className={styles.healthcheckChip}/>;
		default:
			exhaustiveTypeGuard(entry);
		
	}
}

// Main
function EntryDisplay({ entry }: { entry: Entry }) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | []>([]);
  const diagnosticCodes: string[] | null = entry.diagnosisCodes ? entry.diagnosisCodes : null;
  useEffect(() => {
    if (diagnosticCodes) {
      fetchDiagnoses(diagnosticCodes)
        .then((diagnoses: Diagnosis[]) => {
          setDiagnoses(diagnoses);
        });
    }
  }, [diagnosticCodes]);

  return (
    <div>
      <Box className={styles.entryBlock}>
        <Card className={styles.entryBlockInner}>
					{/*Base*/}
          <div>
						{/*Type Icon*/}
						{renderEntryIcon(entry)}
						<p>{entry.date}</p>
						<div className={styles.baseEntryDisplay}>
							<p>{entry.description}</p>
							<p>Specialist: {entry.specialist}</p>
						</div>
					</div >
					{/*Diagnostic Codes*/}
          {diagnoses.length > 0 ? <DiagnosticCodes diagnoses={diagnoses} /> : null}
					{/*Variability by type*/}
          <div>{renderTypes(entry)}</div>
        </Card>
      </Box>
      <Divider />
    </div >
  );
}

export default EntryDisplay;
