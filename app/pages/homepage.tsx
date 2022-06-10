import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
// Material UI
import { Box } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
// Components
import NavMenu from "app/core/components/NavMenu"

const HomePage: BlitzPage = () => {
  const max500 = useMediaQuery("(max-width:500px)")
  const max1000 = useMediaQuery("(max-width:1000px)")
  const max1095 = useMediaQuery("(max-width:1095px)")

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
            backgroundColor: "chocolate",
          }}
        >
          {/* Content Container */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              backgroundColor: "teal",
            }}
          >
            content
          </Box>
          {/* Sidebar Container */}
          <Box
            sx={{
              width: max1095 ? 290 : 350,
              display: max1000 ? "none" : "block",
              backgroundColor: "palegreen",
            }}
          >
            sidebar
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

HomePage.authenticate = true
HomePage.getLayout = (page) => <Layout title="Home / Twitter">{page}</Layout>

export default HomePage
