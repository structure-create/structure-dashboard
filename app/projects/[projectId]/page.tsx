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
import { DocumentCard } from "@/components/document-card"

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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Find..."
              className="h-10 rounded-lg bg-gray-50 pl-9 border-none"
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
            <Link href="/">
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-100">
                <LayoutGrid className="h-4 w-4" />
                <span>My dashboard</span>
              </div>
            </Link>
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
{/* Project Header */}
<div className="border-b p-6">
  <div className="flex items-center justify-between">
    {/* Left: title & status */}
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-semibold">{project.name}</h1>
      <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
        Processing
      </div>
    </div>

    {/* Right: last viewed + view toggles */}
    <div className="flex items-center gap-6">
      {/* Last viewed */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span>Last viewed</span>
        <ChevronDown className="h-4 w-4" />
      </div>

      {/* Grid/List toggles */}
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
</div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* View Controls */}
          <div className="mb-6 flex items-center justify-end ">
          </div>

          {/* Documents Grid */}
          <div
            className={cn(
              "grid gap-4",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                projectId={projectId}
                name={doc.name}
                status={doc.status}
                lastUpdated={doc.lastUpdated}
                type={doc.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
