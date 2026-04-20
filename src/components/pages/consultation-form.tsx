'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ConsultationFormData = {
  name: string
  phone: string
  email?: string
  promoCode?: string
}

interface ConsultationFormProps {
  className?: string
}

const ConsultationForm = ({ className }: ConsultationFormProps) => {
  const t = useTranslations('consultationForm')
  const locale = useLocale()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const formSchema = z.object({
    name: z.string().min(1, t('nameRequired')),
    phone: z.string().min(1, t('phoneRequired')),
    email: z.string().email(t('emailInvalid')).optional().or(z.literal('')),
    promoCode: z.string().optional(),
  })

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      promoCode: '',
    },
  })

  const handleFormSubmit = async (data: ConsultationFormData) => {
    try {
      const res = await fetch('/api/form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          category: 'Dental Treatment',
          promoCode: data.promoCode || undefined,
          lang: locale,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Submission failed')
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
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className={cn('w-full rounded-2xl bg-background p-8 shadow-lg md:p-10', className)}
    >
      <h2 className="mb-2 text-2xl font-semibold md:text-3xl">{t('heading')}</h2>
      <p className="mb-8 text-muted-foreground">{t('subheading')}</p>

      {isSubmitted && (
        <div
          className={cn(
            'mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500',
            showSuccess ? 'opacity-100' : 'opacity-0',
          )}
        >
          <p className="text-sm font-medium text-green-600 dark:text-green-400">{t('success')}</p>
        </div>
      )}

      <FieldGroup>
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
          name="phone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {t('phoneLabel')} <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder={t('phonePlaceholder')}
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
              <FieldLabel htmlFor={field.name}>{t('emailLabel')}</FieldLabel>
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

        <Controller
          control={form.control}
          name="promoCode"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t('promoLabel')}</FieldLabel>
              <Input {...field} id={field.name} placeholder={t('promoPlaceholder')} />
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
            t('submitBtn')
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}

export { ConsultationForm }
