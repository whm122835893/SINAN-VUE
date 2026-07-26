<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  illustration: any
  title?: string
  subtitle?: string
  className?: string
}

defineProps<Props>()
</script>

<template>
  <div
    :class="cn(
      'flex flex-col items-center justify-center gap-3 px-6 py-12 text-center',
      className,
    )"
  >
    <component :is="illustration" />
    <p v-if="title" class="text-base font-semibold text-ink-primary">{{ title }}</p>
    <p v-if="subtitle" class="text-sm text-ink-tertiary">{{ subtitle }}</p>
    <slot />
  </div>
</template>
