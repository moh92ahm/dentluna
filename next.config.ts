import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'
import { defaultLocale } from './src/i18n/locales'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    const staticPages = ['about', 'contact', 'treatments', 'blog', 'doctors', 'gallery', 'faq']
    return [
      // Root redirect
      { source: '/', destination: `/${defaultLocale}`, permanent: false },
      // Static page redirects
      ...staticPages.map((page) => ({
        source: `/${page}`,
        destination: `/${defaultLocale}/${page}`,
        permanent: false,
      })),
      // Dynamic slug redirects
      { source: '/blog/:slug', destination: `/${defaultLocale}/blog/:slug`, permanent: false },
      {
        source: '/treatments/:slug',
        destination: `/${defaultLocale}/treatments/:slug`,
        permanent: false,
      },
      {
        source: '/doctors/:slug',
        destination: `/${defaultLocale}/doctors/:slug`,
        permanent: false,
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/static/**',
      },
      {
        pathname: '/*.png',
      },
      {
        pathname: '/*.jpg',
      },
      {
        pathname: '/*.jpeg',
      },
      {
        pathname: '/*.svg',
      },
      {
        pathname: '/*.webp',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deifkwefumgah.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.net',
        pathname: '/**',
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
