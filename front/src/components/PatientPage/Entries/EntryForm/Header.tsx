import { Typography, Checkbox, Box } from '@mui/material';
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
        <Checkbox
          size="small"
          onChange={() => setEntryFormVisible(false)}
          className={styles.closeFormCheckbox}
        />
      </Box>
    </Box>
  );
}

export default Header;

