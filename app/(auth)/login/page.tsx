import { LoginForm } from "@/components/user/login-form"

export default async function LoginPage() {
  // TODO(SP) redirect to dashboard if user is logged in

  return (
    <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8 pt-40">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
      </div>
    </div>
  )
}
