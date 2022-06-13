import { resolver, Ctx } from "blitz"
import { z } from "zod"
import db from "db"

const UnfollowType = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(UnfollowType), async (input, ctx: Ctx) => {
  ctx.session.$authorize()

  await db.follows.delete({
    where: {
      followerId_followeeId: {
        followerId: ctx.session.userId,
        followeeId: input.id,
      },
    },
  })
})
