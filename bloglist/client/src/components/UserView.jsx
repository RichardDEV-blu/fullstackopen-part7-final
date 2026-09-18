import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/server_state/useUsers'

const UserView = () => {
  const { id } = useParams()

  const { data: user, isLoading, isError } = useUser(id)

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>failed to load user</p>
  }

  if (!user) {
    return <p>user not found</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
