import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const payload = await getPayload({ config })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, phone, email, category, promoCode, lang } = body as {
    name?: string
    phone?: string
    email?: string
    category?: string
    promoCode?: string
    lang?: string
  }

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return Response.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return Response.json({ error: 'Phone number is required' }, { status: 400 })
  }

  // Validate email format if provided
  if (email && typeof email === 'string' && email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 })
    }
  }

  // Save to database
  const submission = await payload.create({
    collection: 'form-submissions',
    data: {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      category: category?.trim() || undefined,
      promoCode: promoCode?.trim() || undefined,
      lang: lang?.trim() || undefined,
    },
  })

  // Forward to CRM
  let crmSent = false
  let crmError: string | undefined

  try {
    const crmSettings = await payload.findGlobal({ slug: 'crm-settings' })

    if (crmSettings.enabled && crmSettings.webhookUrl) {
      const crmPayload = {
        lang: lang || 'en',
        'from website': crmSettings.fromWebsite || 'website',
        'Full Name': name.trim(),
        'Email Address': email?.trim() || '',
        'Phone Number': phone.trim(),
        'Choose your Category': category?.trim() || '',
        'Promotion Code': promoCode?.trim() || '',
      }

      const crmResponse = await fetch(crmSettings.webhookUrl, {
        method: 'POST',
        body: JSON.stringify(crmPayload),
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
      })

      if (crmResponse.ok) {
        crmSent = true
      } else {
        crmError = `CRM responded with status ${crmResponse.status}`
      }
    }
  } catch (err) {
    crmError = err instanceof Error ? err.message : 'Unknown CRM error'
  }

  // Update submission with CRM status
  await payload.update({
    collection: 'form-submissions',
    id: submission.id,
    data: {
      crmSent,
      ...(crmError ? { crmError } : {}),
    },
  })

  return Response.json({ success: true, id: submission.id })
}
