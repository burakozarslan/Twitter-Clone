import db from "db"
import { Ctx, resolver } from "blitz"
import lodash from "lodash"

export default resolver.pipe(async (_ = null, ctx: Ctx) => {
  ctx.session.$authorize()

  const result = await db.user.findMany({
    select: {
      id: true,
      avatar: true,
      name: true,
      username: true,
    },
    where: {
      followers: {
        none: {
          followerId: ctx.session.userId,
        },
      },
      NOT: {
        id: ctx.session.userId,
      },
    },
  })

  const shuffled = lodash.shuffle(result)
  return shuffled.slice(0, 3)
})
