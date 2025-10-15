import * as React from "react"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon
  size?: number
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, icon: IconComponent, size = 16, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        size={size}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
