import { useShallow } from 'zustand/react/shallow'
import useUserStore from '../../stores/userStore'

export const useUser = () => {
  return useUserStore((state) => state.user)
}

export const useUserActions = () => {
  return useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      clearUser: state.clearUser,
    })),
  )
}
