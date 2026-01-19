import { Diagnosis, Entry, EntryType, SickLeave, HealthCheckRating } from "../../../types";
import { ComponentType, useEffect, useState } from "react";
import { SvgIconProps, Divider } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography } from "@mui/material";
import diagnosesService from "../../../services/diagnoses";
import { exhaustiveTypeGuard } from "../../../utilities";

// eslint-disable-next-line react-refresh/only-export-components
export async function fetchDiagnoses(codes: string[]) {
  return await Promise.all(
    codes.map(async (c) => await diagnosesService.getDiagnosisByCode(c))
  );
}

function DiagnosticCodes({ diagnoses }: { diagnoses: Diagnosis[] }) {
  return (
    <div>
      <ItemDivWithIcon
        icon={ChevronRightIcon}
        text={"Diagnostic codes:"} />
      <Box sx={{ marginLeft: 1.4 }} >
        <ul style={{ marginTop: 5, marginBottom: 5 }}>
          {diagnoses.map((d) => (
            <li key={d.code}><Typography variant="body2">{`${d.code}: ${d.name}.`}</Typography></li>
          ))}
        </ul>
      </Box>
    </div >
  );
}

function ItemDivWithIcon(
  { icon: Icon,
    text,
    typeIcon: _TypeIcon,
    healthIconObject }:
    {
      icon: ComponentType<SvgIconProps>,
      text: string,
      typeIcon?: ComponentType<SvgIconProps>,
      healthIconObject?: {
        icon: ComponentType<SvgIconProps>,
        iconColor: string
      }
    }
) {
  return (
    <div style={{ display: "flex", flexDirection: "row", columnGap: 5 }}>
      <Icon fontSize="small" />
      <Typography variant="body2" sx={{ marginTop: 0.5, marginBottom: 0 }}>{text}</Typography>
      {healthIconObject ? <healthIconObject.icon sx={{ color: healthIconObject.iconColor }} /> : null}
    </div>
  );
}

function setTypeIcon(type: EntryType) {
  switch (type) {
    case EntryType.HEALTHCHECK:
      return LocalHospitalIcon;
    case EntryType.OCCUPATIONAL:
      return EngineeringIcon;
    case EntryType.HOSPITAL:
      return DeviceThermostatIcon;
    default:
      exhaustiveTypeGuard(type);
  }
}

function BaseEntryDisplay({ entry }: { entry: Entry }) {
  const { type, date, description, specialist } = entry;
  const Icon = setTypeIcon(type);
  return (
    <div>
      <div >
        <ItemDivWithIcon
          icon={CalendarTodayIcon}
          text={date}
          typeIcon={Icon}
        />
      </div>
      <div style={{ marginLeft: 20 }}>
        <ItemDivWithIcon
          icon={ChevronRightIcon}
          text={description} />
        <ItemDivWithIcon
          icon={ChevronRightIcon}
          text={`Specialist: ${specialist}`}
        />
      </div>
    </div >
  );
}
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

  function renderSickLeave(sickLeave: SickLeave) {
    return (
      <div>
        <ItemDivWithIcon icon={ChevronRightIcon} text={"Sick Leave:"} />
        <ul style={{ marginLeft: 13, marginTop: 0 }}>
          <li><Typography variant="body2"> Start: {sickLeave.startDate}</Typography></li>
          <li><Typography variant="body2">End: {sickLeave.endDate}</Typography></li>
        </ul>
      </div>
    );
  }
  function setHealthIconColor(rating: HealthCheckRating) {
    switch (rating) {
      case HealthCheckRating["CriticalRisk"]:
        return 'red';
      case HealthCheckRating["HighRisk"]:
        return 'orange';
      case HealthCheckRating["LowRisk"]:
        return 'yellow';
      case HealthCheckRating["Healthy"]:
        return 'green';
      default:
        exhaustiveTypeGuard(rating);
    }
  }

  function renderTypes(entry: Entry) {
    switch (entry.type) {
      case EntryType.HOSPITAL:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
            <ItemDivWithIcon
              icon={ChevronRightIcon}
              text={`Discharge notes: discharged on ${entry.discharge.date}: ${entry.discharge.criteria}`}
            />
            <p style={{ padding: 0, paddingLeft: 5, margin: 0 }}><i></i></p>
          </div>
        );
      case EntryType.HEALTHCHECK:
        const healthIconObject = {
          icon: FavoriteIcon,
          iconColor: setHealthIconColor(entry.healthCheckRating)
        };
        return (
          <div>
            <ItemDivWithIcon
              icon={ChevronRightIcon}
              text={`Health rating:`}
              healthIconObject={healthIconObject}
            />
          </div>
        );
      case EntryType.OCCUPATIONAL:
        return (
          <div>
            <p>Occupational Information</p>
            <ItemDivWithIcon
              icon={ChevronRightIcon}
              text={`Employer name: ${entry.employerName}`}
            />
            {entry.sickLeave ? renderSickLeave(entry.sickLeave) : null}
          </div >
        );
      default:
        exhaustiveTypeGuard(entry);
    }
  }

  return (
    <div>
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <BaseEntryDisplay entry={entry} />
          {diagnoses.length > 0 ? <DiagnosticCodes diagnoses={diagnoses} /> : null}
          <div>{renderTypes(entry)}</div>
        </div>
      </div>
      <Divider />
    </div >
  );
}

export default EntryDisplay;
