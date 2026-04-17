import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Faq11, type Faq11Category } from '@/components/faq/faq11'
import type { Faq, FaqCategory } from '@/payload-types'

export default async function FaqPage() {
  const payload = await getPayload({ config: configPromise })

  const [faqsResponse, categoriesResponse] = await Promise.all([
    payload.find({
      collection: 'faqs',
      depth: 1,
      limit: 200,
      overrideAccess: false,
      sort: 'order',
    }),
    payload.find({
      collection: 'faq-categories',
      limit: 100,
      overrideAccess: false,
      sort: 'title',
    }),
  ])

  const faqs = (faqsResponse.docs || []) as Faq[]
  const categories = (categoriesResponse.docs || []) as FaqCategory[]

  const categoryMap = new Map<string, Faq11Category>()

  categories.forEach((category) => {
    categoryMap.set(String(category.id), {
      title: category.title,
      questions: [],
    })
  })

  const uncategorized: Faq11Category = {
    title: 'General',
    questions: [],
  }

  faqs.forEach((faq) => {
    const questionItem = {
      id: String(faq.id),
      question: faq.question,
      answer: faq.answer,
    }

    if (!faq.category) {
      uncategorized.questions.push(questionItem)
      return
    }

    const categoryId =
      typeof faq.category === 'number'
        ? String(faq.category)
        : String((faq.category as FaqCategory).id)

    const matchedCategory = categoryMap.get(categoryId)

    if (matchedCategory) {
      matchedCategory.questions.push(questionItem)
    } else {
      uncategorized.questions.push(questionItem)
    }
  })

  const faqCategories = Array.from(categoryMap.values()).filter(
    (category) => category.questions.length > 0,
  )

  if (uncategorized.questions.length > 0) {
    faqCategories.push(uncategorized)
  }

  return (
    <main>
      <Faq11 categories={faqCategories} />
    </main>
  )
}
