import Link from "next/link"
import Image from "next/image"
import { FileText } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type DocumentCardProps = {
  id: string
  projectId: string
  name: string
  status: "pending" | "completed" | "rejected"
  lastUpdated: string
  type: string
}

export function DocumentCard({ id, projectId, name, status, lastUpdated, type }: DocumentCardProps) {
  // Get a unique thumbnail number between 1-6 based on the document id
  const thumbnailNumber = id === "1" ? 1 : ((parseInt(id.replace(/\D/g, '')) % 7) + 1)
  
  return (
    <Link href={`/projects/${projectId}/documents/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={`/svgs/spruce_lane${thumbnailNumber}.svg`}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-medium">{name}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2 text-sm text-muted-foreground">
          <p>Type: {type}</p>
        </CardContent>
        <CardFooter className="pt-0 text-sm">
          <p>Last updated: {lastUpdated}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
