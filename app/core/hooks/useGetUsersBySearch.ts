import getUsersBySearch from "app/users/queries/getUsersBySearch"
import { useQuery } from "blitz"

export const useGetUsersBySearch = (searchBy: string) => {
  const [searchResults] = useQuery(
    getUsersBySearch,
    {
      searchBy,
    },
    {
      suspense: false,
    }
  )

  return searchBy === "" ? [] : searchResults
}
