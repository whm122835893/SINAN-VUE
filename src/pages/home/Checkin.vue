<script setup lang="ts">
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import Card from '@/components/ui/Card.vue'

const days = ['0', '0', '3']
</script>

<template>
  <PhoneFrame bg="bg-surface-warm-white">
    <TopBar title="签到活动" />

    <main class="flex-1 overflow-y-auto px-4 pt-4">
      <Card padding="lg" radius="xl" shadow="card-lg" class="flex flex-col items-center">
        <p class="text-sm text-ink-tertiary">已连续签到</p>

        <div class="mt-3 flex items-end gap-2">
          <div
            v-for="(d, i) in days"
            :key="i"
            class="flex h-14 w-12 items-center justify-center rounded-lg border border-ink-divider bg-white text-3xl font-bold text-brand-orange animate-flip-down"
            style="box-shadow: 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"
            :style="{ animationDelay: `${i * 0.15}s` }"
          >
            {{ d }}
          </div>
          <span class="ml-1 text-xl font-medium text-ink-primary">天</span>
        </div>

        <button
          type="button"
          class="mt-6 inline-flex w-full items-center justify-center rounded-capsule py-3 text-base font-semibold text-white active:scale-95"
          style="
            background: linear-gradient(90deg, #FF8C00, #FF6B00);
            box-shadow: 0 6px 16px rgba(255,107,0,0.25);
            padding: 0.75rem 1rem;
          "
        >
          <span
            class="flex h-12 w-full items-center justify-center rounded-capsule"
            style="border: 1px dashed #FF6B00"
          >
            立即签到
          </span>
        </button>
      </Card>

      <Card padding="md" radius="xl" shadow="card-lg" class="mt-4">
        <h3 class="text-base font-semibold text-ink-primary">活动说明</h3>
        <div class="mt-3 border-t border-ink-divider" />
        <div class="mt-3 space-y-2 text-sm leading-relaxed text-ink-secondary">
          <p>1. 每日 0:00 后可参与签到，连续签到可获得丰厚奖励。</p>
          <p>2. 签到奖励将在签到成功后实时发放至账户。</p>
          <p>3. 中途断签将重新计算连续天数，请坚持每日签到。</p>
          <p>4. 司南博物 平台保留活动最终解释权。</p>
        </div>
      </Card>
    </main>
  </PhoneFrame>
</template>
