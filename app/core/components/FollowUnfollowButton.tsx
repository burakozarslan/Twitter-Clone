import React from "react"

import Button, { ButtonProps } from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface FollowUnfollowButtonProps extends ButtonProps {
  isFollowing: boolean
}

const FollowUnfollowButton = ({ isFollowing, ...rest }: FollowUnfollowButtonProps) => {
  return (
    <Button
      {...rest}
      sx={{
        backgroundColor: isFollowing ? "white" : "black",
        color: isFollowing ? "black" : "white",
        borderRadius: 10,
        textTransform: "none",
        fontWeight: "bold",
        height: 30,
        border: isFollowing ? "1px solid #eaeaea" : "none",

        "&:hover": {
          backgroundColor: isFollowing ? "white" : "black",
          opacity: 0.85,
          color: isFollowing ? "red" : "white",
        },
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  )
}

export default FollowUnfollowButton
