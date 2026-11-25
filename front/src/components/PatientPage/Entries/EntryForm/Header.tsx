// Material UI
import { Typography,Box,Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// Styles
import styles from "./Header.module.css";

interface Props {
	entryFormVisible: boolean
	setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToggleFormButtonProps {
	setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setEntryBool: boolean;
	iconName: IconDefinition;
	text: string;
}

function ToggleFormButton({ setEntryFormVisible,setEntryBool,iconName, text }: ToggleFormButtonProps ) {
	return (
		<div>
			<Button 
				onClick={() => setEntryFormVisible(setEntryBool)} 
				style={{backgroundColor: "white"}}>
				<FontAwesomeIcon icon={iconName} />&nbsp;{`${text}`}
			</Button>
		</div>
	);
}

function Header({ entryFormVisible, setEntryFormVisible }: Props) {
  return (
    <Box className={styles.headerRow}>
      <Typography variant='body1'>Add Entry</Typography>
      <Box className={styles.closeFormRow}>
				{
				entryFormVisible ? 
				<ToggleFormButton 
					setEntryFormVisible={setEntryFormVisible}
					setEntryBool={false}
					iconName={faX}
					text="Close Form"
					/> : 
				<ToggleFormButton 
					setEntryFormVisible={setEntryFormVisible}
					setEntryBool={true}
					iconName={faPlus}
					text="Add Entry"
					/>
				}
      </Box>
    </Box>
  );
}

export default Header;

