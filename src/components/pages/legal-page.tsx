import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

type LegalSection = {
  heading: string
  paragraphs?: readonly string[]
  items?: readonly string[]
}

interface LegalPageProps {
  className?: string
  eyebrow?: string
  title: string
  intro: string
  sections: LegalSection[]
  updatedAt?: string
}

const LegalPage = ({
  className,
  eyebrow,
  title,
  intro,
  sections,
  updatedAt = 'Last updated: April 24, 2026',
}: LegalPageProps) => {
  return (
    <section className={cn('flex justify-center py-20 md:py-28', className)}>
      <div className="container max-w-4xl px-4">
        <div className="mb-12 border-b pb-8">
          {eyebrow ? (
            <Badge variant="outline" className="mb-4 tracking-wide">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {intro}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{updatedAt}</p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export { LegalPage }
