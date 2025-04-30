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

// Document status types
type DocumentStatus = "processing" | "rejected" | "approved"

// Document data type
type Document = {
  id: string
  name: string
  status: DocumentStatus
  lastUpdated: string
  type: string
}

// Mock project data
const getProject = (projectId: string) => {
  return {
    id: projectId,
    name: "Spruce Lane",
    status: "processing" as DocumentStatus,
    lastUpdated: "Apr 28, 2025",
  }
}

// Mock documents data
const getProjectDocuments = (projectId: string): Document[] => {
  return [
    {
      id: "1",
      name: "Spruce Lane",
      status: "processing",
      lastUpdated: "Apr 28, 2025",
      type: "Architectural",
    },
    {
      id: "2",
      name: "Spruce Lane",
      status: "rejected",
      lastUpdated: "Apr 25, 2025",
      type: "Architectural",
    },
    {
      id: "3",
      name: "Spruce Lane",
      status: "approved",
      lastUpdated: "Apr 22, 2025",
      type: "Mechanical",
    },
    {
      id: "4",
      name: "Spruce Lane",
      status: "processing",
      lastUpdated: "Apr 20, 2025",
      type: "Structural",
    },
    {
      id: "5",
      name: "Spruce Lane",
      status: "approved",
      lastUpdated: "Apr 18, 2025",
      type: "Electrical",
    },
    {
      id: "6",
      name: "Spruce Lane",
      status: "rejected",
      lastUpdated: "Apr 15, 2025",
      type: "Plumbing",
    },
  ]
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeStatus, setActiveStatus] = useState<"all" | DocumentStatus>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const project = getProject(projectId)
  const documents = getProjectDocuments(projectId)

  // Filter documents based on active status
  const filteredDocuments = documents.filter((doc) => (activeStatus === "all" ? true : doc.status === activeStatus))

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [router])

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
            <Link href="/" className="block">
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200">
                <LayoutDashboard className="h-4 w-4" />
                <span>My dashboard</span>
              </div>
            </Link>
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
            <Link href="/" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <ChevronRight className="h-5 w-5 text-gray-300" />
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-1 h-4 w-4" />
            New
          </Button>
        </div>

        {/* Project Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Processing</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* View Controls */}
          <div className="mb-6 flex items-center justify-end gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Last viewed</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex rounded-md border">
              <button className={cn("p-1.5", viewMode === "grid" && "bg-gray-100")} onClick={() => setViewMode("grid")}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button className={cn("p-1.5", viewMode === "list" && "bg-gray-100")} onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          <div
            className={cn(
              "grid gap-4",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {filteredDocuments.map((doc) => (
              <Link href={`/projects/${projectId}/documents/${doc.id}`} key={doc.id}>
                <div className="group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center gap-2">
                    {doc.status === "processing" && (
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
                    {doc.status === "rejected" && (
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
                    {doc.status === "approved" && (
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
                    <span className="font-medium">{doc.name}</span>
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
