<script setup lang="ts">
import { Clock, Gift, Shield, Lightbulb } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Card from '@/components/ui/Card.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { TreasureBoxIllustration } from '@/components/icons/Illustrations.vue'

const tips = [
  { Icon: Clock, t1: '每日补给0点刷新', t2: '记得即时领取哦' },
  { Icon: Gift, t1: '精选礼包超值兑换', t2: '祝你快速成长' },
  { Icon: Shield, t1: '合理使用补给资源', t2: '让每一步都更有价值' },
]
</script>

<template>
  <PhoneFrame bg="bg-surface-warm-pink">
    <TopBar title="补给站" />

    <main class="flex-1 overflow-y-auto px-4 pt-2">
      <section
        class="relative flex h-60 flex-col justify-between overflow-hidden rounded-2xl p-5"
        style="background: linear-gradient(135deg, #FFC9A8 0%, #FF6B35 60%, #FF4D4F 100%)"
      >
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute bottom-2 left-2 text-5xl opacity-90">🎈</div>
          <div class="absolute bottom-4 right-4 text-4xl opacity-90">🎁</div>
          <div class="absolute right-2 top-12 text-3xl opacity-80">🏢</div>
          <div class="absolute left-12 top-2 text-2xl opacity-70">✨</div>
          <div class="absolute right-12 top-2 text-2xl opacity-70 animate-twinkle">✨</div>
        </div>

        <div class="relative">
          <h1
            class="text-3xl font-black italic"
            style="
              background: linear-gradient(180deg, #FF6B35, #FF4D4F);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Georgia, serif;
              text-shadow: 0 2px 8px rgba(255,255,255,0.5);
              filter: drop-shadow(0 1px 0 #FFFFFF);
            "
          >
            补给站
          </h1>
          <p class="mt-1 text-base text-ink-secondary">补给资源·助力成长</p>
          <p class="mt-2 text-xs leading-relaxed text-ink-tertiary">
            每日精选好礼，补给能量加满
            <br />
            为你带来更多惊喜与收获
          </p>
        </div>

        <button
          type="button"
          class="relative mt-4 inline-flex w-fit items-center gap-1 rounded-capsule px-5 py-2 text-sm font-bold text-white active:scale-95"
          style="
            background: linear-gradient(90deg, #FF6B35, #FF4D4F);
            box-shadow: 0 4px 12px rgba(255,77,79,0.4);
          "
        >
          获取补给 →
        </button>
      </section>

      <div class="mt-5 flex items-center justify-center gap-3">
        <span class="border-t border-dashed border-ink-tertiary/60 flex-1" />
        <span class="h-1.5 w-1.5 rounded-full bg-ink-tertiary/60" />
        <span class="h-1.5 w-1.5 rounded-full bg-ink-tertiary/60" />
        <span class="text-base font-semibold text-ink-primary">补给礼包</span>
        <span class="h-1.5 w-1.5 rounded-full bg-ink-tertiary/60" />
        <span class="h-1.5 w-1.5 rounded-full bg-ink-tertiary/60" />
        <span class="border-t border-dashed border-ink-tertiary/60 flex-1" />
      </div>

      <EmptyState title="暂无更多补给" subtitle="更多补给正在路上，敬请期待~" class="mt-6">
        <TreasureBoxIllustration :size="120" />
      </EmptyState>

      <Card padding="md" radius="md" shadow="card" class="mt-6">
        <div
          class="-mx-4 -mt-4 mb-3 flex items-center gap-2 rounded-t-xl px-4 py-2"
          style="background: linear-gradient(90deg, #6B4E3D, #A67B5B)"
        >
          <Lightbulb class="h-4 w-4 text-white" fill="#FFD700" />
          <h3 class="text-base font-semibold text-white">小贴士</h3>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="(tip, i) in tips"
            :key="i"
            class="flex flex-col items-center gap-1 text-center"
          >
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10">
              <component :is="tip.Icon" class="h-4 w-4 text-brand-orange" />
            </div>
            <p class="text-xs font-medium text-ink-primary leading-tight">{{ tip.t1 }}</p>
            <p class="text-[10px] text-ink-tertiary leading-tight">{{ tip.t2 }}</p>
          </div>
        </div>
      </Card>
    </main>
  </PhoneFrame>
</template>
