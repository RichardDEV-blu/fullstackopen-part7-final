import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('calls createBlog with correct details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  await user.type(titleInput, 'Test title')
  await user.type(authorInput, 'Test author')
  await user.type(urlInput, 'https://example.com')

  const createButton = screen.getByRole('button', { name: 'create' })

  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test title',
    author: 'Test author',
    url: 'https://example.com'
  })



})