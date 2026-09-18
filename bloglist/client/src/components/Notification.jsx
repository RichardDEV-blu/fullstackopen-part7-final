import { Alert } from '@mui/material'
import { useNotification } from '../hooks/client_state/useNotification'

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) {
    return null
  }

  return (
    <Alert
      severity={type === 'error' ? 'error' : 'success'}
      variant="filled"
      sx={{ mb: 2, borderRadius: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Notification
