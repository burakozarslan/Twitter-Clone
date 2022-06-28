import * as React from "react"
// Blitz
import { SendTweetSchema } from "app/tweets/validations"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "blitz"
import sendTweet from "app/tweets/mutations/sendTweet"
// Material UI
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
// Components
import StyledSnackbar from "app/core/components/StyledSnackbar"
// Icons
import { MdOutlinePermMedia } from "react-icons/md"

const SendTweetForm = () => {
  const [sendTweetMutation] = useMutation(sendTweet)
  const [message, setMessage] = React.useState<string>("")
  const [status, setStatus] = React.useState<"success" | "error" | "info" | "warning">("success")
  const [open, setOpen] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof SendTweetSchema>>({
    resolver: zodResolver(SendTweetSchema),
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<z.infer<typeof SendTweetSchema>> = (data) => {
    sendTweetMutation(data, {
      onSuccess: () => {
        reset()
        setMessage("Tweet sent!")
        setStatus("success")
        setOpen(true)
      },
      onError: () => {
        setMessage("Something went wrong!")
        setStatus("error")
        setOpen(true)
      },
    })
  }

  React.useEffect(() => {
    trigger("body")
  }, [trigger])

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <StyledSnackbar
        isOpen={open}
        message={message}
        status={status}
        key={123}
        onClose={() => setOpen(false)}
      />
      {/* TODO: Add rows on input */}
      <TextField
        {...register("body")}
        autoComplete="off"
        placeholder="What's happening?"
        multiline={true}
        sx={{
          fontSize: "1.2rem",
          width: "100%",
          border: "none",
          outline: "none",
          mb: 2,
        }}
      />
      {errors.body?.type === "too_big" && (
        <Typography component="p" color="error">
          {errors.body.message}
        </Typography>
      )}
      <Stack direction="row" justifyContent="space-between">
        <IconButton
          sx={{
            color: "rgb(29, 155, 240)",
          }}
        >
          <MdOutlinePermMedia size={18} />
        </IconButton>
        <Button
          type="submit"
          variant="contained"
          disabled={!!errors.body}
          sx={{
            textTransform: "none",
            borderRadius: 10,
            fontWeight: "bold",
            backgroundColor: "rgb(29, 155, 240)",
            fontSize: 15,
          }}
        >
          Tweet
        </Button>
      </Stack>
    </Stack>
  )
}

export default SendTweetForm
