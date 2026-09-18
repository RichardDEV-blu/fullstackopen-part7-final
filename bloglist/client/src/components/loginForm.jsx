import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useField } from '../hooks/client_state'

const LoginForm = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username: username.input.value,
      password: password.input.value,
    })

    username.reset()
    password.reset()
  }

  return (
    <Paper variant="outlined" sx={{ maxWidth: 400, mt: 3, p: { xs: 2, sm: 3 } }}>
      <Stack component="form" onSubmit={login} spacing={2}>
        <Typography component="h2" variant="h5">
          Log in
        </Typography>

        <TextField
          {...username.input}
          autoComplete="username"
          label="Username"
          name="username"
          required
          fullWidth
        />

        <TextField
          {...password.input}
          autoComplete="current-password"
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </Paper>
  )
}

export default LoginForm
