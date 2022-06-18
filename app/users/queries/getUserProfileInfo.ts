import { Ctx, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const ProfileType = z.object({
  username: z.string(),
})

export default async function getUserProfileInfo(
  input: z.infer<typeof ProfileType>,
  { session }: Ctx
) {
  ProfileType.parse(input)

  const user = await db.user.findUnique({
    where: { username: input.username },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      avatar: true,
      bannerImage: true,
      location: true,
      createdAt: true,
      _count: {
        select: {
          followees: true,
          followers: true,
        },
      },
    },
  })

  if (!user) throw new NotFoundError()

  return user
}
