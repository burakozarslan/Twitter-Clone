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

interface ListItemButtonWrapperProps {
  text: string
  icon: React.ReactElement
  fontWeight: string
  clickHandler: (arg: string) => void
}
const ListItemButtonWrapper = ({
  text,
  icon,
  fontWeight,
  clickHandler,
}: ListItemButtonWrapperProps) => {
  return (
    <ListItemButton
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 30,
        width: "fit-content",
      }}
      onClick={() => clickHandler(text)}
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
}
const NavListItem = ({ isActive, icon, iconActive, text, clickHandler }: NavListItemProps) => {
  return (
    <ListItemButtonWrapper
      text={text}
      icon={isActive ? iconActive : icon}
      fontWeight={isActive ? "bold" : "normal"}
      clickHandler={clickHandler}
    />
  )
}

const NavMenu = () => {
  const max1294 = useMediaQuery("(max-width:1294px)")
  // TODO: Add router types
  const [activeNavItem, setActiveNavItem] = React.useState<string>("Home")

  const clickHandler = (text: string) => {
    setActiveNavItem(text)
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
              clickHandler={clickHandler}
            />
            <NavListItem
              icon={<RiSearchLine />}
              iconActive={<RiSearchFill />}
              text="Search"
              isActive={activeNavItem === "Search"}
              clickHandler={clickHandler}
            />
            <NavListItem
              icon={<BsBell />}
              iconActive={<BsFillBellFill />}
              text="Notifications"
              isActive={activeNavItem === "Notifications"}
              clickHandler={clickHandler}
            />
            <NavListItem
              icon={<BsEnvelope />}
              iconActive={<BsFillEnvelopeFill />}
              text="Messages"
              isActive={activeNavItem === "Messages"}
              clickHandler={clickHandler}
            />
            <NavListItem
              icon={<BsBookmark />}
              iconActive={<BsFillBookmarkFill />}
              text="Bookmarks"
              isActive={activeNavItem === "Bookmarks"}
              clickHandler={clickHandler}
            />
            <NavListItem
              icon={<BsPerson />}
              iconActive={<BsPersonFill />}
              text="Profile"
              isActive={activeNavItem === "Profile"}
              clickHandler={clickHandler}
            />
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
      <ListItemButton
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          p: 1,
          borderRadius: 30,
        }}
      >
        <Avatar src="https://randomuser.me/api/portraits/men/85.jpg" />
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
            Name Surname
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 14,
            }}
          >
            @username
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
    </Box>
  )
}

export default NavMenu
