import clsx from 'clsx'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps === 'high'

  return (
    <Image
      alt="Dentluna Logo"
      width={193}
      height={91}
      loading={loading}
      priority={priority}
      fetchPriority={priorityFromProps || 'low'}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-auto', className)}
      src="/dentluna-logo.png"
    />
  )
}
