import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useField } from '../hooks/client_state'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 3,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack component="form" onSubmit={addBlog} spacing={2}>
        <Typography component="h2" variant="h5">
          Create a new blog
        </Typography>

        <TextField {...title.input} label="title" name="title" fullWidth />

        <TextField {...author.input} label="author" name="author" fullWidth />

        <TextField {...url.input} label="url" name="url" fullWidth />

        <Button type="submit" variant="contained">
          create
        </Button>
      </Stack>
    </Paper>
  )
}

export default BlogForm
