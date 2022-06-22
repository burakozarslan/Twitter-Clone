import { SendTweetSchema } from "app/tweets/validations"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
// Material UI
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

const SendTweetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SendTweetSchema>>({
    resolver: zodResolver(SendTweetSchema),
  })
  const onSubmit: SubmitHandler<z.infer<typeof SendTweetSchema>> = (data) => console.log(data)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <InputBase {...register("body")} placeholder="New tweet" />
      <Typography component="p">{errors.body?.message}</Typography>
      <Button type="submit">Send</Button>
    </Box>
  )
}

export default SendTweetForm
