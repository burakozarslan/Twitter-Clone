import Snackbar from "@mui/material/Snackbar"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"

interface StyledSnackbarProps {
  message: string
  isOpen: boolean
  status: "success" | "error" | "info" | "warning"
  onClose: () => void
}

const StyledSnackbar = ({ message, isOpen, status, onClose }: StyledSnackbarProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={onClose}
      action={<Button onClick={onClose}>Close</Button>}
    >
      <Alert severity={status} sx={{ width: 300 }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default StyledSnackbar
