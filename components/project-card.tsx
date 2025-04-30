import Link from "next/link"
import { Building } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectCardProps = {
  id: string
  address: string
  status: "pending" | "completed" | "rejected"
  lastUpdated: string
  documentsCount: number
}

export function ProjectCard({ id, address, status, lastUpdated, documentsCount }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-medium">{address}</span>
            </div>
            <StatusBadge status={status} />
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2 text-sm text-muted-foreground">
          <p>Last updated: {lastUpdated}</p>
        </CardContent>
        <CardFooter className="pt-0 text-sm">
          <p>{documentsCount} documents</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
