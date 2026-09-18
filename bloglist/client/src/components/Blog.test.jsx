import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

test('renders blog title and author as a link', () => {
  const blog = {
    id: '123',
    title: 'Test Blog',
    author: 'Test Author'
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} />
    </MemoryRouter>
  )

  const link = screen.getByRole('link', {
    name: 'Test Blog Test Author'
  })

  expect(link).toBeVisible()
  expect(link).toHaveAttribute('href', '/blogs/123')
})