import * as React from "react"
// Components
import Tweet from "./Tweet"
import SendTweetForm from "./SendTweetForm"
// Material UI
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import { BsThreeDots } from "react-icons/bs"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import CircularProgress from "@mui/material/CircularProgress"
// Icons
import { BsChat, BsHeart } from "react-icons/bs"
// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
// Blitz
import { useMutation, useQuery } from "blitz"
import getHomeFeedTweets from "app/tweets/queries/getHomeFeedTweets"
import unfollowUser from "app/users/mutations/unfollowUser"

const HomeFeed = () => {
  const [homeFeedTweets, { refetch, isLoading }] = useQuery(getHomeFeedTweets, undefined, {
    suspense: false,
  })

  return (
    <Box>
      <SendTweetForm />
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" size={25} />
        </Box>
      )}
      {homeFeedTweets?.map((tweet) => (
        <Tweet
          key={tweet.id}
          authorId={tweet.authorId}
          authorName={tweet.author.name}
          authorUsername={tweet.author.username}
          authorAvatar={tweet.author.avatar}
          body={tweet.body}
          refetch={refetch}
        />
      ))}
    </Box>
  )
}

export default HomeFeed
