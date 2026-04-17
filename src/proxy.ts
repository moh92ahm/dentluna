import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handleLocale = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return handleLocale(request)
}

export const config = {
  // Run on all routes except Payload admin, API, Next.js internals, and static files
  matcher: ['/((?!admin|api|_next|_vercel|static|.*\\..*).*)'],
}
