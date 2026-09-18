import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  //throw new Error('simulated error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password,
    })
  }

  return (
    <Stack
      component="form"
      onSubmit={login}
      spacing={2}
      sx={{ maxWidth: 400, mt: 2 }}
    >
      <TextField
        autoComplete="username"
        label="Username"
        name="username"
        required
        fullWidth
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        autoComplete="current-password"
        label="Password"
        name="password"
        type="password"
        required
        fullWidth
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Stack>
  )
}

export default LoginForm
