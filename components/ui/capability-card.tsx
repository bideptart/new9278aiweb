import type { ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function CapabilityCard({
  icon: Icon,
  label,
  title,
  description,
  children,
  wide = false,
  className,
}: {
  icon: ElementType
  label: string
  title: string
  description: string
  children?: ReactNode
  wide?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 via-card/40 to-card/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_20px_45px_-24px_rgba(220,38,38,0.25)] dark:hover:shadow-[0_20px_45px_-24px_rgba(220,38,38,0.35)]",
        wide && "sm:flex-row sm:items-stretch sm:gap-10",
        className,
      )}
    >
      {/* Soft Ambient Light Glow Effect Behind Card */}
      <div className="pointer-events-none absolute -top-16 -left-16 size-48 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 opacity-70 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 opacity-50" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className={cn("relative z-10", wide && "sm:max-w-[15rem] sm:flex sm:flex-col sm:justify-center")}>
        <span className="flex size-10 items-center justify-center rounded-xl border border-border/50 bg-background text-primary shadow-2xs transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-primary/70">{label}</p>
        <h3 className="mt-1 text-lg font-normal tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {children && <div className={cn("relative z-10 mt-5", wide && "mt-6 w-full flex-1 sm:mt-0 flex flex-col items-stretch h-full")}>{children}</div>}
    </div>
  )
}
