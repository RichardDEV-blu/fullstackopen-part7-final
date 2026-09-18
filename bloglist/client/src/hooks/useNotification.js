import { useShallow } from 'zustand/react/shallow'
import useNotificationStore from '../stores/notificationStore'

export const useNotification = () =>
  useNotificationStore(
    useShallow((state) => ({
      message: state.message,
      type: state.type,
    })),
  )

export const useSetNotification = () =>
  useNotificationStore((state) => state.setNotification)
