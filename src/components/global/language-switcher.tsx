'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { externalLocales, localeFlags, localeFullLabels } from '@/i18n/locales'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LanguageSwitcherProps {
  locale: string
}

export const LanguageSwitcher = ({ locale }: LanguageSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          size="icon"
          className="size-9 cursor-pointer text-foreground hover:text-primary"
          aria-label="Select language"
        >
          <span className="text-xl" aria-hidden="true">
            {localeFlags[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {routing.locales
          .filter((loc) => loc !== locale)
          .map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => router.replace(pathname, { locale: loc })}
              className="cursor-pointer gap-2"
            >
              <span className="text-base leading-none">{localeFlags[loc]}</span>
              <span>{localeFullLabels[loc]}</span>
            </DropdownMenuItem>
          ))}
        {externalLocales.map((loc) => (
          <DropdownMenuItem key={loc.code} asChild className="cursor-pointer gap-2">
            <a href={loc.href}>
              <span className="text-base leading-none">{localeFlags[loc.code]}</span>
              <span>{localeFullLabels[loc.code]}</span>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
