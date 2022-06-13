import { Ctx } from "blitz"
import db from "db"

export default async function getHomeFeedTweets(_ = null, ctx: Ctx) {
  // throw error if user is not logged in
  ctx.session.$authorize()

  const tweets = await db.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      author: {
        followers: {
          some: {
            followerId: ctx.session.userId,
          },
        },
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
          username: true,
        },
      },
    },
  })

  return tweets
}
