// Material UI
import { Typography,Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// Styles
import styles from "./Header.module.css";

interface Props {
	entryFormVisible: boolean
	setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


function Cancel({ setEntryFormVisible }: Omit<Props, "entryFormVisible">) {
	return (
		<div>
			<Typography
				variant='body2'
				className={styles.closeFormLabel}
			>
				close form
			</Typography>
			<CancelIcon
					className={styles.cancelIcon}
					fontSize="small"
					onClick={() => setEntryFormVisible(false)}
			/>
		</div>
	);
}

function Add({ setEntryFormVisible }: Omit<Props, "entryFormVisible">){
	return (
		<div>
			<Typography
        variant="body2"
        className={styles.addEntryLabel}
      >
				Open Form to add entry
			</Typography>
      <OpenInFullIcon 
				// className={}
				fontSize="small"
				onClick={() => setEntryFormVisible(true)}
			/>
		</div>
	);
}

function Header({ entryFormVisible, setEntryFormVisible }: Props) {
  return (
    <Box className={styles.headerRow}>
      <Typography variant='body1'>Add Entry</Typography>
      <Box className={styles.closeFormRow}>
				{entryFormVisible ? <Cancel setEntryFormVisible={setEntryFormVisible}/> : <Add setEntryFormVisible={setEntryFormVisible}/>}
      </Box>
    </Box>
  );
}

export default Header;

