"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutDashboard,
  Inbox,
  Settings,
  Archive,
  Trash2,
  MoreHorizontal,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Project status types
type ProjectStatus = "all" | "processing" | "rejected" | "approved"

// Project data type
type Project = {
  id: string
  name: string
  status: "processing" | "rejected" | "approved"
  lastUpdated: string
}

// Mock projects data
const projects: Project[] = [
  {
    id: "1",
    name: "Spruce Lane",
    status: "processing",
    lastUpdated: "Apr 28, 2025",
  },
  {
    id: "2",
    name: "Spruce Lane",
    status: "rejected",
    lastUpdated: "Apr 25, 2025",
  },
  {
    id: "3",
    name: "Spruce Lane",
    status: "approved",
    lastUpdated: "Apr 22, 2025",
  },
  {
    id: "4",
    name: "Spruce Lane",
    status: "processing",
    lastUpdated: "Apr 20, 2025",
  },
  {
    id: "5",
    name: "Spruce Lane",
    status: "approved",
    lastUpdated: "Apr 18, 2025",
  },
  {
    id: "6",
    name: "Spruce Lane",
    status: "rejected",
    lastUpdated: "Apr 15, 2025",
  },
  {
    id: "7",
    name: "Spruce Lane",
    status: "processing",
    lastUpdated: "Apr 12, 2025",
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeStatus, setActiveStatus] = useState<ProjectStatus>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [router])

  // Filter projects based on active status
  const filteredProjects = projects.filter((project) =>
    activeStatus === "all" ? true : project.status === activeStatus,
  )

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r bg-[#f9f8f6] transition-all duration-300",
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
              <path d="m7 16.5-4.74-2.85" />
              <path d="m7 16.5 5-3" />
              <path d="M7 16.5v5.17" />
              <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
              <path d="m17 16.5-5-3" />
              <path d="m17 16.5 4.74-2.85" />
              <path d="M17 16.5v5.17" />
              <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
              <path d="M12 8 7.26 5.15" />
              <path d="m12 8 4.74-2.85" />
              <path d="M12 13.5V8" />
            </svg>
          </div>
          <span className="text-lg font-semibold">Structure</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Find..."
              className="h-9 rounded-full bg-[#e8e5e0] pl-9 border-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Recents</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium">
              <LayoutDashboard className="h-4 w-4" />
              <span>My dashboard</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <Inbox className="h-4 w-4" />
              <span>Inbox</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <Archive className="h-4 w-4" />
              <span>Archived</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <Trash2 className="h-4 w-4" />
              <span>Trash</span>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-black text-white">IL</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Iris Leung</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-md p-1 hover:bg-gray-100">
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-1 h-4 w-4" />
            New
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Status Filters */}
          <div className="mb-6 flex items-center gap-2">
            <Button
              variant="ghost"
              className={cn("rounded-md px-4 py-2 text-sm font-medium", activeStatus === "all" && "bg-gray-100")}
              onClick={() => setActiveStatus("all")}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 9h6" />
                <path d="M9 12h6" />
                <path d="M9 15h6" />
              </svg>
              All applications
            </Button>
            <Button
              variant="ghost"
              className={cn("rounded-md px-4 py-2 text-sm font-medium", activeStatus === "processing" && "bg-gray-100")}
              onClick={() => setActiveStatus("processing")}
            >
              <svg
                className="mr-2 h-4 w-4 text-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
              Processing
            </Button>
            <Button
              variant="ghost"
              className={cn("rounded-md px-4 py-2 text-sm font-medium", activeStatus === "rejected" && "bg-gray-100")}
              onClick={() => setActiveStatus("rejected")}
            >
              <svg
                className="mr-2 h-4 w-4 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              Rejected
            </Button>
            <Button
              variant="ghost"
              className={cn("rounded-md px-4 py-2 text-sm font-medium", activeStatus === "approved" && "bg-gray-100")}
              onClick={() => setActiveStatus("approved")}
            >
              <svg
                className="mr-2 h-4 w-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Approved
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span>Last viewed</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex rounded-md border">
                <button
                  className={cn("p-1.5", viewMode === "grid" && "bg-gray-100")}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  className={cn("p-1.5", viewMode === "list" && "bg-gray-100")}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div
            className={cn(
              "grid gap-4",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow"
              >
                <div className="flex items-center gap-2">
                  {project.status === "processing" && (
                    <svg
                      className="h-5 w-5 text-amber-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  )}
                  {project.status === "rejected" && (
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  )}
                  {project.status === "approved" && (
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}
                  <span className="font-medium">{project.name}</span>
                  <button className="ml-auto opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
