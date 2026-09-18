import { useQuery } from '@tanstack/react-query'
import users from '../../services/users'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
  })
}

export const useUser = (id) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => users.getOne(id),
  })
}
