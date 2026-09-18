import {
  Paper,
  Typography,
  Stack,
  Link,
  Button,
  TextField,
} from '@mui/material'
import { useField } from '../hooks/client_state/index'
import { useAddComment } from '../hooks/server_state/useBlogs'

const BlogView = ({ blog, user, likeBlog, deleteBlog }) => {
  const comment = useField('text')
  const addCommentMutation = useAddComment()
  if (!blog) {
    return null
  }
  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const text = comment.input.value.trim()
    if (!text) {
      return
    }
    await addCommentMutation.mutateAsync({
      id: blog.id,
      comment: text,
    })

    comment.reset()
  }
  return (
    <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        {blog.title} {blog.author}
      </Typography>

      <Stack spacing={2}>
        <Link
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          underline="hover"
        >
          {blog.url}
        </Link>

        <Stack direction="row" spacing={1} alignitems="center">
          <Typography>{blog.likes} likes</Typography>

          {user && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => likeBlog(blog)}
            >
              like
            </Button>
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Added by {blog.user.name}
        </Typography>

        {user && blog.user.id === user.id && (
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={() => deleteBlog(blog)}
          >
            remove
          </Button>
        )}

        <div>
          <Typography component="h3" variant="h6">
            Comments
          </Typography>

          <Stack
            component="form"
            direction="row"
            spacing={1}
            onSubmit={handleCommentSubmit}
            sx={{ mt: 1 }}
          >
            <TextField {...comment.input} label="comment" size="small" />

            <Button type="submit" variant="contained">
              add comment
            </Button>
          </Stack>

          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </Stack>
    </Paper>
  )
}
export default BlogView
