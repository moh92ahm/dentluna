import { test, expect, Page } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })
})

test.describe('Locale routing', () => {
  test('English home page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)
    await expect(page).toHaveURL(`${BASE_URL}/en`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('German home page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/de`)
    await expect(page).toHaveURL(`${BASE_URL}/de`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('French home page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr`)
    await expect(page).toHaveURL(`${BASE_URL}/fr`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('German treatments page loads at /de/behandlungen', async ({ page }) => {
    await page.goto(`${BASE_URL}/de/behandlungen`)
    await expect(page).toHaveURL(`${BASE_URL}/de/behandlungen`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('French treatments page loads at /fr/traitements', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr/traitements`)
    await expect(page).toHaveURL(`${BASE_URL}/fr/traitements`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('German blog page loads at /de/blog', async ({ page }) => {
    await page.goto(`${BASE_URL}/de/blog`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('French blog page loads at /fr/blog', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr/blog`)
    await expect(page).toHaveTitle(/Dent Luna/)
  })

  test('404 page shows in German for unknown German route', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/de/this-page-does-not-exist`)
    expect(response?.status()).toBe(404)
    const heading = page.getByRole('heading', { name: 'Seite nicht gefunden' })
    await expect(heading).toBeVisible()
  })

  test('404 page shows in French for unknown French route', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/fr/cette-page-nexiste-pas`)
    expect(response?.status()).toBe(404)
    const heading = page.getByRole('heading', { name: 'Page introuvable' })
    await expect(heading).toBeVisible()
  })
})

test.describe('Language switcher', () => {
  test('switches from English to German', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)
    // Open the language switcher dropdown
    const switcher = page.getByRole('button', { name: /English/i })
    await switcher.click()
    // Click the German option
    const deOption = page.getByRole('menuitem', { name: /Deutsch/i })
    await deOption.click()
    await expect(page).toHaveURL(`${BASE_URL}/de`)
  })

  test('switches from English to French', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)
    const switcher = page.getByRole('button', { name: /English/i })
    await switcher.click()
    const frOption = page.getByRole('menuitem', { name: /Français/i })
    await frOption.click()
    await expect(page).toHaveURL(`${BASE_URL}/fr`)
  })
})
