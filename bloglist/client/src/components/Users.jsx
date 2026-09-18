import { Link } from 'react-router-dom'
import { Alert, Card, CardActionArea, CardContent, CircularProgress, Stack, Typography } from '@mui/material'
import { useUsers } from '../hooks/server_state/useUsers'

const Users = () => {
  const { data: users = [], isLoading, isError } = useUsers()
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
    return <Alert severity="error" sx={{ mt: 3 }}>failed to load users</Alert>
  }
  return (
    <Stack spacing={1.5} sx={{ mt: 3 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
        Users
      </Typography>
      {users.map((user) => (
        <Card key={user.id} variant="outlined">
          <CardActionArea component={Link} to={`/users/${user.id}`}>
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography component="span" variant="subtitle1">
                  {user.name}
                </Typography>
                <Typography component="span" variant="body2" color="text.secondary">
                  {user.blogs.length} blogs
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  )
}
export default Users
