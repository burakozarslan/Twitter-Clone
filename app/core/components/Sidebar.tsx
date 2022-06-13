// Material UI
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"

const PersonToFollow = () => {
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Avatar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          borderRadius: 30,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Follow
      </Button>
    </ListItem>
  )
}

const WhoToFollowSection = () => {
  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <InputBase
        placeholder="Search Twitter"
        sx={{
          width: "100%",
          backgroundColor: "#eff3f4",
          px: 2,
          py: 0.5,
          borderRadius: 30,
        }}
      />
      <Box
        sx={{
          maxWidth: "100%",
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
        <List>
          <PersonToFollow />
          <PersonToFollow />
          <PersonToFollow />
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