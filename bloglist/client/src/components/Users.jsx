import { Link } from 'react-router-dom'
import { useUsers } from '../hooks/server_state/useUsers'

const Users = () => {
  const { data: users = [], isLoading, isError } = useUsers()
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>failed to load users</p>
  }
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>

          <p>{user.blogs.length} blogs</p>
        </div>
      ))}
    </div>
  )
}
export default Users
