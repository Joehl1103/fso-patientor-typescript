import { Typography, Checkbox, Box } from '@mui/material';
function Header({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Box style={{
      display: "flex",
      flexDirection: 'row',
      gap: 5
    }}>
      <Typography variant='body1'>Add Entry</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography
          variant='body2'
          sx={{ marginLeft: 1, marginTop: 0.6 }}
        >close form</Typography>
        <Checkbox
          size="small"
          onChange={() => setEntryFormVisible(false)}
          sx={{ paddingTop: 0 }}
        />
      </Box>
    </Box>
  );
}

export default Header;

