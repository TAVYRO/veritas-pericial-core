import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-veritas-electric/20 bg-veritas-graphite/40 px-4 py-2 text-sm text-veritas-silver shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-veritas-silver-dim/40 focus-visible:border-veritas-electric/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-veritas-electric/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
