import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handleLocale = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Turkish locale: permanently redirect /tr/gallery (and any sub-paths) to /tr.
  // Keeps the gallery non-existent for bots and crawlers per Turkish regulations.
  if (pathname === '/tr/gallery' || pathname.startsWith('/tr/gallery/')) {
    const url = request.nextUrl.clone()
    url.pathname = '/tr'
    return Response.redirect(url, 301)
  }

  return handleLocale(request)
}

export const config = {
  // Run on all routes except Payload admin, API, Next.js internals, and static files
  matcher: ['/((?!admin|api|_next|_vercel|static|.*\\..*).*)'],
}
