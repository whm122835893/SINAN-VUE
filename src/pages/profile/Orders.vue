<script setup lang="ts">
import { ref, computed, h, defineComponent } from 'vue'
import { Search, ChevronDown, Package } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const TopBarRight = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('div', { class: 'flex h-8 items-center gap-2 rounded-full bg-surface-gray px-3' }, [
          h(Search, { class: 'h-4 w-4 text-ink-tertiary' }),
          h('input', {
            type: 'text',
            placeholder: '搜索订单',
            class: 'w-28 text-sm placeholder:text-ink-tertiary',
          }),
        ]),
        h('button', { type: 'button', class: 'flex items-center gap-0.5 text-sm text-brand-magenta' }, [
          '筛选',
          h(ChevronDown, { class: 'h-3.5 w-3.5' }),
        ]),
      ])
  },
})

type OrderStatus = 'unpaid' | 'paid' | 'cancelled'

interface OrderItem {
  id: string
  title: string
  price: string
  status: OrderStatus
  date: string
  image: string
}

const mockOrders: OrderItem[] = [
  { id: '1', title: '司南·青铜神树数字藏品', price: '¥299.00', status: 'paid', date: '2025-07-01 14:32', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop' },
  { id: '2', title: '司南·金面罩藏品', price: '¥599.00', status: 'paid', date: '2025-06-28 09:15', image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=200&h=200&fit=crop' },
  { id: '3', title: '司南·玉琮王', price: '¥1280.00', status: 'cancelled', date: '2025-06-25 18:45', image: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?w=200&h=200&fit=crop' },
  { id: '4', title: '司南·青铜立人像', price: '¥888.00', status: 'paid', date: '2025-06-20 11:22', image: 'https://images.unsplash.com/photo-1608371945643-3751d5cf6924?w=200&h=200&fit=crop' },
  { id: '5', title: '司南·太阳神鸟', price: '¥399.00', status: 'unpaid', date: '2025-06-18 16:08', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=200&h=200&fit=crop' },
  { id: '6', title: '司南·青铜兽面具', price: '¥459.00', status: 'cancelled', date: '2025-06-15 10:30', image: 'https://images.unsplash.com/photo-1598257000225-35eea9640566?w=200&h=200&fit=crop' },
]

const tab = ref<'all' | 'unpaid' | 'paid' | 'cancelled'>('all')
const tabs = [
  { key: 'all' as const, label: '全部' },
  { key: 'unpaid' as const, label: '待支付' },
  { key: 'paid' as const, label: '已支付' },
  { key: 'cancelled' as const, label: '已取消' },
]

const filteredOrders = computed(() =>
  tab.value === 'all' ? mockOrders : mockOrders.filter((o) => o.status === tab.value)
)

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 'unpaid':
      return { background: '#FFF3E0', color: '#FF9500' }
    case 'paid':
      return { background: '#FFE0EC', color: '#E91E63' }
    case 'cancelled':
      return { background: '#EFEFEF', color: '#999999' }
  }
}

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case 'unpaid':
      return '待支付'
    case 'paid':
      return '已支付'
    case 'cancelled':
      return '已取消'
  }
}

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <PullRefresh :onRefresh="handleRefresh">
      <div class="bg-white border-b border-ink-divider">
        <TopBar
          title=""
          :right="TopBarRight"
        />
      </div>

      <div class="no-scrollbar flex h-11 items-center gap-2 overflow-x-auto border-b border-ink-divider bg-white px-4">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          @click="tab = t.key"
          class="rounded-4xl px-4 py-1.5 text-xs whitespace-nowrap transition-colors"
          :style="{
            background: tab === t.key ? '#E91E63' : '#F7F7F7',
            color: tab === t.key ? '#FFFFFF' : '#666666',
            borderRadius: '16px',
          }"
        >
          {{ t.label }}
        </button>
      </div>

      <main class="px-4 py-3">
        <div v-if="filteredOrders.length > 0" class="flex flex-col gap-3">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="flex gap-3 rounded-xl bg-white p-3 shadow-card"
          >
            <img
              :src="order.image"
              :alt="order.title"
              class="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
            />
            <div class="flex flex-1 flex-col justify-between py-0.5">
              <div>
                <p class="text-sm font-medium text-ink-primary">{{ order.title }}</p>
                <p class="mt-1 text-xs text-ink-tertiary">{{ order.date }}</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-brand-magenta">{{ order.price }}</span>
                <span
                  class="rounded px-2 py-0.5 text-[10px]"
                  :style="getStatusStyle(order.status)"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-1 flex-col items-center justify-center pt-20">
          <Package class="h-16 w-16 text-ink-divider" />
          <p class="mt-4 text-sm text-ink-tertiary">暂无相关订单</p>
        </div>
      </main>
    </PullRefresh>
  </PhoneFrame>
</template>
