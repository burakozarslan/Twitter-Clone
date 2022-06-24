import React from "react"
import EditProfileModal from "./EditProfileModal"
import Button from "@mui/material/Button"

const EditProfileButton = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        color="inherit"
        sx={{
          typography: "body2",
          fontWeight: "bold",
          textTransform: "none",
          letterSpacing: "0.5px",
          borderRadius: 10,
          border: "1px solid #aaa",
        }}
      >
        Edit Profile
      </Button>
      <EditProfileModal open={open} handleClose={handleClose} />
    </>
  )
}

export default EditProfileButton
