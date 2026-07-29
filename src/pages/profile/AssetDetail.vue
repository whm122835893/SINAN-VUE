<script setup lang="ts">
import { ref, computed, h, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Heart, ChevronDown, ChevronUp } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import ConsignDialog from '@/components/ui/ConsignDialog.vue'

const FavoriteBtn = defineComponent({
  setup() {
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: 'flex h-8 w-8 items-center justify-center',
          style: 'border-radius: 8px; background-color: #FFFFFF',
          'aria-label': '收藏',
        },
        [h(Heart, { class: 'h-4 w-4', style: 'color: #FF5A7D' })]
      )
  },
})

const COLLECTION_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop'

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

const route = useRoute()
const id = route.params.id as string
const no = (route.query.no as string) || '38724'
const introOpen = ref(true)
const noticeOpen = ref(true)

const collection = computed(() => ({
  id,
  name: '舞狮人',
  image: COLLECTION_IMAGE,
  price: 0,
  no: `#${no}`,
  serialNo: '27638',
  brand: '司南文创',
  creator: '司南文创',
  brandAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=40&h=40&fit=crop',
  creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
  intro: '本作品以中国传统舞狮文化为创作灵感，融合现代数字艺术表现手法，展现了舞狮的灵动与祥瑞之气。每一件数字藏品都具有唯一标识，不可篡改、不可复制，是您收藏传统文化数字资产的珍贵选择。',
  notice: '数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满18周岁，并小于60周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
}))

const chainAddress = computed(() => formatChainAddress(generateChainAddress(collection.value.id + collection.value.serialNo)))

// 寄售弹窗
const showConsignDialog = ref(false)

const handleConsign = () => {
  showConsignDialog.value = true
}

const handleConsignSuccess = (price: number) => {
  console.log('寄售成功，价格:', price)
}
</script>

<template>
  <PhoneFrame bg="bg-white">
    <div
      class="absolute left-0 right-0 top-0 z-0"
      style="height: 400px"
      :style="{
        backgroundImage: `url(${collection.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
        transform: 'scale(1.1)',
      }"
    />

    <TopBar
      title=""
      transparent
      :right="FavoriteBtn"
    />

    <main class="relative z-10 flex-1 overflow-y-auto">
      <div class="flex justify-center px-4 pb-4 pt-8">
        <div
          class="relative overflow-hidden"
          style="width: 320px; height: 320px; border-radius: 20px"
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
              style="font-family: 'PingFang SC'; font-size: 20px; font-weight: 700; color: #FF5A7D"
            >
              ¥{{ collection.price }}
            </span>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4">
        <div class="flex items-center gap-2">
          <h1
            style="font-family: 'PingFang SC'; font-size: 24px; font-weight: 700; line-height: 32px; color: #1A1A1A"
          >
            {{ collection.name }}#{{ collection.serialNo }}
          </h1>
        </div>
        <div class="mt-2">
          <span style="font-family: 'PingFang SC'; font-size: 14px; color: #8C8C8C">链上标识：</span>
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
              50000份
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
              45000份
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
            style="font-family: 'PingFang SC'; font-size: 18px; font-weight: 600; line-height: 25px; color: #1A1A1A; margin-bottom: 12px"
          >
            品牌方
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 overflow-hidden flex-shrink-0"
              style="border-radius: 50%"
            >
              <img
                :src="collection.brandAvatar"
                :alt="collection.brand"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              style="font-family: 'PingFang SC'; font-size: 18px; font-weight: 300; line-height: 25px; color: #1A1A1A"
            >
              {{ collection.brand }}
            </div>
          </div>
        </div>

        <div
          class="flex flex-col flex-1 p-4"
          style="border-radius: 16px; background-color: #F5F5F5"
        >
          <div
            style="font-family: 'PingFang SC'; font-size: 18px; font-weight: 600; line-height: 25px; color: #1A1A1A; margin-bottom: 12px"
          >
            创作者
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 overflow-hidden flex-shrink-0"
              style="border-radius: 50%"
            >
              <img
                :src="collection.creatorAvatar"
                :alt="collection.creator"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              style="font-family: 'PingFang SC'; font-size: 18px; font-weight: 300; line-height: 25px; color: #1A1A1A"
            >
              {{ collection.creator }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3 px-4">
        <button
          type="button"
          @click="introOpen = !introOpen"
          class="flex w-full items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span
              class="h-5 w-1"
              style="background: #E91E63; border-radius: 2px"
            />
            <h2 class="text-xl font-bold text-ink-primary">藏品介绍</h2>
          </div>
          <ChevronUp v-if="introOpen" class="h-5 w-5 text-ink-tertiary" />
          <ChevronDown v-else class="h-5 w-5 text-ink-tertiary" />
        </button>
        <p v-if="introOpen" class="mt-3 text-sm leading-relaxed text-ink-secondary">
          {{ collection.intro }}
        </p>
      </div>

      <div class="mb-4 px-4">
        <button
          type="button"
          @click="noticeOpen = !noticeOpen"
          class="flex w-full items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span
              class="h-5 w-1"
              style="background: #E91E63; border-radius: 2px"
            />
            <h2 class="text-xl font-bold text-ink-primary">购买须知</h2>
          </div>
          <ChevronUp v-if="noticeOpen" class="h-5 w-5 text-ink-tertiary" />
          <ChevronDown v-else class="h-5 w-5 text-ink-tertiary" />
        </button>
        <p v-if="noticeOpen" class="mt-3 text-sm leading-relaxed text-ink-secondary">
          {{ collection.notice }}
        </p>
      </div>
    </main>

    <div class="px-4 pb-4 pt-2">
      <button
        type="button"
        @click="handleConsign"
        class="h-14 w-full rounded-2xl text-lg font-semibold text-white active:scale-95"
        style="background: #E91E63"
      >
        立即寄售
      </button>
    </div>

    <!-- 寄售弹窗 -->
    <ConsignDialog
      :visible="showConsignDialog"
      :collection-name="collection.name"
      :collection-image="collection.image"
      :collection-no="`#${collection.no}`"
      :suggest-price="288"
      @close="showConsignDialog = false"
      @success="handleConsignSuccess"
    />
  </PhoneFrame>
</template>
