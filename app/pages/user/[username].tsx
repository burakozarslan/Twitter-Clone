import Layout from "app/core/layouts/Layout"
// Components
import Tweet from "app/core/components/Tweet"
// Mui
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
// Icons
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi"
// Blitz
import { BlitzPage, Image, useParam, useQuery } from "blitz"
import getUserProfileInfo from "app/users/queries/getUserProfileInfo"
import getUserTweets from "app/tweets/queries/getUserTweets"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ProfilePage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const routeUsername = useParam("username")
  const [profileInfo] = useQuery(
    getUserProfileInfo,
    {
      username: routeUsername as string,
    },
    {
      suspense: false,
    }
  )
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
          {/* Image Wrapper */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={profileInfo.bannerImage || ""}
              alt="cover"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
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
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                typography: "body2",
                fontWeight: "bold",
                textTransform: "none",
                letterSpacing: "0.5px",
                borderRadius: 10,
                border: "1px solid #aaa",
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 10,
                textTransform: "none",
                fontWeight: "bold",
                height: 30,
              }}
            >
              Follow
            </Button>
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
            This Privacy Policy addresses the collection and use of personal information -
          </Typography>
          <Stack flexWrap="wrap" direction="row" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <HiOutlineLocationMarker color="gray" />
              <Typography component="span" variant="body2" color="GrayText">
                {profileInfo?.location}
              </Typography>
            </Stack>
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
