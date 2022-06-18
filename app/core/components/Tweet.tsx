import * as React from "react"
// Blitz
import { useMutation, Link as BlitzLink, Routes } from "blitz"
import unfollowUser from "app/users/mutations/unfollowUser"
// Material UI
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
// Icons
import { BsChat, BsHeart, BsThreeDots } from "react-icons/bs"

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

  // TODO: Fix tweet body alignment
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
            <BlitzLink href={Routes.ProfilePage({ username: authorUsername })} passHref>
              <Link underline="hover" color="#222">
                <Typography aria-describedby={id} sx={{ fontWeight: "bold" }} component="span">
                  {authorName}
                </Typography>
              </Link>
            </BlitzLink>
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
          {/* TODO: Add timestamp */}
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

export default Tweet
