import Layout from "app/core/layouts/Layout"
// Components
import Tweet from "app/core/components/Tweet"
import FollowUnfollowButton from "app/core/components/FollowUnfollowButton"
import EditProfileButton from "app/core/components/EditProfileButton"
import BannerImage from "app/core/components/BannerImage"
// Mui
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import CircularProgress from "@mui/material/CircularProgress"
// Icons
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi"
// Blitz
import { BlitzPage, useParam, useQuery } from "blitz"
import getUserTweets from "app/tweets/queries/getUserTweets"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useProfileInfo } from "app/users/hooks/useProfileInfo"

const ProfilePage: BlitzPage = () => {
  const { currentUser } = useCurrentUser()
  const routeUsername = useParam("username")
  const { profileInfo } = useProfileInfo(routeUsername as string)
  const [userTweets] = useQuery(
    getUserTweets,
    {
      username: routeUsername as string,
    },
    {
      suspense: false,
    }
  )

  if (!profileInfo)
    return (
      <Stack justifyContent="center" direction="row">
        <CircularProgress color="primary" size={25} />
      </Stack>
    )

  return (
    <Box>
      <Box
        sx={{
          borderBottom: "1px solid #eaeaea",
        }}
      >
        {/* Box with Aspect Ratio */}
        <Box
          sx={{
            position: "relative",
            pt: "33%",
          }}
        >
          <BannerImage src={profileInfo.bannerImage} alt={profileInfo.username + " banner image"} />
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2}>
          <Avatar
            src={profileInfo?.avatar || undefined}
            sx={{
              width: 135,
              height: 135,
              marginTop: "-67.5px",
              border: "4px solid white",
            }}
          />
          {currentUser?.username === profileInfo.username ? (
            <EditProfileButton />
          ) : (
            // TODO: conditionally render follow and unfollow buttons
            <FollowUnfollowButton isFollowing={profileInfo?.isFollowing} size="medium" />
          )}
        </Stack>
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography component="div" variant="h5" fontWeight="bold">
            {profileInfo?.name}
          </Typography>
          <Typography component="div" variant="body2" color="GrayText" letterSpacing={0.5}>
            @{profileInfo?.username}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="InfoText"
            sx={{
              my: 1,
            }}
          >
            {profileInfo?.bio}
          </Typography>
          <Stack flexWrap="wrap" direction="row" spacing={2}>
            {profileInfo?.location && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <HiOutlineLocationMarker color="gray" />
                <Typography component="span" variant="body2" color="GrayText">
                  {profileInfo.location}
                </Typography>
              </Stack>
            )}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <HiOutlineCalendar color="gray" />
              <Typography component="span" variant="body2" color="GrayText">
                Joined{" "}
                {profileInfo?.createdAt.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} mt={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography component="span" variant="body2" fontWeight="bold">
                {profileInfo?._count.followees}
              </Typography>
              <Typography component="span" variant="body2" color="GrayText">
                Following
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography component="span" variant="body2" fontWeight="bold">
                {profileInfo?._count.followers}
              </Typography>
              <Typography component="span" variant="body2" color="GrayText">
                Followers
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      {!userTweets ? (
        <Stack justifyContent="center" direction="row">
          <CircularProgress color="primary" size={25} />
        </Stack>
      ) : (
        userTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            authorId={tweet.authorId}
            authorName={tweet.author.name}
            authorUsername={tweet.author.username}
            authorAvatar={tweet.author.avatar}
            body={tweet.body}
            refetch={() => {}}
          />
        ))
      )}
    </Box>
  )
}

// ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout title="Profile Page">{page}</Layout>

export default ProfilePage
