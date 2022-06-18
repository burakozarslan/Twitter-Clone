import { resolver } from "blitz"
import { z } from "zod"
import db from "db"

const UserTweetsType = z.object({
  username: z.string(),
})

export default resolver.pipe(resolver.zod(UserTweetsType), async (input) => {
  const userTweets = await db.tweet.findMany({
    where: {
      author: {
        username: input.username,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  })

  return userTweets
})
