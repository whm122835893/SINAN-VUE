<script lang="ts">
export type Icon3DKey =
  | 'compose'
  | 'exchange'
  | 'supply'
  | 'checkin'
  | 'swap'
  | 'lottery'
  | 'vote'

export const ICON_3D_META: { key: Icon3DKey; label: string }[] = [
  { key: 'checkin', label: '签到活动' },
  { key: 'compose', label: '合成活动' },
  { key: 'exchange', label: '兑换活动' },
  { key: 'lottery', label: '抽签活动' },
  { key: 'supply', label: '补给站' },
  { key: 'swap', label: '置换活动' },
  { key: 'vote', label: '投票活动' },
]

export const ROUTE_OF_ICON: Record<Icon3DKey, string> = {
  compose: '/compose',
  exchange: '/swap',
  supply: '/supply',
  checkin: '/checkin',
  swap: '/swap',
  lottery: '/lottery',
  vote: '/vote',
}

import { cn } from '@/lib/utils'
export function cnIcon(...args: Parameters<typeof cn>) {
  return cn(...args)
}
</script>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  name: Icon3DKey
  size?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 48,
})

const GRADIENTS: Record<Icon3DKey, string> = {
  compose: 'linear-gradient(135deg, #FFB4C8, #FF5A7D)',
  exchange: 'linear-gradient(135deg, #C8A6FF, #7B4DFF)',
  supply: 'linear-gradient(135deg, #6BB6FF, #FF6B6B)',
  checkin: 'linear-gradient(135deg, #FFC0D6, #FF6B9D)',
  swap: 'linear-gradient(135deg, #FF7A8A, #5A8CFF)',
  lottery: 'linear-gradient(135deg, #FFCCE5, #FF5A7D)',
  vote: 'linear-gradient(135deg, #FFD89C, #FF8C00)',
}
</script>

<template>
  <div
    :class="cn('relative inline-flex items-center justify-center', className)"
    :style="{
      width: size,
      height: size,
      background: GRADIENTS[name],
      borderRadius: size * 0.28,
      boxShadow:
        '0 6px 14px rgba(0,0,0,0.18), inset 0 2px 2px rgba(255,255,255,0.55), inset 0 -3px 4px rgba(0,0,0,0.12)',
    }"
  >
    <div
      class="pointer-events-none absolute inset-[3px]"
      :style="{
        borderRadius: size * 0.24,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 45%)',
      }"
    />
    <div class="relative">
      <svg v-if="name === 'compose'" width="28" height="28" viewBox="0 0 28 28">
        <polygon points="14,3 24,9 24,19 14,25 4,19 4,9" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <polygon points="14,3 24,9 14,14" fill="rgba(255,255,255,0.45)" stroke="none" />
        <polygon points="14,3 4,9 14,14" fill="rgba(255,255,255,0.25)" stroke="none" />
      </svg>

      <svg v-else-if="name === 'exchange'" width="26" height="26" viewBox="0 0 26 26">
        <rect x="3" y="9" width="20" height="14" rx="2" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <rect x="3" y="6" width="20" height="5" rx="1.5" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <rect x="11" y="6" width="4" height="17" fill="rgba(255,255,255,0.5)" stroke="none" />
        <path d="M13 6 C 13 3, 9 3, 9 6 M13 6 C 13 3, 17 3, 17 6" stroke="rgba(255,255,255,0.8)" stroke-width="1.4" fill="none" />
      </svg>

      <svg v-else-if="name === 'supply'" width="26" height="26" viewBox="0 0 26 26">
        <rect x="3" y="11" width="20" height="12" rx="2" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <path d="M5 11 C 5 5, 21 5, 21 11 Z" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <rect x="11" y="11" width="4" height="6" fill="#FFD700" stroke="rgba(0,0,0,0.2)" />
      </svg>

      <svg v-else-if="name === 'checkin'" width="26" height="26" viewBox="0 0 26 26">
        <rect x="3" y="5" width="20" height="18" rx="2" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <rect x="3" y="5" width="20" height="5" fill="rgba(255,255,255,0.55)" stroke="none" />
        <path d="M8 16 L 11 19 L 18 12" stroke="#FF5A7D" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <svg v-else-if="name === 'swap'" width="26" height="26" viewBox="0 0 26 26">
        <path d="M6 9 H 17 L 14 6 M 20 17 H 9 L 12 20" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 6 L 17 9 L 14 12" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 20 L 9 17 L 12 14" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <svg v-else-if="name === 'lottery'" width="26" height="26" viewBox="0 0 26 26">
        <circle cx="13" cy="11" r="7" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <ellipse cx="11" cy="8" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.7)" stroke="none" />
        <rect x="9" y="18" width="8" height="4" rx="1" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
      </svg>

      <svg v-else-if="name === 'vote'" width="26" height="26" viewBox="0 0 26 26">
        <rect x="4" y="10" width="18" height="14" rx="2" fill="#fff" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" />
        <rect x="11" y="4" width="4" height="8" rx="1" fill="white" stroke="rgba(0,0,0,0.1)" :transform="'rotate(20 13 8)'" />
        <path d="M9 16 L 12 19 L 17 13" stroke="#FF6B00" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>
