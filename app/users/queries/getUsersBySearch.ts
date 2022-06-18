import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const SearchType = z.object({
  searchBy: z.string(),
})

export default resolver.pipe(resolver.zod(SearchType), async ({ searchBy }) => {
  const result = await db.user.findMany({
    take: 10,
    where: {
      OR: [
        {
          name: {
            startsWith: searchBy,
          },
        },
        {
          username: {
            startsWith: searchBy,
          },
        },
      ],
    },
    select: {
      name: true,
      username: true,
      avatar: true,
    },
  })

  return result
})
