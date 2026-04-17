'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ContactFormData = {
  name: string
  email: string
  phone?: string
  message: string
}

interface Contact30Props {
  email?: string
  phone?: string
  address?: string
  className?: string
  onSubmit?: (data: ContactFormData) => Promise<void>
}

const Contact30 = ({
  email = 'info@dentluna.com',
  phone = '+90 (232) 000-0000',
  address = 'Izmir, Turkey',
  className,
  onSubmit,
}: Contact30Props) => {
  const t = useTranslations('contact')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24987.91486637383!2d27.056095374316403!3d38.476348699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd94762f08ae3%3A0xf059aff61fe11577!2zRGVudCBMdW5hIEHEn8SxeiB2ZSBEacWfIFNhxJ9sxLHEn8SxIFBvbGlrbGluacSfaQ!5e0!3m2!1sen!2str!4v1776253175024!5m2!1sen!2str'

  const contactFormSchema = z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    phone: z.string().optional(),
    message: z.string().min(1, t('messageRequired')),
  })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        console.log('Form submitted:', data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setIsSubmitted(true)
      setShowSuccess(true)
      form.reset()
      setTimeout(() => setShowSuccess(false), 4500)
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch {
      form.setError('root', {
        message: t('errorMsg'),
      })
    }
  }

  return (
    <section className={cn('relative min-h-screen bg-muted/30 justify-center flex', className)}>
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
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full rounded-2xl bg-background p-8 shadow-lg md:p-10"
            >
              <h2 className="mb-8 text-2xl font-semibold">{t('sendMessage')}</h2>

              {isSubmitted && (
                <div
                  className={cn(
                    'mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500',
                    showSuccess ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {t('success')}
                  </p>
                </div>
              )}

              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          {t('nameLabel')} <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder={t('namePlaceholder')}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          {t('emailLabel')} <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder={t('emailPlaceholder')}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>{t('phoneLabel')}</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                      />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        {t('messageLabel')} <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder={t('messagePlaceholder')}
                        rows={5}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
                )}

                <Button size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 size-4 animate-spin" />
                      {t('sendingBtn')}
                    </>
                  ) : (
                    t('sendBtn')
                  )}
                </Button>
              </FieldGroup>
            </form>
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

export { Contact30 }
