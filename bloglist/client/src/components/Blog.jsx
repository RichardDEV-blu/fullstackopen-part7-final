import { Link } from 'react-router-dom'
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Card data-testid="blog" variant="outlined" sx={{ mb: 1.5 }}>
      <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
        <CardContent>
          <Stack spacing={0.5}>
            <Typography component="h3" variant="h6">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.author}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Blog
