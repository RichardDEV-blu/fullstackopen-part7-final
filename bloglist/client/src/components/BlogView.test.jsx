import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogView from './BlogView'

const blog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://example.com',
  likes: 5,
  user: {
    name: 'Richard',
    id: '123'
  }
}

test('shows blog information and likes to unauthenticated users, but no buttons', () => {
  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <BlogView
      blog={blog}
      user={null}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  )

  expect(screen.getByText('Test Blog Test Author')).toBeVisible()
  expect(screen.getByText('https://example.com')).toBeVisible()
  expect(screen.getByText('5 likes')).toBeVisible()

  expect(screen.queryByText('like')).not.toBeInTheDocument()
  expect(screen.queryByText('remove')).not.toBeInTheDocument()
})

test('shows only the like button to an authenticated user who is not the creator', () => {
  const user = {
    name: 'Other User',
    id: '456'
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <BlogView
      blog={blog}
      user={user}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  )

  expect(screen.getByText('Test Blog Test Author')).toBeVisible()
  expect(screen.getByText('https://example.com')).toBeVisible()
  expect(screen.getByText('5 likes')).toBeVisible()

  expect(screen.getByText('like')).toBeVisible()
  expect(screen.queryByText('remove')).not.toBeInTheDocument()
})

test('shows both like and remove buttons to the creator', () => {
  const user = {
    name: 'Richard',
    id: '123'
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <BlogView
      blog={blog}
      user={user}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  )

  expect(screen.getByText('like')).toBeVisible()
  expect(screen.getByText('remove')).toBeVisible()
})

test('calls like handler when like button is clicked', async () => {
  const user = {
    name: 'Other User',
    id: '456'
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <BlogView
      blog={blog}
      user={user}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  )

  const userEventSetup = userEvent.setup()

  await userEventSetup.click(screen.getByText('like'))

  expect(likeBlog).toHaveBeenCalledTimes(1)
})