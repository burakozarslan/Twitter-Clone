import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [currentUser, { refetch }] = useQuery(getCurrentUser, null, {
    suspense: false,
  })
  return {
    currentUser,
    refetch,
  }
}
