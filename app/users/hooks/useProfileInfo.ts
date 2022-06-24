import { useQuery } from "blitz"
import getUserProfileInfo from "../queries/getUserProfileInfo"

export const useProfileInfo = (username: string) => {
  const [profileInfo, { refetch }] = useQuery(
    getUserProfileInfo,
    {
      username,
    },
    {
      suspense: false,
    }
  )

  return {
    profileInfo,
    refetch,
  }
}
