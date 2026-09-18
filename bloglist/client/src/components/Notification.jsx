import { Alert } from '@mui/material'
import { useNotification } from '../hooks/client_state/useNotification'

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) {
    return null
  }

  return (
    <Alert severity={type === 'error' ? 'error' : 'success'} sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification
