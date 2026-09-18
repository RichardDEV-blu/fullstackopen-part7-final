import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import { useSetNotification } from './hooks/client_state/useNotification'
import {
  useBlogs,
  useCreateBlog,
  useLikeBlog,
  useDeleteBlog,
} from './hooks/server_state/useBlogs'
import { useUser, useUserActions } from './hooks/client_state/useUserStore'
import persistenUser from './services/persistenUser'
import Users from './components/Users'
import UserView from './components/UserView'
const App = () => {
  const user = useUser()
  const { setUser } = useUserActions()
  const { data: blogs = [] } = useBlogs()

  const createBlogMutation = useCreateBlog()
  const likeBlogMutation = useLikeBlog()
  const deleteBlogMutation = useDeleteBlog()

  const setNotification = useSetNotification()

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  useEffect(() => {
    const loggedUser = persistenUser.getUser()

    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [setUser])

  const showNotification = (message, type) => {
    setNotification(message, type)
  }

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)

      persistenUser.saveUser(loggedUser)

      setUser(loggedUser)
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    persistenUser.removeUser()
    setUser(null)
    navigate('/')
  }

  const createBlog = async (blog) => {
    try {
      const b = await createBlogMutation.mutateAsync({
        blog,
        token: user.token,
      })
      showNotification(`a new blog ${b.title} added`, 'success')

      navigate('/')
    } catch {
      showNotification('failed to create blog', 'error')
    }
  }

  const likeBlog = async (blog) => {
    try {
      await likeBlogMutation.mutateAsync({
        blog,
        token: user.token,
      })
    } catch {
      showNotification('failed to like blog', 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return
    }

    try {
      await deleteBlogMutation.mutateAsync({
        blog,
        token: user.token,
      })

      navigate('/')
    } catch {
      showNotification('failed to delete blog', 'error')
    }
  }

  const blogsView = () => (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {user ? (
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {user.name} logged in
          </Typography>

          <Button onClick={handleLogout} variant="outlined" size="small">
            logout
          </Button>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Please log in to create and manage blogs.{' '}
          <Link to="/login">login</Link>
        </Typography>
      )}

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </Stack>
  )

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2}>
        <Notification />

        <Typography component="h1" variant="h3" fontWeight={700}>
          blogs
        </Typography>
        <AppBar position="static" sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Toolbar sx={{ gap: 1 }}>
            <Button component={Link} to="/" color="inherit">
              blogs
            </Button>

            {user && (
              <Button component={Link} to="/new" color="inherit">
                create blog
              </Button>
            )}

            {!user && (
              <Button component={Link} to="/login" color="inherit">
                login
              </Button>
            )}

            <Button component={Link} to="/users" color="inherit">
              users
            </Button>
          </Toolbar>
        </AppBar>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={blogsView()} />

            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogView
                  blog={blog}
                  user={user}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                />
              }
            />
            <Route
              path="/new"
              element={
                user ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BlogForm createBlog={createBlog} />
                  </Box>
                ) : (
                  <LoginForm handleLogin={handleLogin} />
                )
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route
              path="*"
              element={
                <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
                  <Typography component="h2" variant="h5">
                    404 - Page not found
                  </Typography>
                </Paper>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Stack>
    </Container>
  )
}

export default App
