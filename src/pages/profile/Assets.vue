<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { AbstractBoxIllustration } from '@/components/icons/Illustrations.vue'

const COLLECTION_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop'

const mockCollection = {
  id: '1',
  name: '舞狮人',
  image: COLLECTION_IMAGE,
  count: 1,
  numbers: [
    { no: '#38724', days: 0, price: 0 },
  ],
}

const router = useRouter()
const tab = ref<'asset' | 'blind' | 'listing' | 'sold'>('asset')
const showModal = ref(false)

const tabs = [
  { key: 'asset' as const, label: '数字资产' },
  { key: 'blind' as const, label: '盲盒' },
  { key: 'listing' as const, label: '寄售中' },
  { key: 'sold' as const, label: '已售出' },
]

const handleNumberClick = (item: { no: string; days: number; price: number }) => {
  showModal.value = false
  router.push(`/assets/${mockCollection.id}?no=${item.no.replace('#', '')}`)
}
</script>

<template>
  <PhoneFrame bg="bg-white">
    <TopBar title="" @back="router.push('/profile')" />

    <div class="flex h-11 items-center justify-around border-b border-ink-divider px-2">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        @click="tab = t.key"
        class="relative h-full flex-1 text-center text-base"
      >
        <span :class="tab === t.key ? 'font-semibold text-ink-primary' : 'text-ink-tertiary'">
          {{ t.label }}
        </span>
        <span
          v-if="tab === t.key"
          class="absolute inset-x-0 mx-auto -bottom-px h-[3px] w-5 bg-brand-magenta"
        />
      </button>
    </div>

    <div class="flex h-12 items-center gap-3 px-4">
      <div class="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-gray px-3">
        <Search class="h-4 w-4 text-ink-tertiary" />
        <input
          type="text"
          placeholder="搜索藏品"
          class="flex-1 text-sm placeholder:text-ink-tertiary"
        />
      </div>
      <button type="button" class="flex items-center gap-1 text-sm text-brand-magenta">
        筛选了
        <SlidersHorizontal class="h-4 w-4" />
      </button>
    </div>

    <main v-if="tab === 'asset'" class="flex-1 overflow-y-auto">
      <div class="grid grid-cols-2 gap-3 px-4 pt-4">
        <button
          type="button"
          @click="showModal = true"
          class="overflow-hidden active:scale-[0.98]"
          style="border-radius: 8px; background-color: #F7F8FA"
        >
          <div class="relative w-full" style="aspect-ratio: 1/1">
            <img
              :src="mockCollection.image"
              :alt="mockCollection.name"
              class="w-full h-full object-cover"
              style="display: block; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px"
            />
          </div>
          <div
            class="flex items-center justify-between"
            style="padding: 12px 16px"
          >
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis"
              style="font-family: 'PingFang SC'; font-size: 16px; font-weight: 600; line-height: 22px; color: #1A1A1A; max-width: 180px"
            >
              {{ mockCollection.name }}
            </span>
            <div class="flex items-center flex-shrink-0">
              <span
                class="px-1 py-0.5 text-white whitespace-nowrap"
                style="background: #FF5A7D; border-radius: 4px 0 0 4px; border: 1px solid #FF5A7D; font-size: 12px; line-height: 17px"
              >
                数量
              </span>
              <span
                class="px-1 py-0.5 whitespace-nowrap"
                style="color: #FF5A7D; border: 1px solid #FF5A7D; border-left: none; border-radius: 0 4px 4px 0; font-size: 12px; line-height: 17px"
              >
                {{ mockCollection.count }}份
              </span>
            </div>
          </div>
        </button>
      </div>
    </main>

    <main v-else class="flex flex-1 items-center justify-center">
      <AbstractBoxIllustration :size="120" tone="pink" />
    </main>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-end bg-black/40">
        <div
          class="relative w-full rounded-t-3xl bg-white pb-6"
          style="height: 75%; animation: slideUp 0.3s ease"
        >
          <button
            type="button"
            @click="showModal = false"
            class="absolute right-4 top-4 z-10 text-ink-tertiary"
            aria-label="关闭"
          >
            <X class="h-6 w-6" />
          </button>

          <div class="px-4 pt-8">
            <div class="flex gap-3">
              <div class="-mt-20 flex-shrink-0">
                <img
                  :src="mockCollection.image"
                  :alt="mockCollection.name"
                  class="h-32 w-32 rounded-xl object-cover shadow-lg"
                />
              </div>
              <div class="flex-1 pt-0">
                <h3 class="text-xl font-bold text-ink-primary">{{ mockCollection.name }}</h3>
                <p class="mt-1 text-sm text-ink-tertiary">持有: {{ mockCollection.count }}个</p>
              </div>
            </div>

            <div class="mt-4 max-h-[calc(100%-120px)] overflow-y-auto">
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="item in mockCollection.numbers"
                  :key="item.no"
                  type="button"
                  @click="handleNumberClick(item)"
                  class="flex flex-col gap-1 rounded-xl bg-surface-gray p-3 text-left active:scale-95"
                >
                  <span class="text-base font-semibold text-ink-primary">{{ item.no }}</span>
                  <span class="text-xs text-ink-tertiary">持仓天数 {{ item.days }}</span>
                  <span class="text-xs text-ink-tertiary">购入价 {{ item.price }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </PhoneFrame>
</template>
