<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronRight, User } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const ICON_BG = 'bg-brand-pink/10'

const router = useRouter()
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="设置" />

    <main class="flex-1 overflow-y-auto py-3">
      <p class="mb-2 px-4 text-xs text-ink-tertiary">账号</p>
      <div class="mx-4 overflow-hidden rounded-2xl bg-white shadow-card">
        <div
          @click="router.push('/profile/info')"
          class="flex h-14 cursor-pointer items-center gap-3 px-4 active:bg-surface-gray"
        >
          <div :class="[ICON_BG, 'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg']">
            <User class="h-4 w-4 text-brand-pink" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm text-ink-primary">个人信息</p>
            <p class="text-xs text-ink-tertiary">头像、昵称、手机号等</p>
          </div>
          <ChevronRight
            class="h-4 w-4 flex-shrink-0 text-ink-divider"
            :stroke-width="2.5"
          />
        </div>
      </div>
    </main>
  </PhoneFrame>
</template>
