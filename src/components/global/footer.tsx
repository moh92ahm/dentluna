import React from 'react'
import { getTranslations } from 'next-intl/server'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import { Logo } from '@/components/global/logo'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface FooterProps {
  logo?: {
    url?: string
  }
  className?: string
}

const Footer = async ({ logo = { url: '/' }, className }: FooterProps) => {
  const t = await getTranslations('footer')
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: t('quickLinks'),
      links: [
        { name: t('about'), href: '/about' },
        { name: t('contact'), href: '/contact' },
        { name: t('doctors'), href: '/doctors' },
      ],
    },
    {
      title: t('resources'),
      links: [
        { name: t('blog'), href: '/blog' },
        { name: t('faqs'), href: '/faq' },
        { name: t('gallery'), href: '/gallery' },
      ],
    },
    {
      title: t('services'),
      links: [
        { name: t('hollywoodSmile'), href: '#' },
        { name: t('allOns'), href: '#' },
        { name: t('dentalImplants'), href: '#' },
        { name: t('crowns'), href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: <FaInstagram className="size-5" />, href: '#', label: 'Instagram' },
    { icon: <FaFacebook className="size-5" />, href: '#', label: 'Facebook' },
    { icon: <FaLinkedin className="size-5" />, href: '#', label: 'LinkedIn' },
  ]

  const legalLinks = [
    { name: t('termsAndConditions'), href: '#' },
    { name: t('privacyPolicy'), href: '#' },
  ]

  return (
    <section className={cn('flex justify-center mt-15', className)}>
      <div className="container px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={(logo.url as any) ?? '/'}>
                <Logo loading="lazy" priority="low" className="w-[9.375rem]" />
              </Link>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">{t('description')}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-10">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <Link href={link.href as any}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between items-center gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{t('copyright', { year: currentYear })}</p>
          <ul className="order-1 flex gap-2 md:order-2 flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link href={link.href as any}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export { Footer }
