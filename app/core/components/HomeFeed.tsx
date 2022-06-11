// Components
import ContentWrapper from "./wrappers/ContentWrapper"
// Material UI
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import { BsThreeDots } from "react-icons/bs"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
// Icons
import { BsChat, BsHeart } from "react-icons/bs"

const Tweet = () => {
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
        src="https://randomuser.me/api/portraits/women/3.jpg"
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
          <Typography sx={{ fontWeight: "bold" }} component="span">
            Jane Doe
          </Typography>
          <Typography component="span">@janedoe</Typography>
          <Typography component="span">4h</Typography>
        </Box>
        {/* Tweet Body */}
        <Typography component="p" fontSize={15} paddingLeft={1} lineHeight={1.2}>
          Imagine falling in love with someone and then finding out they make tea this colour.
          Imagine falling in love with someone and then finding out they make tea this colour.
          Imagine falling in love with someone and then finding out they make tea this colour.
          Imagine falling in love with someone and then finding out they make tea this colour.
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
  return (
    <ContentWrapper>
      <Tweet />
      <Tweet />
      <Tweet />
    </ContentWrapper>
  )
}

export default HomeFeed
