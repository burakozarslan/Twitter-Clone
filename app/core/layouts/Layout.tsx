// Components
import { Head, BlitzLayout } from "blitz"
import NavMenu from "../components/NavMenu"
import Sidebar from "../components/Sidebar"
import ContentWrapper from "../components/wrappers/ContentWrapper"
import Header from "../components/Header"
// Material UI
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const max500 = useMediaQuery("(max-width:500px)")

  return (
    <>
      <Head>
        <title>{title || "Twitter-Clone"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: "flex",
        }}
      >
        {/* Header Container */}
        <Header />
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
            <ContentWrapper>{children}</ContentWrapper>
            {/* Sidebar */}
            <Sidebar />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Layout
