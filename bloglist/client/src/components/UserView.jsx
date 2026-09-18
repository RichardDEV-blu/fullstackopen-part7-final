import { useParams } from 'react-router-dom'
import { Alert, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useUser } from '../hooks/server_state/useUsers'

const UserView = () => {
  const { id } = useParams()

  const { data: user, isLoading, isError } = useUser(id)

  if (isLoading) {
    return (
      <Stack spacing={1} sx={{ py: 6, alignItems: 'center' }}>
        <CircularProgress size={28} />
        <Typography variant="body2" color="text.secondary">
          loading...
        </Typography>
      </Stack>
    )
  }

  if (isError) {
    return <Alert severity="error" sx={{ mt: 3 }}>failed to load user</Alert>
  }

  if (!user) {
    return <Alert severity="info" sx={{ mt: 3 }}>user not found</Alert>
  }

  return (
    <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, sm: 3 } }}>
      <Typography component="h2" variant="h4">
        {user.name}
      </Typography>

      <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
        Added blogs
      </Typography>

      <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2.5 }}>
        {user.blogs.map((blog) => (
          <Typography component="li" key={blog.id} variant="body1">
            {blog.title}
          </Typography>
        ))}
      </Stack>
    </Paper>
  )
}

export default UserView
