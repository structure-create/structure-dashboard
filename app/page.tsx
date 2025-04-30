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
import Link from "next/link"

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
    name: "Deale Community Park",
    status: "processing",
    lastUpdated: "Apr 25, 2025",
  },
  {
    id: "3",
    name: "Cape St Claire Fire...",
    status: "approved",
    lastUpdated: "Apr 22, 2025",
  },
  {
    id: "4",
    name: "Forest Dr/MD 665 Int...",
    status: "processing",
    lastUpdated: "Apr 20, 2025",
  },
  {
    id: "5",
    name: "Franklin Manor Dredgi...",
    status: "rejected",
    lastUpdated: "Apr 18, 2025",
  },
  {
    id: "6",
    name: "Jug Bay Education Cen...",
    status: "approved",
    lastUpdated: "Apr 15, 2025",
  },
  {
    id: "7",
    name: "Millersville Library",
    status: "approved",
    lastUpdated: "Apr 12, 2025",
  },
  {
    id: "8",
    name: "Greenways",
    status: "approved",
    lastUpdated: "Apr 10, 2025",
  },
  {
    id: "9",
    name: "Patuxent Clarifier",
    status: "approved",
    lastUpdated: "Apr 8, 2025",
  },
  {
    id: "10",
    name: "Najoles Road Outfall-00",
    status: "approved",
    lastUpdated: "Apr 6, 2025",
  },
  {
    id: "11",
    name: "Sun Valley Dr",
    status: "approved",
    lastUpdated: "Apr 4, 2025",
  }
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
          "flex flex-col border-r bg-[#FAF9F6] transition-all duration-300",
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-64",
        )}
      >
        {/* User Profile */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-black text-white">IL</AvatarFallback>
            </Avatar>
            <div className="font-normal text-gray-900">Iris Leung</div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
            <Input
              placeholder="Find..."
              className="h-10 rounded-sm bg-white pl-9 border border-[#EFEEE9] text-[#EFEEE9]"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Recents</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-normal text-gray-900">
              <LayoutGrid className="h-4 w-4" />
              <span>My dashboard</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md">
              <Inbox className="h-4 w-4" />
              <span>Inbox</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md">
              <Trash2 className="h-4 w-4" />
              <span>Trash</span>
            </div>
          </div>

          <div className="px-3 py-1">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md">
              <Archive className="h-4 w-4" />
              <span>Archived</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-md p-1 hover:bg-gray-100">
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            <h1 className="text-xl font-normal text-gray-700">Dashboard</h1>
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
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium text-gray-500",
                activeStatus === "all" && "bg-[#F5F4F1] text-gray-900"
              )}
              onClick={() => setActiveStatus("all")}
            >
              <img
                src="/svgs/allprojects.svg"
                alt="All Projects"
                className="mr-2 h-4 w-4"
              />
              All applications
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium text-gray-500",
                activeStatus === "processing" && "bg-[#F5F4F1] text-gray-900"
              )}
              onClick={() => setActiveStatus("processing")}
            >
              <img
                src="/svgs/processing.svg"
                alt="Processing"
                className="mr-2 h-4 w-4"
              />
              Processing
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium text-gray-500",
                activeStatus === "rejected" && "bg-[#F5F4F1] text-gray-900"
              )}
              onClick={() => setActiveStatus("rejected")}
            >
              <img
                src="/svgs/rejected.svg"
                alt="Rejected"
                className="mr-2 h-4 w-4"
              />
              Rejected
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium text-gray-500",
                activeStatus === "approved" && "bg-[#F5F4F1] text-gray-900"
              )}
              onClick={() => setActiveStatus("approved")}
            >
              <img
                src="/svgs/approved.svg"
                alt="Approved"
                className="mr-2 h-4 w-4"
              />
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
              <Link href={`/projects/${project.id}`} key={project.id}>
                <div className="group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center gap-2">
                    <img
                      src={`/svgs/${project.status}.svg`}
                      alt={project.status}
                      className="h-5 w-5"
                    />
                    <span className="font-medium">{project.name}</span>
                    <button className="ml-auto opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
