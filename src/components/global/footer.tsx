import React from 'react'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaXTwitter, FaTiktok } from 'react-icons/fa6'

import { Logo } from '@/components/global/logo'
import { LanguageSwitcher } from '@/components/global/language-switcher'
import { Link } from '@/i18n/navigation'
import { isPathHiddenForLocale } from '@/i18n/localePolicy'
import { cn } from '@/lib/utils'
import type { Treatment, Post } from '@/payload-types'

interface FooterProps {
  className?: string
}

const socialIconMap: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="size-5" />,
  facebook: <FaFacebook className="size-5" />,
  linkedin: <FaLinkedin className="size-5" />,
  twitter: <FaXTwitter className="size-5" />,
  youtube: <FaYoutube className="size-5" />,
  tiktok: <FaTiktok className="size-5" />,
}

function normalizeUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

function resolveLink(link: {
  linkType: 'custom' | 'treatment' | 'post'
  label?: string | null
  url?: string | null
  treatment?: Treatment | number | null
  post?: Post | number | null
}): { label: string; href: string } | null {
  if (link.linkType === 'custom') {
    if (!link.url) return null
    return { label: link.label ?? link.url, href: normalizeUrl(link.url) }
  }
  if (link.linkType === 'treatment') {
    const doc = typeof link.treatment === 'object' ? link.treatment : null
    if (!doc) return null
    return { label: link.label ?? doc.title, href: `/treatments/${doc.slug}` }
  }
  if (link.linkType === 'post') {
    const doc = typeof link.post === 'object' ? link.post : null
    if (!doc) return null
    return { label: link.label ?? doc.title, href: `/blog/${doc.slug}` }
  }
  return null
}

const Footer = async ({ className }: FooterProps) => {
  const locale = await getLocale()
  const currentYear = new Date().getFullYear()

  const payload = await getPayload({ config })
  const footerData = await payload.findGlobal({
    slug: 'footer-settings',
    locale: locale as any,
    depth: 1,
  })

  const copyrightText = (
    footerData.copyrightText ?? `© ${currentYear} Dent Luna. All rights reserved.`
  ).replace('{year}', String(currentYear))

  return (
    <section className={cn('flex justify-center mt-15', className)}>
      <div className="container px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          {/* Column 1: Logo + description + social links */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href="/">
                <Logo loading="lazy" priority="low" className="w-[9.375rem]" />
              </Link>
            </div>
            {footerData.description && (
              <p className="max-w-[70%] text-sm text-muted-foreground">{footerData.description}</p>
            )}
            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {footerData.socialLinks.map((social, idx) => (
                  <li key={idx} className="font-medium hover:text-primary">
                    <a
                      href={social.url}
                      aria-label={social.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socialIconMap[social.platform] ?? null}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Columns 2-4: Link sections */}
          {footerData.linkSections && footerData.linkSections.length > 0 && (
            <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-10">
              {footerData.linkSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold">{section.heading}</h3>
                  {section.links && section.links.length > 0 && (
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {section.links.map((link, linkIdx) => {
                        const resolved = resolveLink(link as any)
                        if (!resolved) return null
                        if (isPathHiddenForLocale(locale, resolved.href)) return null
                        return (
                          <li key={linkIdx} className="font-medium hover:text-primary">
                            <Link href={resolved.href as any}>{resolved.label}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col justify-between items-center gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyrightText}</p>
          <div className="order-1 flex items-center gap-4 md:order-2">
            <LanguageSwitcher locale={locale} />
            {footerData.legalLinks && footerData.legalLinks.length > 0 && (
              <ul className="flex gap-2 flex-row">
                {footerData.legalLinks.map((link, idx) =>
                  isPathHiddenForLocale(locale, normalizeUrl(link.url)) ? null : (
                    <li key={idx} className="hover:text-primary">
                      <Link href={normalizeUrl(link.url) as any}>{link.label}</Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Footer }
