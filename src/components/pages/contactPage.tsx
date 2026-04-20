'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ConsultationForm } from '@/components/pages/consultation-form'
import { cn } from '@/lib/utils'

interface ContactProps {
  email?: string
  phone?: string
  address?: string
  className?: string
  treatments?: { title: string; slug: string }[]
}

const Contact = ({
  email = 'info@dentluna.com',
  phone = '+0542 635 41 20',
  address = 'Şemikler, Ordu Blv Şenler Forum Sitesi D:240/B, Karşıyaka/İzmir, Turkey',
  className,
  treatments = [],
}: ContactProps) => {
  const t = useTranslations('contact')
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24987.91486637383!2d27.056095374316403!3d38.476348699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd94762f08ae3%3A0xf059aff61fe11577!2zRGVudCBMdW5hIEHEn8SxeiB2ZSBEacWfIFNhxJ9sxLHEn8SxIFBvbGlrbGluacSfaQ!5e0!3m2!1sen!2str!4v1776253175024!5m2!1sen!2str'

  return (
    <section className={cn('relative min-h-screen justify-center flex', className)}>
      <div className="container flex min-h-screen flex-col justify-center py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="mb-12 text-xl text-muted-foreground md:text-2xl">{t('subtitle')}</p>

            <div className="space-y-6">
              <a href={`mailto:${email}`} className="group flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <Mail className="size-5 text-muted-foreground" />
                </div>
                <span className="group-hover:underline">{email}</span>
              </a>
              <a href={`tel:${phone}`} className="group flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <Phone className="size-5 text-muted-foreground" />
                </div>
                <span className="group-hover:underline">{phone}</span>
              </a>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <MapPin className="size-5 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">{address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <ConsultationForm treatments={treatments} />
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border bg-background shadow-lg">
          <iframe
            title="Google Map"
            src={mapSrc}
            className="h-[320px] w-full md:h-[600px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

export { Contact }
