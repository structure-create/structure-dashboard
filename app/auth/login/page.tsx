"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, EyeClosed, Eye } from "lucide-react"


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
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center" style={{ position: "absolute", top: "5%" }}>
              <img src="/logo-text.svg" alt="Structure Logo" className="h-[35px] w-auto" />
            </div>
          </div>
        </div>

        {/* Main login box */}
        <div className="rounded-lg bg-white py-3 shadow" style={{ borderRadius: "7.5px", border: "1px solid #F2EFE9" }}>
          {/* Sign In */}
            <div className="px-6">
              <h2 className="mb-3 text-xl font-bold text-[#333] font-[family-name:var(--montreal)] leading-normal">Sign in</h2>
            </div>
          {/* Divider */}
          <div className="mb-6 w-full h-[1px] bg-[#F2EFE9] mb-3"></div>
          <div className="px-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--alt-text)] mb-1">
                Email
              </label>
              <div className="relative">
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@gmail.com"
                required
                className="h-10 w-full rounded-md border border-[#F2EFE9] bg-[#FAF9F6] px-10 py-2 text-[var(--alt-text)] placeholder:text-[#E0DED7] focus:border-[var(--brand)] focus:outline-none focus:ring-0"
                value={formData.email}
                onChange={handleChange}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#E0DED7]" />
                </div>
              </div>
              </div>

              {/* Password */}
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--alt-text)] mb-1">
                Password
                </label>
              </div>
              <div className="relative">
                <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                className="h-10 w-full rounded-md border border-[#F2EFE9] bg-[#FAF9F6] px-10 py-2 text-[var(--alt-text)] placeholder:text-[#E0DED7] focus:border-[var(--brand)] focus:outline-none focus:ring-0"
                value={formData.password}
                onChange={handleChange}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#E0DED7]" />
                </div>
                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[var(--alt-text)] hover:text-[var(--alt-text)] focus:outline-none"
                >
                {showPassword ? (
                  <Eye className="h-4 w-4 text-[var(--alt-text)]" />
                ) : (
                  <EyeClosed className="h-4 w-4 text-[var(--alt-text)]" />
                )}
                </button>
              </div>
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
          </div>

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
