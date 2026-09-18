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
    <Paper
      variant="outlined"
      sx={{ mt: 3, p: { xs: 2, sm: 3 }, borderRadius: 2 }}
    >
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

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {blog.likes} likes
          </Typography>

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
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteBlog(blog)}
            sx={{ alignSelf: 'flex-start' }}
          >
            remove
          </Button>
        )}

        <Stack spacing={1} sx={{ pt: 1 }}>
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
            <TextField
              {...comment.input}
              label="comment"
              size="small"
              fullWidth
            />

            <Button type="submit" variant="contained">
              add comment
            </Button>
          </Stack>

          <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
            {blog.comments.map((comment, index) => (
              <Typography component="li" key={index} variant="body2">
                {comment}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}
export default BlogView
