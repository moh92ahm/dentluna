import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  async redirects() {
    const staticPages = ['about', 'contact', 'treatments', 'blog', 'doctors', 'gallery', 'faq']
    return [
      // Root redirect
      { source: '/', destination: '/en', permanent: false },
      // Static page redirects
      ...staticPages.map((page) => ({
        source: `/${page}`,
        destination: `/en/${page}`,
        permanent: false,
      })),
      // Dynamic slug redirects
      { source: '/blog/:slug', destination: '/en/blog/:slug', permanent: false },
      { source: '/treatments/:slug', destination: '/en/treatments/:slug', permanent: false },
      { source: '/doctors/:slug', destination: '/en/doctors/:slug', permanent: false },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
