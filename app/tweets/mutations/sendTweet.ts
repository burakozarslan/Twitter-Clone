import { resolver, Ctx, AuthenticationError } from "blitz"
import db from "db"
import { SendTweetSchema } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(SendTweetSchema),
  async (input, ctx: Ctx) => {
    const user = await db.user.findUnique({ where: { id: ctx.session.userId as number } })

    if (!user) {
      throw new AuthenticationError()
    }

    const tweet = await db.tweet.create({
      data: {
        body: input.body,
        authorId: user.id,
      },
    })

    return tweet
  }
)
