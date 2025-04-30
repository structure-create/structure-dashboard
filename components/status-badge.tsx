import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: "pending" | "completed" | "rejected"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusClasses = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
  }

  const statusText = {
    pending: "Pending",
    completed: "Completed",
    rejected: "Rejected",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        statusClasses[status],
        className,
      )}
    >
      {statusText[status]}
    </span>
  )
}
