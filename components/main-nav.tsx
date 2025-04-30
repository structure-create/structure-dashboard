"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, this would call your logout API
    localStorage.removeItem("isLoggedIn")
    router.push("/auth/login")
  }

  return (
    <div className="flex h-16 items-center border-b bg-white px-4">
      <div className="flex items-center gap-2 font-semibold">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-white">
          <Building className="h-5 w-5" />
        </div>
        <Link href="/" className="text-lg font-semibold">
          Structure
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              <span>Spruce Lane</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/" className="flex w-full">
                All Projects
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">Export</Button>
        <Button className="bg-orange-600 hover:bg-orange-700">Share</Button>
      </div>
    </div>
  )
}
