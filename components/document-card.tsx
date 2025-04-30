import Link from "next/link"
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
  return (
    <Link href={`/projects/${projectId}/documents/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-medium">{name}</span>
            </div>
            <StatusBadge status={status} />
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
