import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
    last_name: z.string().trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
  confirm_password: z
    .string()
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined