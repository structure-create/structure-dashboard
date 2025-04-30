"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle password reset with a backend
    console.log("Password reset requested for:", email)

    // Show success message
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center" style={{ position: "sticky", top: "34px", marginBottom: "40px" }}>
              <img src="/logo-text.svg" alt="Structure Logo" className="h-[34px] w-auto" style={{ height: "34px" }} />
            </div>
        </div>

        <div className="rounded-lg bg-white px-6 py-8 shadow sm:px-10">
          <h2 className="mb-6 text-xl font-medium text-gray-900">Reset your password</h2>

          {isSubmitted ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  If an account exists with this email, we've sent password reset instructions.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Link href="/auth/login" className="font-medium text-orange-600 hover:text-orange-500">
                  Return to sign in
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@gmail.com"
                    required
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-md bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Send reset link
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link href="/auth/login" className="font-medium text-orange-600 hover:text-orange-500">
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
