import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"

type CommentItemProps = {
  author: {
    name: string
    avatar?: string
  }
  time: string
  page?: string
  pageNumber?: number
  content: string
}

export function CommentItem({ author, time, page, pageNumber, content }: CommentItemProps) {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{author.name}</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          {(page || pageNumber) && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              {page && <span>Page {page}</span>}
              {pageNumber && <span>Page {pageNumber}</span>}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 pl-10 text-sm">{content}</div>
      <div className="mt-2 pl-10">
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
          <Reply className="h-3 w-3" />
          Reply
        </Button>
      </div>
    </div>
  )
}
