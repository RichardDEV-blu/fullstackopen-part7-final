import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import { Button, Container, AppBar, Toolbar } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const logged = JSON.parse(loggedUserJSON)
      setUser(logged)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )

      setUser(loggedUser)
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog, user.token)

      setBlogs(currentBlogs =>
        currentBlogs.concat(returnedBlog)
      )

      showNotification(
        `a new blog ${returnedBlog.title} added`,
        'success'
      )

      navigate('/')
    } catch {
      showNotification('failed to create blog', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    const returnedBlog = await blogService.update(
      blog.id,
      updatedBlog,
      user.token
    )

    setBlogs(currentBlogs =>
      currentBlogs.map(b =>
        b.id === returnedBlog.id ? returnedBlog : b
      )
    )
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return
    }

    await blogService.remove(blog.id, user.token)

    setBlogs(currentBlogs =>
      currentBlogs.filter(b => b.id !== blog.id)
    )

    navigate('/')
  }

  const blogsView = () => (
    <>
      {user ? (
        <>
          <p>{user.name} logged in</p>

          <button onClick={handleLogout}>
            logout
          </button>

        </>



      ) : (
        <p>
          <Link to="/login">
            login
          </Link>
        </p>

      )}

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}

    </>

  )




  return (

    <Container maxWidth='md'>
      <div>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />

        <h2>blogs</h2>
        <AppBar position="static">
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
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={blogsView()}
          />

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
              user
                ? <BlogForm createBlog={createBlog} />
                : <LoginForm handleLogin={handleLogin} />
            }
          />
        </Routes>

      </div>
    </Container>

  )
}

export default App
