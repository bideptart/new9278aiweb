'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render NextThemesProvider directly on every pass (server and client).
  // The previous version delayed this behind a `mounted` flag and swapped
  // it in after the first client render — but that swap is itself a
  // client-only re-render, and inserting next-themes' internal <script>
  // tag during that re-render (rather than during the initial SSR/hydration
  // pass) is exactly what triggered the "script tag" and hydration warnings.
  // `suppressHydrationWarning` on <html>/<body> in app/layout.tsx already
  // covers the flash-of-wrong-theme case next-themes is designed for.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
