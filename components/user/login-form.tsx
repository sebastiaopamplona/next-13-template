"use client"

import { useRouter, useSearchParams } from "next/navigation"

import React from "react"
import { cn } from "@/lib/utils"
import { loginFormSchema } from "@/lib/validations/login-form"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof loginFormSchema>

export function LoginForm({ ...props }: Props) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("credentials", {
      redirect: false,
      email: data.email.toLowerCase(),
      password: data.password.toLowerCase(),
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      alert("something went wrong")
      return
    }

    router.push(searchParams.get("from") || "/dashboard")
  }

  return (
    <div className={cn("grid gap-6")} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              className="w-full"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Password
            </label>
            <input id="password" className="w-full" type="password" disabled={isLoading} {...register("password")} />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
            Sign In with Email
          </button>
        </div>
      </form>
    </div>
  )
}
