import React from "react"
// Blitz
import { useMutation, useRouter, Routes } from "blitz"
import { EditProfileSchema } from "app/users/validations"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCurrentUser } from "../hooks/useCurrentUser"
import editProfile from "app/users/mutations/editProfile"
// Components
import StyledSnackbar from "./StyledSnackbar"
// Material UI
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

interface EditProfileModalProps {
  open: boolean
  handleClose: () => void
}

const EditProfileModal = ({ open, handleClose }: EditProfileModalProps) => {
  const router = useRouter()

  const { currentUser, refetch: refetchCurrentUser } = useCurrentUser()
  const [editProfileMutation] = useMutation(editProfile)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    mode: "onChange",
    defaultValues: {
      bannerImage: currentUser?.bannerImage || "",
      avatar: currentUser?.avatar || "",
      name: currentUser?.name || "",
      bio: currentUser?.bio || "",
      location: currentUser?.location || "",
    },
  })
  const onSubmit: SubmitHandler<z.infer<typeof EditProfileSchema>> = (data) => {
    editProfileMutation(data, {
      onSuccess: () => {
        router.reload()
      },
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Edit Profile Modal"
      aria-describedby="Edit Profile Modal"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          // boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={3}
          sx={{
            p: 3,
            borderBottom: "1px solid #eaeaea",
          }}
        >
          {/* <StyledSnackbar
            isOpen={open}
            message={message}
            status={status}
            key={123}
            onClose={() => setOpen(false)}
          /> */}
          {/* TODO: Add rows on input */}
          <Controller
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Banner Image"
                label="Banner Image"
                error={!!errors?.bannerImage}
                helperText={errors?.bannerImage?.message}
                type="text"
                {...field}
              />
            )}
            control={control}
            defaultValue=""
            name="bannerImage"
          />
          <Controller
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Avatar"
                label="Avatar"
                error={!!errors?.avatar}
                helperText={errors?.avatar?.message}
                type="text"
                {...field}
              />
            )}
            control={control}
            defaultValue=""
            name="avatar"
          />

          <Controller
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Name"
                label="Name"
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : `${field.value.length}/50`}
                type="text"
                {...field}
              />
            )}
            control={control}
            defaultValue=""
            name="name"
          />

          <Controller
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Bio"
                label="Bio"
                error={!!errors?.bio}
                helperText={errors?.bio ? errors.bio.message : `${field.value?.length}/160`}
                type="text"
                multiline={true}
                rows={4}
                {...field}
              />
            )}
            control={control}
            defaultValue=""
            name="bio"
          />

          <Controller
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Location"
                label="Location"
                error={!!errors?.location}
                helperText={
                  errors?.location ? errors.location.message : `${field.value?.length}/30`
                }
                type="text"
                {...field}
              />
            )}
            control={control}
            defaultValue=""
            name="location"
          />
          <Button type="submit">Save</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default EditProfileModal
