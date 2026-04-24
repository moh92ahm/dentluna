'use client'

import { Menu, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/navigation'

import { Logo } from '@/components/global/logo'
import { LanguageSwitcher } from '@/components/global/language-switcher'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  url: string
}

interface HeaderProps {
  className?: string
  locale: string
  navLinks?: NavLink[]
}

const Header = ({ className, locale, navLinks: cmsLinks = [] }: HeaderProps) => {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const FALLBACK_ITEMS = [
    { label: t('home'), url: '/' },
    { label: t('about'), url: '/about' },
    { label: t('contact'), url: '/contact' },
    { label: t('treatments'), url: '/treatments' },
    { label: t('gallery'), url: '/gallery' },
    { label: t('doctors'), url: '/doctors' },
  ]

  const NAV_ITEMS = cmsLinks.length > 0 ? cmsLinks : FALLBACK_ITEMS

  const currentItem = NAV_ITEMS.find((item) => item.url === pathname)?.label ?? NAV_ITEMS[0].label
  const [activeItem, setActiveItem] = useState(currentItem)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setActiveItem(currentItem)
  }, [currentItem])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const indicatorRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(`[data-nav-item="${activeItem}"]`) as HTMLElement

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect()
        const itemRect = activeEl.getBoundingClientRect()

        indicatorRef.current.style.width = `${itemRect.width}px`
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`
      }
    }
    updateIndicator()
    window.addEventListener('resize', updateIndicator)

    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeItem])

  return (
    <section
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-[padding] duration-300',
        scrolled ? 'py-2' : 'py-4',
        className,
      )}
    >
      <nav className="w-full flex justify-center px-4">
        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                'transition-[width] duration-300 overflow-hidden',
                scrolled ? 'w-28' : 'w-37.5',
              )}
            >
              <Logo loading="eager" priority="high" className="w-full" />
            </div>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList
              ref={menuRef}
              className="flex items-center gap-6 rounded-4xl px-8 py-3"
            >
              {NAV_ITEMS.map((item) => (
                <React.Fragment key={item.label}>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      data-nav-item={item.label}
                      onClick={() => setActiveItem(item.label)}
                      className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                        activeItem === item.label ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      <Link href={item.url as Parameters<typeof Link>[0]['href']}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </React.Fragment>
              ))}
              {/* Active Indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
              >
                <div className="h-0.5 w-full rounded-t-none bg-foreground transition-all duration-300" />
              </div>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Language Switcher */}
          <LanguageSwitcher locale={locale} />

          {/* Get a Quote Button */}
          {/* <Button variant="outline" size="sm" className="h-10 py-2.5 text-sm font-normal">
            {t('contact')}
          </Button> */}
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                'transition-[width] duration-300 overflow-hidden',
                scrolled ? 'w-28' : 'w-37.5',
              )}
            >
              <Logo loading="eager" priority="high" className="w-full" />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} navItems={NAV_ITEMS} />
          </div>
        </div>
      </nav>
    </section>
  )
}

export { Header }

// ─── Animated Hamburger ───────────────────────────────────────────────────────

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative size-full">
      <div className="absolute flex size-full items-center justify-center">
        <Menu
          className={`absolute size-6 text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        />
        <X
          className={`absolute size-6 text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        />
      </div>
    </div>
  )
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────

const MobileNav = ({
  activeItem,
  setActiveItem,
  navItems,
}: {
  activeItem: string
  setActiveItem: (item: string) => void
  navItems: { label: string; url: string }[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex h-full items-center lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <AnimatedHamburger isOpen={isOpen} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative top-4 -right-4 block w-[calc(100vw-32px)] overflow-hidden rounded-xl p-0 sm:top-auto sm:right-auto sm:w-80 lg:hidden"
        >
          <ul className="w-full bg-background py-4 text-foreground">
            {navItems.map((navItem, idx) => (
              <li key={idx}>
                <Link
                  href={navItem.url as Parameters<typeof Link>[0]['href']}
                  onClick={() => setActiveItem(navItem.label)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.label
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
            {/* <li className="flex flex-col px-7 py-2">
              <Button variant="outline">{t('contact')}</Button>
            </li> */}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
