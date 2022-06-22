import { z } from "zod"

export const SendTweetSchema = z.object({
  body: z.string().max(280),
})
