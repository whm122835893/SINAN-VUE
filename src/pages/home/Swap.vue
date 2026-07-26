<script setup lang="ts">
import { Lightbulb } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Card from '@/components/ui/Card.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { GiftBoxIllustration } from '@/components/icons/Illustrations.vue'
</script>

<template>
  <PhoneFrame bg="bg-surface-warm-mist">
    <TopBar title="置换活动" />

    <main class="flex-1 overflow-y-auto px-4 pt-2">
      <section
        class="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl"
        style="background: linear-gradient(135deg, #FFD4B8, #FF9F5A)"
      >
        <span class="absolute left-6 top-4 h-3 w-3 rounded-full bg-white/60 animate-twinkle" />
        <span class="absolute right-8 top-8 h-4 w-4 rounded-full bg-white/40 animate-twinkle" style="animation-delay: 0.5s" />
        <span class="absolute left-10 bottom-6 h-2 w-2 rounded-full bg-white/70 animate-twinkle" />
        <span class="absolute right-4 bottom-4 h-5 w-5 rounded-full bg-white/30 blur-sm" />

        <svg width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="chestBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.7" />
              <stop offset="1" stop-color="#FF9F5A" stop-opacity="0.7" />
            </linearGradient>
          </defs>
          <path d="M30 50 L 70 25 L 110 50 L 70 60 Z" fill="rgba(255,255,255,0.6)" />
          <path d="M30 50 L 30 30 L 70 10 L 110 30 L 110 50" fill="none" stroke="rgba(255,255,255,0.4)" />
          <rect x="35" y="55" width="70" height="60" rx="6" fill="url(#chestBody)" />
          <rect x="65" y="55" width="10" height="60" fill="rgba(255,255,255,0.7)" />
          <circle cx="70" cy="40" r="14" fill="rgba(255,255,255,0.3)" />
          <circle cx="70" cy="40" r="6" fill="#FFD700" opacity="0.8" />
        </svg>
      </section>

      <EmptyState title="暂无可参与置换活动" subtitle="敬请期待更多精彩活动" class="mt-8">
        <GiftBoxIllustration :size="120" tone="orange" />
      </EmptyState>

      <Card padding="md" radius="md" shadow="card" class="mt-6">
        <div class="flex items-center gap-2">
          <Lightbulb class="h-4 w-4 text-brand-orange" fill="#FF6B35" />
          <h3 class="text-sm font-semibold text-brand-orange">小贴士</h3>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-ink-secondary">
          参与置换活动可用已有物品兑换新物品或奖励，不定期上线，记得常来看看哦！
        </p>
      </Card>
    </main>
  </PhoneFrame>
</template>
