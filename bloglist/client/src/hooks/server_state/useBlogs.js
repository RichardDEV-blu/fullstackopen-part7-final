import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../../services/blogs'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ blog, token }) => blogService.create(blog, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

export const useLikeBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ blog, token }) => {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }

      return blogService.update(blog.id, updatedBlog, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ blog, token }) => blogService.remove(blog.id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}
