"use client"

import type { CSSProperties } from "react"
import { useMemo } from "react"

/**
 * Concurrent Call Matrix — a dense grid of cells, each standing in for one
 * simultaneous call being answered right now. Every cell pulses on its own
 * schedule (see .matrix-cell / @keyframes cell-pulse in globals.css); the
 * stagger comes from a deterministic seeded function of the cell's index,
 * not Math.random(), so the server-rendered markup and the first client
 * render land on identical --cell-delay/--cell-duration values (no
 * hydration mismatch).
 *
 * Purely CSS-driven — no rAF loop, no per-cell timers — so it stays cheap
 * even at 80 simultaneous animations, and it's automatically covered by the
 * site-wide prefers-reduced-motion rule in globals.css (which zeroes every
 * animation-duration).
 */

const COLS_DESKTOP = 10
const ROWS = 8
const TOTAL = COLS_DESKTOP * ROWS // 80 — grid always renders this many cells

/** Deterministic pseudo-random in [0, 1) from an integer seed. */
function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

type Cell = {
  id: number
  delay: string
  duration: string
  /** ~14% of cells sit dim/idle at rest, reading as a call that just wrapped
      up rather than every line being mid-conversation at once. */
  idle: boolean
}

export function CallMatrix() {
  const cells = useMemo<Cell[]>(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: i,
        delay: `${(seeded(i) * 3.4).toFixed(2)}s`,
        duration: `${(1.8 + seeded(i + 1000) * 1.8).toFixed(2)}s`,
        idle: seeded(i + 2000) < 0.14,
      })),
    [],
  )

  return (
    <div>
      <div aria-hidden className="grid grid-cols-8 gap-[3px] sm:grid-cols-10 sm:gap-1">
        {cells.map((c) => (
          <span
            key={c.id}
            className="matrix-cell aspect-square w-full rounded-[2px] sm:rounded-[3px]"
            style={
              {
                "--cell-delay": c.delay,
                "--cell-duration": c.duration,
                opacity: c.idle ? 0.14 : undefined,
                animationPlayState: c.idle ? "paused" : undefined,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <p className="sr-only">
        Live visualization of over eighty simultaneous calls being answered at once, with no queue.
      </p>
    </div>
  )
}
