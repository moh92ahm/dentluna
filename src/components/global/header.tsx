'use client'

import { Menu, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname, Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { Logo } from '@/components/global/logo'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  fr: 'FR',
}

interface HeaderProps {
  className?: string
  locale: string
}

const Header = ({ className, locale }: HeaderProps) => {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()

  const NAV_ITEMS = [
    { name: t('home'), link: '/' as const },
    { name: t('about'), link: '/about' as const },
    { name: t('contact'), link: '/contact' as const },
    { name: t('treatments'), link: '/treatments' as const },
    { name: t('gallery'), link: '/gallery' as const },
    { name: t('doctors'), link: '/doctors' as const },
  ]

  const currentItem = NAV_ITEMS.find((item) => item.link === pathname)?.name ?? NAV_ITEMS[0].name
  const [activeItem, setActiveItem] = useState(currentItem)

  useEffect(() => {
    setActiveItem(currentItem)
  }, [currentItem])

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
    <section className={cn('border-b py-4', className)}>
      <nav className="w-full flex justify-center px-4">
        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo loading="eager" priority="high" className="w-[9.375rem]" />
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList
              ref={menuRef}
              className="flex items-center gap-6 rounded-4xl px-8 py-3"
            >
              {NAV_ITEMS.map((item) => (
                <React.Fragment key={item.name}>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      data-nav-item={item.name}
                      onClick={() => setActiveItem(item.name)}
                      className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                        activeItem === item.name ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      <Link href={item.link}>{item.name}</Link>
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
          <LanguageSwitcher locale={locale} router={router} pathname={pathname} />

          {/* Get a Quote Button */}
          <Button variant="outline" size="sm" className="h-10 py-2.5 text-sm font-normal">
            {t('contact')}
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Logo loading="eager" priority="high" className="w-[9.375rem]" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} router={router} pathname={pathname} />
            <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} navItems={NAV_ITEMS} />
          </div>
        </div>
      </nav>
    </section>
  )
}

export { Header }

// ─── Language Switcher ────────────────────────────────────────────────────────

const LanguageSwitcher = ({
  locale,
  router,
  pathname,
}: {
  locale: string
  router: ReturnType<typeof useRouter>
  pathname: string
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 font-mono text-xs font-semibold">
          {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            disabled={loc === locale}
            onClick={() => router.replace(pathname, { locale: loc })}
            className="cursor-pointer"
          >
            {LOCALE_LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
  navItems: { name: string; link: string }[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <div className="block flex h-full items-center lg:hidden">
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
                  href={navItem.link as any}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.name
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
            <li className="flex flex-col px-7 py-2">
              <Button variant="outline">{t('contact')}</Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
