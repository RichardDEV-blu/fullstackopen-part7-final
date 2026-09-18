import { Alert } from '@mui/material'
import { useNotification } from '../hooks/useNotification'

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
