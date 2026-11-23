import { Box, Typography } from '@mui/material';
import { NotificationType } from '../../../../types.ts';
import styles from "./Notification.module.css";

interface Props {
  message: string | undefined,
  type: NotificationType | undefined
}


function Notification({ message, type }: Props) {
  if (!message || !type) {
    return null;
  }

  const notificationClass = type === "Good" ? styles.notificationGood : styles.notificationError;
  return (
    <Box className={`${styles.notification} ${notificationClass}`}>
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}

export default Notification;
