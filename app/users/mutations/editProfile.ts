import { resolver, Ctx } from "blitz"
import db from "db"
import { EditProfileSchema } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(EditProfileSchema),
  async (input, ctx: Ctx) => {
    const user = await db.user.update({
      where: { id: ctx.session.userId as number },
      data: {
        ...input,
      },
    })

    return user
  }
)
