import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export interface Faq11Question {
  id: string
  question: string
  answer: string
}

export interface Faq11Category {
  title: string
  questions: Faq11Question[]
}

interface Faq11Props {
  className?: string
  categories?: Faq11Category[]
}

const Faq11 = ({ className, categories = [] }: Faq11Props) => {
  return (
    <section
      className={cn(
        'relative flex justify-center mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-linear-to-b from-background via-background to-slate-100 lg:mx-4 dark:to-slate-900',
        className,
      )}
    >
      <section className="py-32">
        <div className="container grid max-w-5xl gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Got Questions?
            </h2>

            <p className="max-w-md leading-snug font-medium text-muted-foreground lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{' '}
              <a href="/contact" className="underline underline-offset-4">
                get in touch
              </a>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.length === 0 && (
              <p className="text-muted-foreground">
                No FAQs available right now. Please check back soon.
              </p>
            )}

            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="border-b py-4 font-medium text-muted-foreground">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={item.id} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger className="text-start">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

export { Faq11 }
