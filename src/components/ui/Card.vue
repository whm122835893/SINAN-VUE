<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useAttrs, computed } from 'vue'

interface Props {
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  radius?: 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'card' | 'card-lg'
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  radius: 'lg',
  shadow: 'card',
})

const emit = defineEmits<{
  click: []
}>()

const attrs = useAttrs()
const hasClickListener = computed(() => !!attrs.onClick)

const PADDING: Record<NonNullable<Props['padding']>, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}
const RADIUS: Record<NonNullable<Props['radius']>, string> = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-[20px]',
  xl: 'rounded-3xl',
}
const SHADOW: Record<NonNullable<Props['shadow']>, string> = {
  none: '',
  card: 'shadow-card',
  'card-lg': 'shadow-card-lg',
}
</script>

<template>
  <div
    @click="emit('click')"
    :class="cn(
      'bg-white',
      PADDING[padding],
      RADIUS[radius],
      SHADOW[shadow],
      hasClickListener && 'cursor-pointer',
      className,
    )"
  >
    <slot />
  </div>
</template>
