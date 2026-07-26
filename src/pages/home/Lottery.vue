<script setup lang="ts">
import { ChevronRight, FileText } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { GashaponMachine, GiftBoxIllustration } from '@/components/icons/Illustrations.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}
</script>

<template>
  <PhoneFrame bg="bg-white">
    <PullRefresh :onRefresh="handleRefresh">
      <div
        class="relative overflow-hidden"
        style="
          background: linear-gradient(180deg, #1A0508 0%, #4A0A12 100%);
          height: 55vh;
          min-height: 460px;
        "
      >
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <span class="absolute left-6 top-20 text-2xl opacity-70 animate-float">🧧</span>
          <span
            class="absolute right-8 top-32 text-2xl opacity-60 animate-float"
            style="animation-delay: 0.6s"
          >
            🧧
          </span>
          <span class="absolute left-12 top-44 text-base opacity-50 animate-twinkle">✨</span>
          <span class="absolute right-16 top-16 text-sm opacity-80 animate-twinkle">✨</span>
          <span class="absolute left-1/2 top-44 text-base opacity-60 animate-twinkle">✨</span>
          <span class="absolute right-4 top-44 text-xl opacity-50 animate-float">🎀</span>
          <span
            class="absolute left-3 top-36 text-base opacity-60 animate-twinkle"
            style="animation-delay: 0.3s"
          >
            ✨
          </span>
        </div>

        <TopBar
          title="抽签活动"
          transparent
          white
          backBtnClass="bg-white shadow-sm"
          backIconClass="text-black"
        />

        <div class="relative flex flex-col items-center pt-2">
          <GashaponMachine />
          <h1
            class="mt-1 text-4xl font-black italic"
            style="
              background: linear-gradient(180deg, #FFCC33 0%, #FFB347 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Georgia, serif;
              text-shadow: 0 2px 6px rgba(0,0,0,0.5);
              filter: drop-shadow(0 1px 0 #E63946);
            "
          >
            幸运抽签
          </h1>
          <div class="mt-2 rounded-full bg-fn-danger/40 px-3 py-1 text-xs text-white backdrop-blur">
            ★ 好运等你来 ★
          </div>
        </div>
      </div>

      <div
        class="relative flex flex-col rounded-t-3xl bg-white"
        style="margin-top: -28px"
      >
        <div class="flex items-start justify-between p-5">
          <div>
            <h2 class="text-lg font-semibold" style="color: #5D4037">
              精选抽签活动
            </h2>
            <p class="mt-1 text-sm text-ink-tertiary">参与抽签，赢取惊喜好礼</p>
          </div>
          <button class="flex items-center gap-1 text-sm text-ink-tertiary">
            <FileText class="h-4 w-4" />
            活动规则
            <ChevronRight class="h-3 w-3" />
          </button>
        </div>

        <EmptyState title="暂无抽签活动" subtitle="更多精彩，敬请期待" class="py-10">
          <GiftBoxIllustration :size="120" tone="pink" :withFloatIcons="true" />
        </EmptyState>
      </div>
    </PullRefresh>
  </PhoneFrame>
</template>
