import * as React from "react"
// Material UI
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
// Blitz
import { useQuery, useMutation } from "blitz"
import { useGetUsersBySearch } from "../hooks/useGetUsersBySearch"
import getRandomUnfollowedUsers from "app/users/queries/getRandomUnfollowedUsers"
import followUser from "app/users/mutations/followUser"

interface PersonToFollowProps {
  id: number
  name: string
  username: string
  avatar: string | null
}
const PersonToFollow = ({ id, name, username, avatar }: PersonToFollowProps) => {
  const [followUserMutation] = useMutation(followUser)

  return (
    <ListItem disableGutters>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar src={avatar || undefined} />
          <Stack>
            <Typography
              component="span"
              sx={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {name}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: 14,
              }}
            >
              @{username}
            </Typography>
          </Stack>
        </Stack>
        <Button
          onClick={async () => followUserMutation({ id })}
          variant="contained"
          size="small"
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
      </Stack>
    </ListItem>
  )
}

interface SearchResultsPopperProps {
  isOpen: boolean
  results:
    | {
        username: string
        name: string
        avatar: string | null
      }[]
    | undefined
}
const SearchResultsPopper = ({ isOpen, results }: SearchResultsPopperProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 2,
        display: isOpen ? "block" : "none",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        p: 2,
        zIndex: "tooltip",
        // TODO: add max height and scroll
      }}
    >
      <Stack spacing={1}>
        {results && !results.length ? (
          <Typography
            sx={{
              textAlign: "center",
              typography: "body2",
              letterSpacing: "0.5px",
              color: "text.secondary",
            }}
          >
            No search results...
          </Typography>
        ) : (
          results?.map((result) => (
            <Stack key={result.username} direction="row" alignItems="center" spacing={1}>
              <Avatar
                src={result.avatar || undefined}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
              <Stack>
                <Typography
                  component="span"
                  sx={{
                    typography: "body2",
                    fontWeight: "bold",
                  }}
                >
                  {result.name}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    typography: "body2",
                    fontWeight: "normal",
                  }}
                >
                  @{result.username}
                </Typography>
              </Stack>
            </Stack>
          ))
        )}
      </Stack>
    </Box>
  )
}

const WhoToFollowSection = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [searchParam, setSearchParam] = React.useState<string>("")

  const [unfollowedUsers, { isLoading }] = useQuery(getRandomUnfollowedUsers, undefined, {
    suspense: false,
  })

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleChange = (event: any) => {
    setSearchParam(event.target.value)
  }

  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <InputBase
            onFocus={handleOpen}
            onChange={handleChange}
            placeholder="Search Twitter"
            sx={{
              width: "100%",
              backgroundColor: "#eff3f4",
              px: 2,
              py: 0.5,
              borderRadius: 30,
            }}
          />
          {/* TODO: Fix layout flash */}
          <SearchResultsPopper isOpen={isOpen} results={useGetUsersBySearch(searchParam)} />
        </Box>
      </ClickAwayListener>

      <Box
        sx={{
          maxWidth: "100%",
          minHeight: 240,
          backgroundColor: "#f7f9f9",
          mt: 2,
          borderRadius: 5,
          p: 2,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: 0.7,
            display: "inline-block",
          }}
        >
          Who to follow
        </Typography>
        {isLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="primary" size={25} />
          </Box>
        )}
        <List>
          {unfollowedUsers?.map((user) => (
            <PersonToFollow
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              avatar={user.avatar}
            />
          ))}
        </List>
      </Box>
    </Box>
  )
}

const Sidebar = () => {
  const max1000 = useMediaQuery("(max-width:1000px)")
  const max1095 = useMediaQuery("(max-width:1095px)")

  return (
    <Box
      sx={{
        width: max1095 ? 290 : 350,
        display: max1000 ? "none" : "block",
        margin: "0 auto",
      }}
    >
      <WhoToFollowSection />
    </Box>
  )
}

export default Sidebar
