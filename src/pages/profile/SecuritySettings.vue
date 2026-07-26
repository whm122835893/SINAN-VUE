<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const router = useRouter()

const items = [
  { label: '设置操作密码', path: '/profile/operation-password' },
  { label: '修改登录密码', path: '/profile/change-password' },
  { label: '账号注销', path: '' },
]
</script>

<template>
  <PhoneFrame bg="bg-white">
    <TopBar title="安全设置" />

    <main class="flex-1 overflow-y-auto">
      <div
        v-for="(item, i) in items"
        :key="i"
        @click="item.path && router.push(item.path)"
        :class="[
          'flex h-14 items-center justify-between px-4',
          item.path ? 'cursor-pointer active:bg-surface-gray' : '',
          i < items.length - 1 ? 'border-b border-ink-divider' : '',
        ]"
      >
        <span class="text-base text-ink-primary">{{ item.label }}</span>
        <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
      </div>
    </main>
  </PhoneFrame>
</template>
