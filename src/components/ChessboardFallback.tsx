import { View, ViewProps } from 'react-native'

import { cn } from '@/lib/utils'

export default function ChessboardFallback({ className, ...props }: ViewProps) {
  return <View className={cn('size-[10.75rem] bg-yellow-800', className)} {...props} />
}
