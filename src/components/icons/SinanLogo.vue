<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

interface Props {
  size?: number
  variant?: 'black' | 'white' | 'gold'
  className?: string
  withGear?: boolean
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 48,
  variant: 'black',
  withGear: false,
  circle: false,
})

const bg = computed(() =>
  props.variant === 'black' ? '#000000' : props.variant === 'white' ? '#FFFFFF' : '#1A1A1A'
)

const textColor = computed(() =>
  props.variant === 'white' ? '#FF5A7D' : '#D4A574'
)

const innerSize = computed(() =>
  props.withGear ? props.size - 8 : props.size
)
</script>

<template>
  <div
    :class="cn('relative inline-flex items-center justify-center', className)"
    :style="{ width: size, height: size }"
  >
    <div
      v-if="withGear"
      class="absolute inset-0 animate-spin-slow"
      :style="{
        background:
          'conic-gradient(from 0deg, transparent 0deg 18deg, rgba(212,165,116,0.4) 18deg 30deg, transparent 30deg 60deg, rgba(212,165,116,0.4) 60deg 72deg, transparent 72deg 90deg, rgba(212,165,116,0.4) 90deg 102deg, transparent 102deg 360deg)',
        borderRadius: circle ? '50%' : 18,
        padding: 4,
      }"
    />
    <div
      class="relative flex items-center justify-center"
      :style="{
        width: innerSize,
        height: innerSize,
        background: bg,
        borderRadius: circle ? '50%' : Math.max(10, size * 0.2),
        boxShadow:
          '0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
      }"
    >
      <span
        class="font-bold leading-none"
        :style="{
          color: textColor,
          fontSize: size * 0.22,
          fontFamily: 'Georgia, serif',
          textShadow: '0 1px 1px rgba(0,0,0,0.5)',
        }"
      >
        司南
      </span>
    </div>
  </div>
</template>
