"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle login with a backend
    console.log("Login data:", formData)

    // For demo purposes, redirect to dashboard after "login"
    localStorage.setItem("isLoggedIn", "true")
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFFFD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center" style={{ position: "sticky", top: "34px", marginBottom: "40px" }}>
              <img src="/logo-text.svg" alt="Structure Logo" className="h-[34px] w-auto" style={{ height: "34px" }} />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white px-0 py-6 shadow sm:px-10" style={{ borderRadius: "7.5px", border: "1px solid #F2EFE9" }}>
          <h2 className="mb-3 text-xl font-bold text-[#333] font-['PP_Neue_Montreal'] leading-normal">Sign in</h2>
          <div className="w-full h-[1px] bg-[#F2EFE9] mb-3"></div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--alt-text)] mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@gmail.com"
                required
                className="h-10 w-full rounded-md border border-[#F2EFE9] bg-[#FAF9F6] px-3 py-2 text-[var(--alt-text)] placeholder:text-[#E0DED7] focus:border-[var(--brand)] focus:outline-none focus:ring-0"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--alt-text)] mb-1">
                  Password
                </label>
              </div>
                <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                className="h-10 w-full rounded-md border border-[#F2EFE9] bg-[#FAF9F6] px-3 py-2 text-[var(--alt-text)] placeholder:text-[#E0DED7] focus:border-[var(--brand)] focus:outline-none focus:ring-0"
                value={formData.password}
                onChange={handleChange}
                />
                <div className="mt-4">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium font-weight-[400px] text-[#967B6B] hover:text-[var(--alt-text)]"
                >
                  Forgot your password?
                </Link>
                </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-md bg-[var(--brand)] py-2 px-4 text-sm font-medium text-white hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-medium text-[var(--brand)] hover:text-[var(--brand-hover)]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
