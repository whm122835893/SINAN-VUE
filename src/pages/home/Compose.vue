<script setup lang="ts">
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { GiftBoxIllustration } from '@/components/icons/Illustrations.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}
</script>

<template>
  <PhoneFrame bg="bg-surface-warm-white" className="!bg-[#FFF8F5]">
    <PullRefresh :onRefresh="handleRefresh">
      <TopBar title="合成活动" />

      <main class="px-4 pt-2">
        <section
          class="relative flex h-44 flex-col justify-center overflow-hidden rounded-2xl"
          style="
            background-image: url(https://images.unsplash.com/photo-1558021262-23073752cc42?w=400&h=200&fit=crop);
            background-size: cover;
            background-position: center;
          "
        >
          <div class="absolute inset-0" style="background-color: rgba(255,107,107,0.3)" />
          <div class="absolute right-4 top-4 h-12 w-12 rounded-full bg-white/30 blur-md" />
          <div class="absolute right-16 top-12 h-8 w-8 rounded-full bg-white/40 blur-sm" />
          <div class="absolute right-8 bottom-6 h-16 w-16 rounded-full bg-white/20 blur-lg" />
        </section>

        <div class="mt-5 flex items-center justify-center gap-2">
          <span class="h-px w-10 bg-ink-tertiary/40" />
          <span class="h-1 w-1 rounded-full bg-ink-tertiary/60" />
          <span class="text-base text-ink-secondary">请选择活动方式</span>
          <span class="h-1 w-1 rounded-full bg-ink-tertiary/60" />
          <span class="h-px w-10 bg-ink-tertiary/40" />
        </div>

        <EmptyState title="暂无可参与合成活动" subtitle="敬请期待更多精彩活动" class="mt-8">
          <GiftBoxIllustration :size="140" tone="warm" :withFloatIcons="true" />
        </EmptyState>
      </main>
    </PullRefresh>
  </PhoneFrame>
</template>
