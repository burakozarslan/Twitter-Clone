import { Ctx, NotFoundError } from "blitz"
import db, { User } from "db"
import { z } from "zod"

const ProfileType = z.object({
  username: z.string(),
})

export default async function getUserProfileInfo(
  input: z.infer<typeof ProfileType>,
  { session }: Ctx
) {
  ProfileType.parse(input)

  let isFollowing: boolean = false

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

  if (session.$isAuthorized()) {
    const following = await db.follows.findUnique({
      where: {
        followerId_followeeId: {
          followerId: session.userId as number,
          followeeId: user.id,
        },
      },
    })

    isFollowing = !!following
  }

  type UserProfileInfoType = typeof user & {
    isFollowing: boolean
  }

  const userProfileInfo: UserProfileInfoType = {
    ...user,
    isFollowing,
  }

  return userProfileInfo
}
