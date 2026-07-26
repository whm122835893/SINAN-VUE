<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Heart, Lock, ChevronDown } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'

const marketCollections = [
  {
    id: '1',
    name: '秦匣有道',
    issue: 1000,
    circulation: 434,
    price: 288,
    category: '数字藏品',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&h=800&fit=crop',
  },
  {
    id: '2',
    name: '秦匣时有违',
    issue: 66666,
    circulation: 66666,
    price: 5,
    category: '盲盒',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop',
  },
]

const generateOrderList = (collection: typeof marketCollections[0]) => {
  const count = Math.min(Math.floor(Math.random() * 5) + 3, 8)
  return Array.from({ length: count }, (_, i) => ({
    id: `${collection.id}-${i + 1}`,
    name: collection.name,
    issue: collection.issue,
    circulation: collection.circulation,
    price: collection.price + Math.floor(Math.random() * 20) - 10,
    no: String(Math.floor(Math.random() * 900000) + 100000),
  })).sort((a, b) => a.price - b.price)
}

const route = useRoute()
const router = useRouter()
const tab = ref<'orders' | 'announcement' | 'trend'>('orders')
const subTab = ref<'sell' | 'buy' | 'entrust'>('sell')
const favorite = ref(false)

const mainTabs = [
  { key: 'orders' as const, label: '挂单列表' },
  { key: 'announcement' as const, label: '相关公告' },
  { key: 'trend' as const, label: '成交趋势' },
]

const subTabs = [
  { key: 'sell' as const, label: '寄售', locked: false },
  { key: 'buy' as const, label: '求购', locked: true },
  { key: 'entrust' as const, label: '委托', locked: true },
]

const collection = computed(() => marketCollections.find((c) => c.id === route.params.id) || marketCollections[0])
const orderList = computed(() => generateOrderList(collection.value))

const handleBack = () => {
  router.back()
}

const handleOrderClick = (itemId: string) => {
  router.push(`/market/${collection.value.id}/order/${itemId}`)
}
</script>

<template>
  <PhoneFrame bg="bg-white">
    <div
      class="absolute left-0 right-0 top-0"
      style="height: 220px"
      :style="{
        backgroundImage: `url(${collection.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
        transform: 'scale(1.15)',
      }"
    />
    <div class="relative z-20 flex h-12 items-center justify-between px-4 pt-2">
      <button
        type="button"
        @click="handleBack"
        class="flex h-9 w-9 items-center justify-center"
        style="border-radius: 8px; background-color: #FFFFFF"
      >
        <ChevronLeft class="h-5 w-5" style="color: #FF5A7D" />
      </button>
      <button
        type="button"
        @click="favorite = !favorite"
        class="flex h-9 w-9 items-center justify-center"
        style="border-radius: 8px; background-color: #FFFFFF"
      >
        <Heart
          class="h-5 w-5"
          :fill="favorite ? '#FF5A7D' : 'none'"
          color="#FF5A7D"
        />
      </button>
    </div>

    <main class="relative z-10 flex-1 overflow-y-auto" style="padding-bottom: 80px">
      <div class="flex justify-center px-4 pb-5 pt-16">
        <div
          class="relative overflow-hidden"
          style="width: 140px; height: 140px; border-radius: 16px; padding: 5px; background: rgba(255,255,255,0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 8px 32px rgba(0,0,0,0.2)"
        >
          <img
            :src="collection.image"
            :alt="collection.name"
            class="h-full w-full object-cover"
            style="border-radius: 12px"
          />
        </div>
      </div>

      <div class="w-full bg-white" style="padding-top: 20px">
        <div class="px-4 pb-4 pt-2 text-center">
          <h1
            style="font-family: PingFang SC; font-size: 28px; font-weight: 700; line-height: 38px; color: #1A1A1A"
          >
            {{ collection.name }}
          </h1>
          <div class="mt-2 flex items-center justify-center gap-6 text-sm text-ink-tertiary">
            <span>
              发行
              <span class="font-semibold text-ink-primary">
                {{ collection.issue }}
              </span>
            </span>
            <span>
              流通
              <span class="font-semibold text-ink-primary">
                {{ collection.circulation }}
              </span>
            </span>
          </div>
        </div>

        <div class="flex border-b border-ink-divider px-4">
          <button
            v-for="item in mainTabs"
            :key="item.key"
            type="button"
            @click="tab = item.key"
            class="relative mr-8 pb-3 pt-4"
          >
            <span
              :style="{
                fontFamily: 'PingFang SC',
                fontSize: '17px',
                fontWeight: tab === item.key ? 600 : 400,
                lineHeight: '24px',
                color: tab === item.key ? '#1A1A1A' : '#8C8C8C',
              }"
            >
              {{ item.label }}
            </span>
            <span
              v-if="tab === item.key"
              class="absolute bottom-0 left-1/2 -translate-x-1/2"
              style="width: 24px; height: 3px; border-radius: 2px; background-color: #FFB800"
            />
          </button>
        </div>

        <div v-if="tab === 'orders'" class="flex gap-3 px-4 pb-3 pt-4">
          <button
            v-for="item in subTabs"
            :key="item.key"
            type="button"
            @click="!item.locked && (subTab = item.key)"
            class="flex items-center gap-1 px-4 py-1.5"
            :style="{
              borderRadius: '16px',
              backgroundColor: subTab === item.key ? '#F5F5F5' : 'transparent',
            }"
          >
            <span
              :style="{
                fontFamily: 'PingFang SC',
                fontSize: '15px',
                fontWeight: subTab === item.key ? 600 : 400,
                lineHeight: '21px',
                color: subTab === item.key ? '#1A1A1A' : item.locked ? '#BFBFBF' : '#8C8C8C',
              }"
            >
              {{ item.label }}
            </span>
            <Lock v-if="item.locked" class="h-3 w-3" style="color: #BFBFBF" />
          </button>
        </div>

        <template v-if="tab === 'orders' && subTab === 'sell'">
          <div class="flex items-center px-4 py-2 text-xs text-ink-tertiary">
            <span class="text-left">藏品</span>
            <span class="ml-auto flex items-center gap-0.5 text-right">
              价格
              <ChevronDown class="h-3 w-3" />
            </span>
          </div>

          <div class="px-4 pb-4">
            <div
              v-for="item in orderList"
              :key="item.id"
              class="flex items-center py-3 cursor-pointer"
              style="border-bottom: 1px solid #F5F5F5"
              @click="handleOrderClick(item.id)"
            >
              <div
                class="h-12 w-12 flex-shrink-0 overflow-hidden"
                style="border-radius: 8px"
              >
                <img
                  :src="collection.image"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="ml-3 flex-1 min-w-0">
                <div
                  class="whitespace-nowrap overflow-hidden text-ellipsis"
                  style="font-family: PingFang SC; font-size: 15px; font-weight: 600; line-height: 21px; color: #1A1A1A"
                >
                  {{ item.name }}
                </div>
                <div
                  class="mt-0.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis"
                  style="color: #8C8C8C"
                >
                  编号 #{{ item.no }}
                </div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <div
                  style="font-family: PingFang SC; font-size: 17px; font-weight: 600; line-height: 24px; color: #FF5A7D"
                >
                  ¥{{ item.price }}
                </div>
                <button
                  type="button"
                  class="px-3 py-0.5 text-xs font-medium text-white"
                  style="border-radius: 12px; background-color: #FF5A7D"
                >
                  购买
                </button>
              </div>
            </div>
          </div>
        </template>

        <div v-if="tab !== 'orders'" class="py-20 text-center text-sm text-ink-tertiary">
          暂无数据
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4 pt-3 bg-white z-50"
      style="max-width: 420px; box-shadow: 0 -2px 10px rgba(0,0,0,0.06)"
    >
      <button
        type="button"
        class="h-12 w-full text-base font-semibold text-white active:scale-[0.98]"
        style="border-radius: 8px; background-color: #FF5A7D"
      >
        快捷购买
      </button>
    </div>
  </PhoneFrame>
</template>
