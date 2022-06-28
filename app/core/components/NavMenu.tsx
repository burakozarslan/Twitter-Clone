import React from "react"
// Material UI
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import Paper from "@mui/material/Paper"
// Icons
import { BsTwitter } from "react-icons/bs"
import { AiOutlineHome, AiFillHome } from "react-icons/ai"
import { RiSearchLine, RiSearchFill } from "react-icons/ri"
import {
  BsBell,
  BsFillBellFill,
  BsEnvelope,
  BsFillEnvelopeFill,
  BsBookmark,
  BsFillBookmarkFill,
  BsPerson,
  BsPersonFill,
  BsThreeDots,
} from "react-icons/bs"
// Hooks
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// Mutations
import logout from "app/auth/mutations/logout"
import { useMutation, Routes, useRouter, RouteUrlObject } from "blitz"

interface ListItemButtonWrapperProps {
  text: string
  icon: React.ReactElement
  fontWeight: string
  clickHandler: (arg: string) => void
  target: RouteUrlObject
}
const ListItemButtonWrapper = ({
  text,
  icon,
  fontWeight,
  clickHandler,
  target,
}: ListItemButtonWrapperProps) => {
  const router = useRouter()

  return (
    <ListItemButton
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 30,
        width: "fit-content",
      }}
      onClick={() => {
        clickHandler(text)
        router.push(target)
      }}
    >
      <ListItemIcon
        sx={{
          fontSize: 28,
          color: "black",
          minWidth: 48,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          fontSize: 19,
          fontWeight,
          letterSpacing: 1,
        }}
      />
    </ListItemButton>
  )
}

interface NavListItemProps {
  isActive?: boolean
  icon: React.ReactElement
  iconActive: React.ReactElement
  text: string
  clickHandler: (arg: string) => void
  target: RouteUrlObject
}
const NavListItem = ({
  isActive,
  icon,
  iconActive,
  text,
  clickHandler,
  target,
}: NavListItemProps) => {
  return (
    <ListItemButtonWrapper
      text={text}
      icon={isActive ? iconActive : icon}
      fontWeight={isActive ? "bold" : "normal"}
      clickHandler={clickHandler}
      target={target}
    />
  )
}

const NavMenu = () => {
  const { currentUser } = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const max1294 = useMediaQuery("(max-width:1294px)")
  // TODO: Add router types
  const [activeNavItem, setActiveNavItem] = React.useState<string>("Home")
  // Popper states
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(false)

  const navClickHandler = (text: string) => {
    setActiveNavItem(text)
  }

  const profileClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: max1294 ? 88 : 275,
        height: "100vh",
        pb: 2,
      }}
    >
      <IconButton
        sx={{
          width: 45,
          ml: 1,
          color: "rgb(29, 155, 240)",
        }}
      >
        <BsTwitter size={40} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <List component="nav">
            <NavListItem
              icon={<AiOutlineHome />}
              iconActive={<AiFillHome />}
              text="Home"
              isActive={activeNavItem === "Home"}
              clickHandler={navClickHandler}
              target={Routes.HomePage()}
            />
            {currentUser && (
              <>
                <NavListItem
                  icon={<RiSearchLine />}
                  iconActive={<RiSearchFill />}
                  text="Search"
                  isActive={activeNavItem === "Search"}
                  clickHandler={navClickHandler}
                  target={Routes.HomePage()}
                />
                <NavListItem
                  icon={<BsBell />}
                  iconActive={<BsFillBellFill />}
                  text="Notifications"
                  isActive={activeNavItem === "Notifications"}
                  clickHandler={navClickHandler}
                  target={Routes.HomePage()}
                />
                <NavListItem
                  icon={<BsEnvelope />}
                  iconActive={<BsFillEnvelopeFill />}
                  text="Messages"
                  isActive={activeNavItem === "Messages"}
                  clickHandler={navClickHandler}
                  target={Routes.HomePage()}
                />
                <NavListItem
                  icon={<BsBookmark />}
                  iconActive={<BsFillBookmarkFill />}
                  text="Bookmarks"
                  isActive={activeNavItem === "Bookmarks"}
                  clickHandler={navClickHandler}
                  target={Routes.HomePage()}
                />
                <NavListItem
                  icon={<BsPerson />}
                  iconActive={<BsPersonFill />}
                  text="Profile"
                  isActive={activeNavItem === "Profile"}
                  clickHandler={navClickHandler}
                  target={Routes.ProfilePage({
                    username: currentUser.username,
                  })}
                />
              </>
            )}
          </List>
          {/* Tweet Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(29, 155, 240)",
              borderRadius: 30,
              width: "80%",
              py: 1.4,
              textTransform: "none",
              fontSize: 18,
            }}
          >
            Tweet
          </Button>
        </Box>
      </Box>
      {/* User Profile */}
      {currentUser && (
        <ListItemButton
          onClick={(event) => profileClickHandler(event)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            p: 1,
            borderRadius: 30,
          }}
        >
          <Popper open={open} anchorEl={anchorEl} placement="top" transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                  <Button onClick={async () => await logoutMutation()}>Logout</Button>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Avatar src={currentUser.avatar || ""} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: 4,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {currentUser.name}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: 14,
              }}
            >
              @{currentUser.username}
            </Typography>
          </Box>
          <ListItemIcon
            sx={{
              fontSize: 20,
              minWidth: 10,
            }}
          >
            <BsThreeDots />
          </ListItemIcon>
        </ListItemButton>
      )}
    </Box>
  )
}

export default NavMenu
