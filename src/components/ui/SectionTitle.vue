<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  accentColor?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  accentColor: '#FF5A7D',
})
</script>

<template>
  <div :class="cn('flex items-center gap-2', className)">
    <span
      class="inline-block h-4 w-1 rounded-full"
      :style="{ background: accentColor }"
    />
    <h3 class="text-base font-semibold text-ink-primary">
      <slot />
    </h3>
  </div>
</template>
