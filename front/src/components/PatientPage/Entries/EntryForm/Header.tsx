// Material UI
import { Typography,Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

// Styles
import styles from "./Header.module.css";
function Header({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Box className={styles.headerRow}>
      <Typography variant='body1'>Add Entry</Typography>
      <Box className={styles.closeFormRow}>
        <Typography
          variant='body2'
          className={styles.closeFormLabel}
        >close form</Typography>
        <CancelIcon
					className={styles.cancelIcon}
          fontSize="small"
          onClick={() => setEntryFormVisible(false)}
        />
      </Box>
    </Box>
  );
}

export default Header;

