<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  bg?: string
  withBottomNav?: boolean
}

withDefaults(defineProps<Props>(), {
  bg: 'bg-white',
  withBottomNav: false,
})
</script>

<template>
  <div :class="cn('phone-shell', bg, withBottomNav && 'with-bottom-nav', className)">
    <slot />
  </div>
</template>
