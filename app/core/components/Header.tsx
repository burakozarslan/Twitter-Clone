// Material UI
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
// Components
import NavMenu from "./NavMenu"

const Header = () => {
  const max500 = useMediaQuery("(max-width:500px)")

  return (
    <Box
      sx={{
        // display: "flex",
        flexGrow: 1,
        justifyContent: "end",
        display: max500 ? "none" : "flex",
      }}
    >
      <NavMenu />
    </Box>
  )
}

export default Header
