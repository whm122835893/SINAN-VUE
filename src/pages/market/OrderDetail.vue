<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Heart, Share2, ChevronDown } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'

const generateChainAddress = (seed: string) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  const seedHex = Math.abs(hash).toString(16)
  const randomHex = (n: number) => {
    const chars = '0123456789abcdef'
    let result = ''
    let h = Math.abs(hash) + n * 31
    for (let i = 0; i < n; i++) {
      h = (h * 9301 + 49297) % 233280
      result += chars[Math.floor((h / 233280) * 16)]
    }
    return result
  }
  let hex = seedHex
  while (hex.length < 40) {
    const need = 40 - hex.length
    hex += randomHex(Math.min(need, 8))
  }
  return `0x${hex.slice(0, 40)}`
}

const formatChainAddress = (address: string) => {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

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
const favorite = ref(false)

const collection = computed(() => marketCollections.find((c) => c.id === route.params.id) || marketCollections[0])
const orderList = computed(() => generateOrderList(collection.value))
const order = computed(() => orderList.value.find((o) => o.id === route.params.orderId) || orderList.value[0])
const chainAddress = computed(() => formatChainAddress(generateChainAddress(collection.value.id + order.value.no)))

const handleBack = () => {
  router.back()
}
</script>

<template>
  <PhoneFrame bg="bg-white">
    <div
      class="absolute left-0 right-0 top-0"
      style="height: 400px"
      :style="{
        backgroundImage: `url(${collection.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
        transform: 'scale(1.1)',
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

    <main class="relative z-10 flex-1 overflow-y-auto" style="padding-bottom: 100px">
      <div class="flex justify-center px-4 pb-4 pt-8">
        <div
          class="relative overflow-hidden"
          style="width: 320px; height: 320px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.15)"
        >
          <img
            :src="collection.image"
            :alt="collection.name"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-2"
            style="border-radius: 20px; background-color: rgba(255,255,255,0.9); backdrop-filter: blur(10px)"
          >
            <span
              style="font-family: PingFang SC; font-size: 20px; font-weight: 700; color: #FF5A7D"
            >
              ¥{{ order.price }}
            </span>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4">
        <div class="flex items-center gap-2">
          <h1
            style="font-family: PingFang SC; font-size: 24px; font-weight: 700; line-height: 32px; color: #1A1A1A"
          >
            {{ collection.name }}#{{ order.no }}
          </h1>
        </div>
        <div class="mt-2">
          <span style="font-family: PingFang SC; font-size: 14px; color: #8C8C8C">链上标识：</span>
          <span style="font-family: monospace; font-size: 14px; color: #8C8C8C">{{ chainAddress }}</span>
        </div>

        <div class="mt-3 flex gap-3">
          <div class="flex items-center">
            <span
              class="px-2 py-1 text-xs font-semibold text-white"
              style="border-radius: 4px 0 0 4px; background-color: #FF5A7D; border: 1px solid #FF5A7D"
            >
              限量
            </span>
            <span
              class="px-3 py-1 text-xs font-medium"
              style="border-radius: 0 4px 4px 0; background-color: #FFFFFF; color: #FF5A7D; border: 1px solid #FF5A7D; border-left: none"
            >
              {{ collection.issue }}份
            </span>
          </div>
          <div class="flex items-center">
            <span
              class="px-2 py-1 text-xs font-semibold text-white"
              style="border-radius: 4px 0 0 4px; background-color: #FF5A7D; border: 1px solid #FF5A7D"
            >
              流通
            </span>
            <span
              class="px-3 py-1 text-xs font-medium"
              style="border-radius: 0 4px 4px 0; background-color: #FFFFFF; color: #FF5A7D; border: 1px solid #FF5A7D; border-left: none"
            >
              {{ collection.circulation }}份
            </span>
          </div>
        </div>
      </div>

      <div class="mx-4 mb-4 flex gap-3">
        <div
          class="flex flex-col flex-1 p-4"
          style="border-radius: 16px; background-color: #F5F5F5"
        >
          <div
            style="font-family: PingFang SC; font-size: 18px; font-weight: 600; line-height: 25px; color: #1A1A1A; margin-bottom: 12px"
          >
            品牌方
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 overflow-hidden flex-shrink-0"
              style="border-radius: 50%"
            >
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=40&h=40&fit=crop"
                alt="品牌方"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              style="font-family: PingFang SC; font-size: 18px; font-weight: 300; line-height: 25px; color: #1A1A1A"
            >
              秦匣文创
            </div>
          </div>
        </div>

        <div
          class="flex flex-col flex-1 p-4"
          style="border-radius: 16px; background-color: #F5F5F5"
        >
          <div
            style="font-family: PingFang SC; font-size: 18px; font-weight: 600; line-height: 25px; color: #1A1A1A; margin-bottom: 12px"
          >
            创作者
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 overflow-hidden flex-shrink-0"
              style="border-radius: 50%"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                alt="创作者"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              style="font-family: PingFang SC; font-size: 18px; font-weight: 300; line-height: 25px; color: #1A1A1A"
            >
              秦匣团队
            </div>
          </div>
        </div>
      </div>

      <div class="mx-4 mb-4">
        <div
          class="flex items-center justify-between p-3"
          style="border-radius: 16px; background-color: #F5F5F5"
        >
          <span class="text-sm text-ink-tertiary">所属专辑</span>
          <ChevronDown class="h-4 w-4 text-ink-tertiary" />
        </div>
      </div>

      <div class="mx-4 mb-4">
        <div class="flex items-center gap-2">
          <span
            class="h-4 w-0.5"
            style="background-color: #FF5A7D"
          />
          <h2
            style="font-family: PingFang SC; font-size: 16px; font-weight: 600; color: #1A1A1A"
          >
            藏品故事
          </h2>
        </div>
        <div
          class="mt-3 px-4 py-3 text-sm leading-relaxed"
          style="border-radius: 12px; background-color: #F5F5F5; color: #666; min-height: 120px"
        >
        </div>
      </div>

      <div class="mx-4 mb-4">
        <div class="flex items-center gap-2">
          <span
            class="h-4 w-0.5"
            style="background-color: #FF5A7D"
          />
          <h2
            style="font-family: PingFang SC; font-size: 16px; font-weight: 600; color: #1A1A1A"
          >
            购买须知
          </h2>
        </div>
        <div
          class="mt-3 px-4 py-3 text-sm leading-relaxed"
          style="border-radius: 12px; background-color: #F5F5F5; color: #666"
        >
          数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满18周岁，并小于60周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4 pt-3 bg-white z-50"
      style="max-width: 420px; box-shadow: 0 -2px 10px rgba(0,0,0,0.06)"
    >
      <div class="flex items-center gap-4">
        <div>
          <div class="text-xs text-ink-tertiary">当前价格</div>
          <div
            style="font-family: PingFang SC; font-size: 24px; font-weight: 700; color: #FF5A7D"
          >
            ¥{{ order.price }}
          </div>
        </div>
        <button
          type="button"
          class="flex-1 h-12 text-base font-semibold text-white active:scale-[0.98]"
          style="border-radius: 8px; background-color: #FF5A7D"
        >
          立即购买
        </button>
      </div>
    </div>
  </PhoneFrame>
</template>
