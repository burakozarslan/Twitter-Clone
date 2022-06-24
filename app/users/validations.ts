import { z } from "zod"

export const EditProfileSchema = z.object({
  bannerImage: z.string().optional(),
  avatar: z.string().optional(),
  name: z.string().min(3).max(50),
  bio: z.string().max(160).optional(),
  location: z.string().max(30).optional(),
})
