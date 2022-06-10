// Material UI
import Box from "@mui/material/Box"

interface ContentWrapperProps {
  children: React.ReactNode
}
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        border: "1px solid #eaeaea",
      }}
    >
      {children}
    </Box>
  )
}

export default ContentWrapper
