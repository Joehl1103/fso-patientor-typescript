import { Box, Typography } from '@mui/material';
import { NotificationType } from '../../../../types.ts';

interface Props {
  message: string | undefined,
  type: NotificationType | undefined
}


function Notification({ message, type }: Props) {
  if (!message || !type) {
    return null;
  }

  const notificationStyleConfig = {
    backgroundColor: type === "Good" ? "#8bc34a" : "#f44336",
    padding: 2,
    margin: 1,
    textAlign: "center"
  };
  return (
    <Box sx={notificationStyleConfig}>
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}

export default Notification;
