import { Button, Stack, TextField } from '@mui/material'
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
    <Stack
      component="form"
      onSubmit={login}
      spacing={2}
      sx={{ maxWidth: 400, mt: 2 }}
    >
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
  )
}

export default LoginForm
