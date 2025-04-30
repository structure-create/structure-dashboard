"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DocumentPage({ params }: { params: { projectId: string; documentId: string } }) {
  const { projectId, documentId } = params
  const [activeTab, setActiveTab] = useState<"violations" | "comments">("violations")
  const [expandedSection, setExpandedSection] = useState<string>("electrical")
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  // Mock data for pages/documents
  const documents = [
    { id: "page1", name: "Page 1" },
    { id: "page2", name: "Page 2" },
    { id: "a02", name: "A0.2 - Existing Site Plan", active: true },
    { id: "a03", name: "A0.3 - Proposed Site Plan" },
    { id: "a04", name: "A0.4 - Erosion Control Plan" },
    { id: "a05", name: "A0.5 - General Project Notes" },
    { id: "a11", name: "A1.1 - Demolition Plan" },
    { id: "a12", name: "A1.2 - Floor Plan" },
    { id: "a21", name: "A2.1 - Existing Exterior Elevations" },
    { id: "a22", name: "A2.2 - Existing Exterior Elevations" },
    { id: "a23", name: "A2.3 - Exterior Elevations" },
    { id: "a24", name: "A2.4 - Exterior Elevations" },
    { id: "a32", name: "A3.2 - Door & Storefront Elevations" },
    { id: "a41", name: "A4.1 - Accessibility Details" },
  ]

  // Mock data for compliance sections
  const complianceSections = [
    { id: "plumbing", name: "Plumbing", count: 1 },
    { id: "zoning", name: "Zoning", count: 4 },
    { id: "civil", name: "Civil", count: 0 },
    { id: "structural", name: "Structural", count: 0 },
    { id: "electrical", name: "Electrical", count: 3 },
  ]

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection("")
    } else {
      setExpandedSection(sectionId)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">Spruce Lane</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            Submit
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            Export
          </Button>
          <Button size="sm" className="h-9 bg-orange-600 hover:bg-orange-700">
            Share
          </Button>
        </div>
      </header>

      {/* Secondary Navigation */}
      <div className="flex h-12 items-center border-b bg-gray-50 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex h-10 items-center gap-1 rounded-none border-b-2 border-transparent px-4 text-sm font-normal",
              "bg-orange-50 border-orange-500 text-orange-700",
            )}
          >
            Drawings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex h-10 items-center gap-1 rounded-none border-b-2 border-transparent px-4 text-sm font-normal"
          >
            Specifications
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex h-10 items-center gap-1 rounded-none border-b-2 border-transparent px-2 text-sm font-normal"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Document Pages */}
        <div
          className={cn(
            "border-r bg-gray-50 transition-all duration-300 ease-in-out",
            leftSidebarOpen ? "w-72" : "w-10",
          )}
        >
          {/* Toggle Button */}
          <div className="flex h-10 items-center justify-end border-b px-2">
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
            >
              {leftSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>

          {/* Document List - Only show when sidebar is open */}
          {leftSidebarOpen && (
            <div className="overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "border-l-4 border-transparent px-4 py-3 hover:bg-gray-100",
                    doc.active && "border-l-4 border-orange-500 bg-orange-50",
                  )}
                >
                  <Link href={`/projects/${projectId}/documents/${doc.id}`} className="block text-sm">
                    {doc.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Document Viewer */}
        <div className="relative flex-1 overflow-auto bg-white">
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-29%20at%207.12.41%E2%80%AFPM-FtBEa9OmSomAZsnG6WqyNPUUYPefor.png"
              alt="Spruce Lane Site Plan"
              width={1200}
              height={900}
              className="min-w-full"
            />
          </div>
        </div>

        {/* Right Sidebar - Compliance */}
        <div
          className={cn(
            "border-l bg-white transition-all duration-300 ease-in-out",
            rightSidebarOpen ? "w-80" : "w-10",
          )}
        >
          {/* Toggle Button */}
          <div className="flex h-10 items-center border-b px-2">
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
            >
              {rightSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Only show content when sidebar is open */}
          {rightSidebarOpen && (
            <>
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={cn(
                    "flex-1 border-b-2 border-transparent py-3 text-center text-sm font-medium",
                    activeTab === "violations" && "border-gray-900",
                  )}
                  onClick={() => setActiveTab("violations")}
                >
                  Violations
                </button>
                <button
                  className={cn(
                    "flex-1 border-b-2 border-transparent py-3 text-center text-sm font-medium",
                    activeTab === "comments" && "border-gray-900",
                  )}
                  onClick={() => setActiveTab("comments")}
                >
                  Comments
                </button>
              </div>

              {/* Violations Content */}
              {activeTab === "violations" && (
                <div className="overflow-y-auto">
                  {complianceSections.map((section) => (
                    <div key={section.id} className="border-b">
                      <button
                        className="flex w-full items-center justify-between px-4 py-4"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{section.name}</span>
                          {section.count > 0 && (
                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                              {section.count}
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          className={cn("h-5 w-5 transition-transform", expandedSection === section.id && "rotate-90")}
                        />
                      </button>

                      {/* Expanded Content for Electrical */}
                      {expandedSection === "electrical" && section.id === "electrical" && (
                        <div className="border-t bg-gray-50 px-4 py-4">
                          <div className="mb-6">
                            <h3 className="font-medium">
                              Incomplete or Missing Electrical System Layout and Panel Schedules
                            </h3>
                            <div className="mt-2 flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                              >
                                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                                <path d="M7 7h.01"></path>
                              </svg>
                              <span className="text-sm text-gray-700">
                                California Electrical Code (CEC)/NEC 210.8(A)
                              </span>
                            </div>
                            <p className="mt-3 text-sm">
                              All 125-volt, single-phase, 15- and 20-ampere receptacles installed in the locations
                              specified in 210.8(A)(1) through (A)(10) shall have ground-fault circuit-interrupter
                              protection for personnel.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-medium">Insufficient Working Space Around Electrical Panels</h3>
                            <div className="mt-2 flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                              >
                                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                                <path d="M7 7h.01"></path>
                              </svg>
                              <span className="text-sm text-gray-700">CEC/NEC 110.26(A)(1), (2), (3)</span>
                            </div>
                            <p className="mt-3 text-sm">
                              Working space for equipment operating at 600 volts, nominal, or less to ground and likely
                              to require examination, adjustment, servicing, or maintenance while energized shall comply
                              with the dimensions of 110.26(A)(1), (2), and (3)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Comments Content */}
              {activeTab === "comments" && (
                <div className="p-4">
                  {/* Comment 1 */}
                  <div className="mb-6">
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
                        B
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Bob the Builder</span>
                          <span className="text-xs text-gray-500">15 mins ago</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center gap-1">Page 4</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                          Provide additional dimensions for the kitchen layout. The distance between the island and the
                          refrigerator appears tight and may not meet code-required clearances.
                        </p>
                        <div className="mt-2">
                          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 17 4 12 9 7" />
                              <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                            </svg>
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="mb-6">
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
                        U
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Uyen Hoang</span>
                          <span className="text-xs text-gray-500">1 hr ago</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center gap-1">Page 29</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">Add window sizes and sill heights to elevations</p>
                        <div className="mt-2">
                          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 17 4 12 9 7" />
                              <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                            </svg>
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
