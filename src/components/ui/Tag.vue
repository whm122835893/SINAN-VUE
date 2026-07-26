<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  active?: boolean
  variant?: 'orange' | 'magenta' | 'gray'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  variant: 'orange',
})

const emit = defineEmits<{
  click: []
}>()

const VARIANT_ACTIVE: Record<NonNullable<Props['variant']>, string> = {
  orange: 'bg-brand-orange text-white',
  magenta: 'bg-brand-magenta text-white',
  gray: 'bg-ink-secondary text-white',
}
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    :class="cn(
      'inline-flex items-center justify-center rounded-4xl px-3.5 py-1.5 text-xs font-medium transition active:scale-95',
      active
        ? VARIANT_ACTIVE[variant]
        : 'bg-surface-gray text-ink-secondary',
      className,
    )"
    :style="{ borderRadius: 16 }"
  >
    <slot />
  </button>
</template>
