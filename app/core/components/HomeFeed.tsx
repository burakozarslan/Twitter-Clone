import * as React from "react"
// Components
import ContentWrapper from "./wrappers/ContentWrapper"
// Material UI
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import { BsThreeDots } from "react-icons/bs"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
// Icons
import { BsChat, BsHeart } from "react-icons/bs"
// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
// Blitz
import { useMutation, useQuery } from "blitz"
import getHomeFeedTweets from "app/tweets/queries/getHomeFeedTweets"
import unfollowUser from "app/users/mutations/unfollowUser"

const SendTweetSchema = z.object({
  body: z.string().max(280),
})

const SendTweetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SendTweetSchema>>({
    resolver: zodResolver(SendTweetSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof SendTweetSchema>> = (data) => console.log(data)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <InputBase {...register("body")} placeholder="New tweet" />
      <Typography component="p">{errors.body?.message}</Typography>
      <Button type="submit">Send</Button>
    </Box>
  )
}

interface TweetProps {
  authorId: number
  authorName: string
  authorUsername: string
  body: string
  authorAvatar: string | null
  refetch: () => void
}
const Tweet = ({
  authorId,
  authorName,
  authorUsername,
  body,
  authorAvatar,
  refetch,
}: TweetProps) => {
  const [unfollowMutation] = useMutation(unfollowUser, {
    onSuccess: () => refetch(),
  })

  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpenPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClosePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(false)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? "transition-popper" : undefined

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        borderBottom: "1px solid #eaeaea",
        p: 1,
      }}
    >
      <Avatar
        src={authorAvatar || "https://via.placeholder.com/150"}
        sx={{
          width: 50,
          height: 50,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 1,
        }}
      >
        {/* Tweet Info */}
        <Box
          sx={{
            display: "flex",

            span: {
              ml: 0.5,
              fontSize: 15,
            },
          }}
        >
          <Box onMouseEnter={handleOpenPopper} onMouseLeave={handleClosePopper}>
            <Typography aria-describedby={id} sx={{ fontWeight: "bold" }} component="span">
              {authorName}
            </Typography>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        unfollowMutation({
                          id: authorId,
                        })
                      }
                    >
                      Unfollow
                    </Button>
                  </Box>
                </Fade>
              )}
            </Popper>
          </Box>
          <Typography component="span">@{authorUsername}</Typography>
          <Typography component="span">4h</Typography>
        </Box>
        {/* Tweet Body */}
        <Typography component="p" fontSize={15} paddingLeft={1} lineHeight={1.2}>
          {body}
        </Typography>
        {/* Tweet Actions */}
        <Box
          sx={{
            display: "flex",
            mt: 1,
          }}
        >
          <Button
            sx={{
              fontSize: 15,
              color: "gray",

              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <BsChat />
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                ml: 1,
              }}
            >
              949
            </Typography>
          </Button>
          <Button
            sx={{
              fontSize: 15,
              color: "gray",
              ml: 1,

              "&:hover": {
                color: "error.main",
              },
            }}
          >
            <BsHeart />
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                ml: 1,
              }}
            >
              12993
            </Typography>
          </Button>
        </Box>
      </Box>
      <IconButton size="small">
        <BsThreeDots />
      </IconButton>
    </Box>
  )
}

const HomeFeed = () => {
  const [homeFeedTweets, { refetch }] = useQuery(getHomeFeedTweets, undefined, {
    suspense: false,
  })

  return (
    <ContentWrapper>
      <SendTweetForm />
      {homeFeedTweets?.map((tweet) => (
        <Tweet
          key={tweet.id}
          authorId={tweet.authorId}
          authorName={tweet.author.name}
          authorUsername={tweet.author.username}
          authorAvatar={tweet.author.avatar}
          body={tweet.body}
          refetch={refetch}
        />
      ))}
    </ContentWrapper>
  )
}

export default HomeFeed
