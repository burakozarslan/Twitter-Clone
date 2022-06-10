import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
// Material UI
import { Box, Container } from "@mui/system"
import useMediaQuery from "@mui/material/useMediaQuery"

const Home: BlitzPage = () => {
  const max500 = useMediaQuery("(max-width:500px)")
  const max1000 = useMediaQuery("(max-width:1000px)")
  const max1095 = useMediaQuery("(max-width:1095px)")
  const max1294 = useMediaQuery("(max-width:1294px)")

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
        {/* Header */}
        <Box
          sx={{
            width: max1294 ? 88 : 275,
            backgroundColor: "orange",
          }}
          component="header"
        >
          Header
        </Box>
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

Home.authenticate = true
Home.getLayout = (page) => <Layout title="Home / Twitter">{page}</Layout>

export default Home
