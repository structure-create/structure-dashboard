"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, ChevronLeft, Search, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DocumentPage({ params }: { params: { projectId: string; documentId: string } }) {
  const { projectId, documentId } = params
  const [activeTab, setActiveTab] = useState<"violations" | "comments">("violations")
  const [expandedSection, setExpandedSection] = useState<string>("electrical")
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

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

  const complianceSections = [
    { id: "plumbing", name: "Plumbing", count: 1 },
    { id: "zoning", name: "Zoning", count: 4 },
    { id: "civil", name: "Civil", count: 0 },
    { id: "structural", name: "Structural", count: 0 },
    { id: "electrical", name: "Electrical", count: 3 },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId)
  }

  return (
    <div className="flex h-screen">

      {/* Left Sidebar */}
      <div className={cn("border-r bg-gray-50 flex flex-col transition-all duration-300", leftSidebarOpen ? "w-72" : "w-10")}>
        {/* Row 1: Logo + Collapse Button */}
        <div className="flex items-center justify-between h-14 px-4">
          {leftSidebarOpen && <img src="/logo.svg" alt="Logo" className="h-6 w-auto" />}
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="hover:bg-gray-200 p-1 rounded-full"
          >
            {leftSidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Row 2: Project Dropdown */}
        {leftSidebarOpen && (
          <div className="flex items-center justify-between px-4 h-12">
            <span className="text-base font-semibold text-gray-800">Spruce Lane</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        )}

        {/* Row 3: Tabs and Search */}
        {leftSidebarOpen && (
          <div className="flex items-center justify-between px-4 h-12 border-b">
            <div className="flex space-x-4">
              <button className="text-sm font-medium bg-[#d6cfc7] text-black px-3 py-1 rounded-lg">Drawings</button>
              <button className="text-sm font-medium text-gray-600 hover:text-black">Specifications</button>
            </div>
            <Search className="h-4 w-4 text-gray-600 cursor-pointer" />
          </div>
        )}

        {/* Divider */}
        <div className="border-b" />

        {/* Table of Contents */}
        {leftSidebarOpen && (
          <div className="overflow-y-auto px-4 py-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={cn(
                  "border-l-4 border-transparent pl-2 py-2 text-sm hover:bg-gray-100",
                  doc.active && "border-orange-500 bg-orange-50"
                )}
              >
                <Link href={`/projects/${projectId}/documents/${doc.id}`} className="block">
                  {doc.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Main Viewer */}
      <div className="flex-1 overflow-hidden bg-white">
        <iframe
          src={`/examples/spruce-lane.pdf#toolbar=0&navpanes=0&scrollbar=0&view=fit`}
          className="w-full h-full"
          style={{ border: "none" }}
          title="PDF Document"
        />
      </div>


      {/* Right Sidebar */}
      <div className={cn("border-l bg-white flex flex-col transition-all duration-300", rightSidebarOpen ? "w-80" : "w-10")}>
        
        {/* Action Buttons */}
        {rightSidebarOpen && (
          <>
            <div className="flex justify-center gap-2 p-4">
              <Button variant="outline" size="sm">Submit</Button>
              <Button variant="outline" size="sm">Export</Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">Share</Button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={cn("flex-1 py-3 text-center text-sm font-medium", activeTab === "violations" && "border-b-2 border-gray-900")}
                onClick={() => setActiveTab("violations")}
              >
                Violations
              </button>
              <button
                className={cn("flex-1 py-3 text-center text-sm font-medium", activeTab === "comments" && "border-b-2 border-gray-900")}
                onClick={() => setActiveTab("comments")}
              >
                Comments
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto flex-1">
              {activeTab === "violations" && (
                <div>
                  {complianceSections.map((section) => (
                    <div key={section.id} className="border-b">
                      <button
                        className="w-full px-4 py-3 flex justify-between items-center"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-2">
                          {section.name}
                          {section.count > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{section.count}</span>
                          )}
                        </div>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSection === section.id && "rotate-90")} />
                      </button>
                      {expandedSection === section.id && section.id === "electrical" && (
                        <div className="bg-gray-50 px-4 py-4 text-sm space-y-4">
                          <div>
                            <h4 className="font-semibold">Incomplete or Missing Electrical System Layout</h4>
                            <p>All 125V, 15–20A receptacles listed in 210.8(A)(1)-(10) shall have GFCI protection.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Insufficient Working Space Around Panels</h4>
                            <p>Working space around panels must meet 110.26(A)(1)-(3).</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "comments" && (
                <div className="p-4 text-sm text-gray-700 space-y-4">
                  <div>
                    <strong>Bob the Builder</strong> (Page 4): Add kitchen dimensions; island–fridge clearance may not meet code.
                  </div>
                  <div>
                    <strong>Uyen Hoang</strong> (Page 29): Add window sizes and sill heights to elevations.
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}