import { resolver, Ctx } from "blitz"
import { z } from "zod"
import db from "db"

const FollowType = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(FollowType), async (input, ctx: Ctx) => {
  ctx.session.$authorize()

  const isFollowing = await db.follows.findFirst({
    where: {
      followerId: ctx.session.userId,
      followeeId: input.id,
    },
  })

  if (!isFollowing) {
    await db.follows.create({
      data: {
        followerId: ctx.session.userId,
        followeeId: input.id,
      },
    })
  }
})
