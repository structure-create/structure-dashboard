import type React from "react"
import { AlertTriangle } from "lucide-react"

type ViolationAlertProps = {
  type: "warning" | "error"
  title: string
  description: string
  code?: string
  children?: React.ReactNode
}

export function ViolationAlert({ type, title, description, code, children }: ViolationAlertProps) {
  const isWarning = type === "warning"

  return (
    <div className={isWarning ? "violation-warning" : "violation-error"}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className={`h-5 w-5 ${isWarning ? "text-amber-400" : "text-red-400"}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${isWarning ? "text-amber-800" : "text-red-800"}`}>{title}</h3>
          <div className={`mt-2 text-sm ${isWarning ? "text-amber-700" : "text-red-700"}`}>
            <p>{description}</p>
            {code && <p className="mt-1 font-medium">{code}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
