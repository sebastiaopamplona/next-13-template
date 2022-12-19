import * as z from "zod"

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  // .min(12)
  // .regex(/[a-zA-Z0-9]/)
  // .regex(/[!@#$%^&*]/),
})
