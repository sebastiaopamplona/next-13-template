import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions.pages!.signIn as string)
  }

  return (
    <>
      <p>hello world</p>
    </>
  )
}
