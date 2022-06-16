import { BlitzPage, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
// Mui
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AspectRatio from "@mui/joy/AspectRatio"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"

const ProfilePage: BlitzPage = () => {
  return (
    <>
      {/* Box with Aspect Ratio */}
      <Box
        sx={{
          position: "relative",
          pt: "33%",
        }}
      >
        {/* Image Wrapper */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1655365035044-667fbccc2abe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80"
            alt="cover"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          sx={{
            width: 135,
            height: 135,
            marginTop: "-67.5px",
            border: "4px solid white",
          }}
        />
        <Button
          variant="contained"
          size="medium"
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
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography component="div" variant="h5" fontWeight="bold">
          John Doe
        </Typography>
        <Typography component="div" variant="body2" color="GrayText">
          @johndoe
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="InfoText"
          sx={{
            my: 2,
          }}
        >
          This Privacy Policy addresses the collection and use of personal information -
        </Typography>
        <Stack flexWrap="wrap" direction="row" spacing={2}>
          <Typography component="span" variant="body2" color="GrayText">
            https://google.com
          </Typography>
          <Typography component="span" variant="body2" color="GrayText">
            Joined June 2010
          </Typography>
        </Stack>
        <Stack direction="row" spacing={4} mt={1}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography component="span" variant="body2" fontWeight="bold">
              60
            </Typography>
            <Typography component="span" variant="body2" color="GrayText">
              Following
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography component="span" variant="body2" fontWeight="bold">
              19878
            </Typography>
            <Typography component="span" variant="body2" color="GrayText">
              Followers
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout title="Profile Page">{page}</Layout>

export default ProfilePage
