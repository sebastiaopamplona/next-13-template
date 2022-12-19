import { authOptions } from "@/lib/auth"
import { unstable_getServerSession } from "next-auth/next"

export async function getSession() {
  return await unstable_getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()

  return session?.user
}
