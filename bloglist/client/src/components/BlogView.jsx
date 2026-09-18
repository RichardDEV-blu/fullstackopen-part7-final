import { Button, Link, Paper, Stack, Typography } from '@mui/material'

const BlogView = ({ blog, user, likeBlog, deleteBlog }) => {
  if (!blog) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        {blog.title} {blog.author}
      </Typography>

      <Stack spacing={2}>
        <Link href={blog.url} target="_blank" rel="noreferrer" underline="hover">
          {blog.url}
        </Link>
 
        <Stack direction="row" spacing={1} alignitems="center">
          <Typography>{blog.likes} likes</Typography>

          {user && (
            <Button variant="outlined" size="small" onClick={() => likeBlog(blog)}>
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
      </Stack>
    </Paper>
  )
}

export default BlogView
