import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
// Material UI
import { Box } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
// Components
import NavMenu from "app/core/components/NavMenu"
import Sidebar from "app/core/components/Sidebar"
import HomeFeed from "app/core/components/HomeFeed"

const HomePage: BlitzPage = () => {
  const max500 = useMediaQuery("(max-width:500px)")

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* Header Container */}
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
      {/* Main Container */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
        component="main"
      >
        {/* Content & Sidebar Container */}
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            width: 990,
          }}
        >
          {/* Content Container */}
          <HomeFeed />
          {/* Sidebar */}
          <Sidebar />
        </Box>
      </Box>
    </Box>
  )
}

HomePage.authenticate = true
HomePage.getLayout = (page) => <Layout title="Home / Twitter">{page}</Layout>

export default HomePage
