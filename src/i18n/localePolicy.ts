interface LocalePolicy {
  showHomeBeforeAfter: boolean
  showHomeTestimonials: boolean
  showGalleryBeforeAfter: boolean
  hiddenNavPaths: string[]
}

const defaultPolicy: LocalePolicy = {
  showHomeBeforeAfter: true,
  showHomeTestimonials: true,
  showGalleryBeforeAfter: true,
  hiddenNavPaths: [],
}

const localePolicyOverrides: Partial<Record<string, Partial<LocalePolicy>>> = {
  tr: {
    showHomeBeforeAfter: false,
    showHomeTestimonials: false,
    showGalleryBeforeAfter: false,
    hiddenNavPaths: ['/gallery'],
  },
}

export const getLocalePolicy = (locale: string): LocalePolicy => ({
  ...defaultPolicy,
  ...(localePolicyOverrides[locale] ?? {}),
})

const normalizePath = (path: string) => {
  const withoutQuery = path.split('?')[0]?.split('#')[0] ?? path
  const normalized = withoutQuery.trim().toLowerCase()
  if (normalized === '') return '/'
  return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized
}

export const isPathHiddenForLocale = (locale: string, path: string): boolean => {
  const policy = getLocalePolicy(locale)
  const normalizedPath = normalizePath(path)

  return policy.hiddenNavPaths.some((blockedPath) => {
    const normalizedBlockedPath = normalizePath(blockedPath)
    return (
      normalizedPath === normalizedBlockedPath ||
      normalizedPath.startsWith(`${normalizedBlockedPath}/`)
    )
  })
}
