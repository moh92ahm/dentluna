declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOB_READ_WRITE_TOKEN?: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL?: string
      PAYLOAD_SECRET: string
      PREVIEW_SECRET?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
    }
  }
}

export {}
