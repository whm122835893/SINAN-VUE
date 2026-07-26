<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, LayoutGrid, List, ChevronDown, Heart, Check } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const marketCollections = [
  {
    id: '1',
    name: '秦匣有道',
    issue: 1000,
    circulation: 434,
    price: 288,
    category: '数字藏品',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: '秦匣时有违',
    issue: 66666,
    circulation: 66666,
    price: 5,
    category: '盲盒',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
  },
]

const categoryOptions = ['全部类别', '数字藏品', '盲盒', '艺术品']
const issueOptions = ['限量份数', '1000以下', '1000-10000', '10000以上']
const priceOptions = ['全部价格', '0-100', '100-500', '500以上']

const router = useRouter()
const tab = ref<'asset' | 'blind'>('asset')
const filter = ref<'all' | 'follow'>('all')
const favorites = ref<string[]>([])
const openDropdown = ref<'category' | 'issue' | 'price' | null>(null)
const category = ref('全部类别')
const issue = ref('限量份数')
const price = ref('全部价格')

const toggleFavorite = (id: string) => {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((f) => f !== id)
    : [...favorites.value, id]
}

const filteredCollections = computed(() => {
  return marketCollections.filter((item) => {
    if (category.value !== '全部类别' && item.category !== category.value) return false
    if (issue.value === '1000以下' && item.issue >= 1000) return false
    if (issue.value === '1000-10000' && (item.issue < 1000 || item.issue > 10000)) return false
    if (issue.value === '10000以上' && item.issue < 10000) return false
    if (price.value === '0-100' && (item.price < 0 || item.price > 100)) return false
    if (price.value === '100-500' && (item.price < 100 || item.price > 500)) return false
    if (price.value === '500以上' && item.price < 500) return false
    return true
  })
})

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}

const handleDropdownToggle = (type: 'category' | 'issue' | 'price') => {
  openDropdown.value = openDropdown.value === type ? null : type
}

const handleOptionSelect = (option: string) => {
  if (openDropdown.value === 'category') category.value = option
  else if (openDropdown.value === 'issue') issue.value = option
  else price.value = option
  openDropdown.value = null
}

const currentDropdownOptions = computed(() => {
  if (openDropdown.value === 'category') return categoryOptions
  if (openDropdown.value === 'issue') return issueOptions
  return priceOptions
})

const currentValue = computed(() => {
  if (openDropdown.value === 'category') return category.value
  if (openDropdown.value === 'issue') return issue.value
  return price.value
})

const handleCollectionClick = (id: string) => {
  router.push(`/market/${id}`)
}
</script>

<template>
  <PhoneFrame bg="bg-white" :with-bottom-nav="true">
    <PullRefresh :on-refresh="handleRefresh">
      <div class="flex h-11 items-center px-4 mt-3">
        <div class="flex h-9 w-full items-center gap-2 bg-surface-gray px-3" style="border-radius: 8px">
          <Search class="h-4 w-4 text-ink-tertiary" />
          <input
            type="text"
            placeholder="搜索数字资产、专辑、盲盒"
            class="flex-1 text-sm placeholder:text-ink-tertiary"
          />
        </div>
      </div>

      <div class="flex h-11 items-center justify-between border-b border-ink-divider px-4">
        <div class="flex items-center gap-5">
          <button
            type="button"
            @click="tab = 'asset'"
            class="relative text-base text-ink-primary"
          >
            <span :class="{ 'font-semibold text-ink-primary': tab === 'asset', 'text-ink-primary': tab !== 'asset' }">
              数字资产
            </span>
            <span
              v-if="tab === 'asset'"
              class="absolute inset-x-0 -bottom-2 mx-auto h-[3px] w-5 bg-brand-magenta"
            />
          </button>
          <button
            type="button"
            @click="tab = 'blind'"
            class="relative text-base text-ink-primary"
          >
            盲盒
            <span
              v-if="tab === 'blind'"
              class="absolute inset-x-0 -bottom-2 mx-auto h-[3px] w-5 bg-brand-magenta"
            />
          </button>
        </div>
        <LayoutGrid class="h-5 w-5 text-brand-magenta" />
      </div>

      <div class="flex h-11 items-center gap-2 px-4">
        <Search class="h-4 w-4 text-ink-primary" />
        <button
          type="button"
          @click="filter = 'follow'"
          class="rounded-4xl px-3 py-1 text-xs"
          :style="{
            background: filter === 'follow' ? '#FF9800' : '#F5F5F5',
            color: filter === 'follow' ? '#FFF' : '#999',
            borderRadius: '16px',
          }"
        >
          我的关注
        </button>
        <button
          type="button"
          @click="filter = 'all'"
          class="rounded-4xl px-3 py-1 text-xs"
          :style="{
            background: filter === 'all' ? '#FF9800' : '#F5F5F5',
            color: filter === 'all' ? '#FFF' : '#999',
            borderRadius: '16px',
          }"
        >
          全部
        </button>
        <div class="flex-1" />
        <List class="h-5 w-5 text-brand-magenta" />
      </div>

      <div class="relative flex h-10 items-center justify-around border-b border-ink-divider px-4 text-sm text-ink-secondary">
        <button
          type="button"
          @click="handleDropdownToggle('category')"
          class="flex items-center gap-1"
        >
          {{ category }}
          <ChevronDown
            class="h-3 w-3 transition-transform"
            :class="{ 'rotate-180': openDropdown === 'category' }"
          />
        </button>
        <button
          type="button"
          @click="handleDropdownToggle('issue')"
          class="flex items-center gap-1"
        >
          {{ issue }}
          <ChevronDown
            class="h-3 w-3 transition-transform"
            :class="{ 'rotate-180': openDropdown === 'issue' }"
          />
        </button>
        <button
          type="button"
          @click="handleDropdownToggle('price')"
          class="flex items-center gap-1"
        >
          {{ price }}
          <ChevronDown
            class="h-3 w-3 transition-transform"
            :class="{ 'rotate-180': openDropdown === 'price' }"
          />
        </button>

        <div
          v-if="openDropdown"
          class="absolute left-0 right-0 top-full z-20 bg-white shadow-lg"
          style="border-bottom-left-radius: 8px; border-bottom-right-radius: 8px"
        >
          <button
            v-for="option in currentDropdownOptions"
            :key="option"
            type="button"
            @click="handleOptionSelect(option)"
            class="flex w-full items-center justify-between px-4 py-2.5 text-sm"
            :style="{
              color: currentValue === option ? '#FF5A7D' : '#1A1A1A',
              backgroundColor: currentValue === option ? '#FFF0F0' : 'transparent',
            }"
          >
            {{ option }}
            <Check v-if="currentValue === option" class="h-4 w-4" />
          </button>
        </div>
      </div>

      <main>
        <div class="flex h-9 items-center px-4 text-xs text-ink-tertiary">
          <span class="text-left">藏品名称</span>
          <span class="ml-1 text-left">|</span>
          <span class="ml-1 text-left">发行流通</span>
          <span class="ml-auto text-right">地板价</span>
          <span class="ml-6 text-right">成交量</span>
        </div>

        <div class="grid grid-cols-2 gap-3 px-4 py-2">
          <button
            v-for="item in filteredCollections"
            :key="item.id"
            type="button"
            class="overflow-hidden text-left active:scale-[0.98]"
            style="border-radius: 12px; background-color: #fff"
            @click="handleCollectionClick(item.id)"
          >
            <div class="relative w-full" style="aspect-ratio: 1/1">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover"
                style="display: block"
              />
              <button
                type="button"
                @click.stop="toggleFavorite(item.id)"
                class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center"
                style="border-radius: 50%; background-color: rgba(0,0,0,0.4)"
              >
                <Heart
                  class="h-4 w-4"
                  :fill="favorites.includes(item.id) ? '#FF5A7D' : 'none'"
                  :color="favorites.includes(item.id) ? '#FF5A7D' : '#fff'"
                />
              </button>
            </div>
            <div class="p-3">
              <div
                class="whitespace-nowrap overflow-hidden text-ellipsis"
                style="font-family: PingFang SC; font-size: 15px; font-weight: 600; line-height: 21px; color: #1A1A1A"
              >
                {{ item.name }}
              </div>
              <div
                class="mt-1"
                style="font-family: PingFang SC; font-size: 12px; font-weight: 400; line-height: 17px; color: #8C8C8C"
              >
                发行{{ item.issue }} 流通{{ item.circulation }}
              </div>
              <div
                class="mt-2"
                style="font-family: PingFang SC; font-size: 17px; font-weight: 600; line-height: 24px; color: #1A1A1A"
              >
                ¥ {{ item.price }}
              </div>
            </div>
          </button>
          <div
            v-if="filteredCollections.length === 0"
            class="col-span-2 py-16 text-center text-sm text-ink-tertiary"
          >
            暂无符合条件的藏品
          </div>
        </div>
      </main>
    </PullRefresh>

    <BottomNav active="market" accent="magenta" />
  </PhoneFrame>
</template>
