import { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Stack
      component="form"
      onSubmit={addBlog}
      spacing={2}
      sx={{ maxWidth: 500, mt: 2 }}
    >
      <TextField
        label="title"
        name="title"
        fullWidth
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      <TextField
        label="author"
        name="author"
        fullWidth
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />

      <TextField
        label="url"
        name="url"
        fullWidth
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />

      <Button type="submit" variant="contained">
        create
      </Button>
    </Stack>
  )
}

export default BlogForm
