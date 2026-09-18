import { Button, Stack, TextField } from '@mui/material'
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
    <Stack
      component="form"
      onSubmit={addBlog}
      spacing={2}
      sx={{ maxWidth: 500, mt: 2 }}
    >
      <TextField {...title.input} label="title" name="title" fullWidth />

      <TextField {...author.input} label="author" name="author" fullWidth />

      <TextField {...url.input} label="url" name="url" fullWidth />

      <Button type="submit" variant="contained">
        create
      </Button>
    </Stack>
  )
}

export default BlogForm
