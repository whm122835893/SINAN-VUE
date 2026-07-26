<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home, ShoppingBag, Megaphone, Smile } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export type BottomTabKey = 'home' | 'market' | 'discover' | 'profile'

interface Props {
  active: BottomTabKey
  accent?: 'pink' | 'magenta' | 'orange'
  hasBadge?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'magenta',
  hasBadge: false,
})

const ACCENT_CLASS: Record<NonNullable<Props['accent']>, string> = {
  pink: 'text-brand-pink',
  magenta: 'text-brand-magenta',
  orange: 'text-brand-orange',
}

const TABS = [
  { key: 'home' as const, label: '首页', to: '/', Icon: Home },
  { key: 'market' as const, label: '市场', to: '/market', Icon: ShoppingBag },
  { key: 'discover' as const, label: '公告', to: '/discover', Icon: Megaphone },
  { key: 'profile' as const, label: '我的', to: '/profile', Icon: Smile },
]
</script>

<template>
  <nav class="bottom-nav-fixed flex items-stretch border-t border-ink-divider bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
    <RouterLink
      v-for="tab in TABS"
      :key="tab.key"
      :to="tab.to"
      class="relative flex flex-1 flex-col items-center justify-center gap-1"
    >
      <div class="relative">
        <component
          :is="tab.Icon"
          :class="cn('h-7 w-7', tab.key === active ? ACCENT_CLASS[accent] : 'text-ink-tertiary')"
          :stroke-width="tab.key === active ? 2.4 : 2"
        />
        <span
          v-if="tab.key === 'discover' && hasBadge"
          class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-fn-danger"
        />
      </div>
      <span
        :class="cn(
          'text-[10px] leading-none',
          tab.key === active ? ACCENT_CLASS[accent] + ' font-semibold' : 'text-ink-tertiary',
        )"
      >
        {{ tab.label }}
      </span>
    </RouterLink>
  </nav>
</template>
