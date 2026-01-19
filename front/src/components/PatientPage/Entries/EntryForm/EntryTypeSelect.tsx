import { BaseEntryFormTypes, EntryType } from "../../../../types";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface Props {
  baseEntryFormData: BaseEntryFormTypes,
  setBaseEntryFormData: React.Dispatch<React.SetStateAction<BaseEntryFormTypes>>
}

function EntryTypeSelect({ baseEntryFormData, setBaseEntryFormData }: Props) {
  function handleEntryTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    switch (event.target.value) {
      case "Healthcheck":
        setBaseEntryFormData((_prev) => ({ ...baseEntryFormData, type: EntryType.HEALTHCHECK }));
        break;
      case "Occupational Healthcare":
        setBaseEntryFormData((_prev) => ({ ...baseEntryFormData, type: EntryType.OCCUPATIONAL }));
        break;
      case "Hospital":
        setBaseEntryFormData((_prev) => ({ ...baseEntryFormData, type: EntryType.HOSPITAL }));
        break;
      default:
        throw new Error(`${event.target.value} is not an entry type.`);
    }
  }
  return (
    <FormControl >
      <FormLabel sx={{ fontSize: 15 }}>Entry type</FormLabel>
      <RadioGroup
        defaultValue="Healthcheck"
        sx={{ display: "flex", flexDirection: 'row' }}
        onChange={handleEntryTypeChange}>
        {["Healthcheck", "Occupational Healthcare", "Hospital"].map(v => {
          return (
            <div key={v}>
              <FormControlLabel value={v} control={<Radio size="small" />} label={v} />
            </div>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default EntryTypeSelect;
