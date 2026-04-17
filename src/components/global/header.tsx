'use client'

import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/global/logo'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const NAV_LOGO = {
  url: '/',
}
const NAV_ITEMS = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
  { name: 'Treatments', link: '/treatments' },
  { name: 'Gallery', link: '/gallery' },
  { name: 'Doctors', link: '/doctors' },
]

interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname()
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
        {/* Desktop: Logo + Navigation + SignUp Centered */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Logo */}
          <a href={NAV_LOGO.url} className="flex items-center gap-2">
            <Logo loading="eager" priority="high" className="w-[9.375rem]" />
          </a>

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
                      href={item.link}
                      data-nav-item={item.name}
                      onClick={() => setActiveItem(item.name)}
                      className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                        activeItem === item.name ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {item.name}
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

          {/* Get a Quote Button */}
          <Button variant="outline" size="sm" className="h-10 py-2.5 text-sm font-normal">
            Get a Quote
          </Button>
        </div>

        {/* Mobile: Logo + Menu Button */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <a href={NAV_LOGO.url} className="flex items-center gap-2">
            <Logo loading="eager" priority="high" className="w-[9.375rem]" />
          </a>
          <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
      </nav>
    </section>
  )
}

export { Header }

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

const MobileNav = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string
  setActiveItem: (item: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

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
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <a
                  href={navItem.link}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.name
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {navItem.name}
                </a>
              </li>
            ))}
            <li className="flex flex-col px-7 py-2">
              <Button variant="outline">Get a Quote</Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
