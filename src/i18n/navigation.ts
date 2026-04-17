import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Typed Link, useRouter, usePathname, redirect — all locale-aware
export const { Link, useRouter, usePathname, redirect } = createNavigation(routing)
