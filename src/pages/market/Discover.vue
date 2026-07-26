<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, RefreshCw, Heart } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const ANNOUNCES = [
  {
    id: '1',
    title: '【司南博物运营公告】关于司南博物平台数字资产迁移说明…',
    tag: '运营公告',
    time: '2026/07/04 10:26:29',
  },
  {
    id: '2',
    title: '【司南博物运营公告】司南博物·焕新升级进展',
    tag: '运营公告',
    time: '2026/07/01 12:30:09',
  },
]

const router = useRouter()
const mainTab = ref<'platform' | 'news' | 'rumor'>('platform')
const subTab = ref<'all' | 'follow' | 'listing' | 'new'>('all')

const subTabs = [
  { key: 'all' as const, label: '全部' },
  { key: 'follow' as const, label: '我的关注' },
  { key: 'listing' as const, label: '寄售公告' },
  { key: 'new' as const, label: '上新公告' },
]

const mainTabs = [
  { key: 'platform' as const, label: '平台公告' },
  { key: 'news' as const, label: '新闻发布' },
  { key: 'rumor' as const, label: '辟谣墙' },
]

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}

const handleAnnounceClick = (id: string) => {
  router.push(`/discover/${id}`)
}
</script>

<template>
  <PhoneFrame bg="bg-white" :with-bottom-nav="true">
    <PullRefresh :on-refresh="handleRefresh">
      <header class="flex h-12 items-center justify-between px-4">
        <span class="w-9" />
        <h1 class="text-lg font-semibold text-ink-primary">发现</h1>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-gray"
          aria-label="刷新"
        >
          <RefreshCw class="h-4 w-4 text-ink-tertiary" />
        </button>
      </header>

      <div class="flex h-11 items-center gap-6 border-b border-ink-divider px-4">
        <button
          v-for="tab in mainTabs"
          :key="tab.key"
          type="button"
          @click="mainTab = tab.key"
          class="relative text-base"
        >
          <span
            :class="mainTab === tab.key ? 'font-semibold text-ink-primary' : 'text-ink-tertiary'"
          >
            {{ tab.label }}
          </span>
          <span
            v-if="mainTab === tab.key"
            class="absolute inset-x-0 -bottom-2 mx-auto h-[3px] w-6 bg-brand-magenta"
          />
        </button>
      </div>

      <div class="flex h-11 items-center gap-2 px-4">
        <Search class="h-4 w-4 text-ink-primary" />
        <div class="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto">
          <button
            v-for="tab in subTabs"
            :key="tab.key"
            type="button"
            @click="subTab = tab.key"
            class="rounded-4xl px-3.5 py-1.5 text-xs whitespace-nowrap"
            :style="{
              background: subTab === tab.key ? '#FF9800' : '#F5F5F5',
              color: subTab === tab.key ? '#FFFFFF' : '#666666',
              borderRadius: '16px',
            }"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <main class="px-4 pt-3 pb-4">
        <div class="space-y-3">
          <button
            v-for="a in ANNOUNCES"
            :key="a.id"
            type="button"
            @click="handleAnnounceClick(a.id)"
            class="flex w-full items-stretch gap-3 rounded-xl bg-white p-3 shadow-card"
          >
            <div class="flex flex-1 flex-col justify-between">
              <h3 class="line-clamp-2 text-sm font-semibold leading-snug text-ink-primary">
                {{ a.title }}
              </h3>
              <div class="mt-2 flex items-center gap-2">
                <span
                  class="rounded px-1.5 py-0.5 text-[10px]"
                  style="color: #E91E63; background: #FFE0EC; border-radius: 4px"
                >
                  {{ a.tag }}
                </span>
                <span class="text-xs text-ink-tertiary">{{ a.time }}</span>
              </div>
            </div>
            <div class="relative w-28 flex-shrink-0 overflow-hidden rounded-lg">
              <div
                class="flex h-full flex-col items-center justify-center p-2"
                style="background: linear-gradient(135deg, #0E1A2E 0%, #1E3A5F 60%, #0E1A2E 100%)"
              >
                <span class="text-xs font-bold text-white">运营公告</span>
                <span class="mt-1 text-[10px] text-white/70">司南博物</span>
              </div>
              <button
                type="button"
                class="absolute bottom-1 right-1 flex items-center gap-0.5 rounded-full bg-white/70 px-1.5 py-0.5"
              >
                <Heart class="h-2.5 w-2.5 text-ink-tertiary" fill="#999" />
                <span class="text-[10px] text-ink-tertiary">关注</span>
              </button>
            </div>
          </button>
        </div>
      </main>
    </PullRefresh>

    <BottomNav active="discover" accent="magenta" :has-badge="true" />
  </PhoneFrame>
</template>
