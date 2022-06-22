import { z } from "zod"

export const SendTweetSchema = z.object({
  body: z.string().min(1).max(280),
})
