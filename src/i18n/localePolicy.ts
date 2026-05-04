interface LocalePolicy {
  showHomeBeforeAfter: boolean
  showHomeTestimonials: boolean
  showGalleryBeforeAfter: boolean
}

const defaultPolicy: LocalePolicy = {
  showHomeBeforeAfter: true,
  showHomeTestimonials: true,
  showGalleryBeforeAfter: true,
}

const localePolicyOverrides: Partial<Record<string, Partial<LocalePolicy>>> = {
  tr: {
    showHomeBeforeAfter: false,
    showHomeTestimonials: false,
    showGalleryBeforeAfter: false,
  },
}

export const getLocalePolicy = (locale: string): LocalePolicy => ({
  ...defaultPolicy,
  ...(localePolicyOverrides[locale] ?? {}),
})
