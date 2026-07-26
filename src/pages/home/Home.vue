<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, Package, Sparkles, Megaphone } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import { ICON_3D_META, ROUTE_OF_ICON } from '@/components/icons/Icon3D.vue'
import { AbstractBoxIllustration } from '@/components/icons/Illustrations.vue'
import BannerCarousel from '@/components/ui/BannerCarousel.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const ANNOUNCELIST = [
  { id: '1', title: '【运营公告】关于司南博物平台数字资产迁移说明' },
  { id: '2', title: '【运营公告】司南博物·焕新升级进展' },
  { id: '3', title: '【活动公告】经典老IP回归活动火热进行中' },
]

// 金刚区图标网图
const ICON_IMAGES: Record<string, string> = {
  checkin: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格签到日历带对勾图标，粉红渐变背景，圆润立体') + '&image_size=square_hd',
  compose: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格六边形晶体合成图标，粉红渐变背景，圆润立体') + '&image_size=square_hd',
  exchange: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格礼盒兑换图标，紫色渐变背景，圆润立体') + '&image_size=square_hd',
  lottery: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格水晶球抽签图标，粉色渐变背景，圆润立体') + '&image_size=square_hd',
  supply: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格宝箱补给图标，蓝红渐变背景，圆润立体') + '&image_size=square_hd',
  swap: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格循环箭头置换图标，红蓝渐变背景，圆润立体') + '&image_size=square_hd',
  vote: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('3D拟物风格投票箱打勾图标，橙色渐变背景，圆润立体') + '&image_size=square_hd',
}

type HomeTab = 'debut' | 'blind' | 'featured'

const TABS: { key: HomeTab; label: string }[] = [
  { key: 'debut', label: '首发' },
  { key: 'blind', label: '盲盒' },
  { key: 'featured', label: '精选活动' },
]

const router = useRouter()
const activeTab = ref<HomeTab>('debut')
const currentAnnounceIndex = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentAnnounceIndex.value = (currentAnnounceIndex.value + 1) % ANNOUNCELIST.length
  }, 3000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const TAB_CONTENT: Record<HomeTab, { title: string; desc: string }> = {
  debut: { title: '暂无首发内容', desc: '更多首发数字藏品即将上线' },
  blind: { title: '暂无盲盒', desc: '新奇盲盒敬请期待' },
  featured: { title: '暂无精选活动', desc: '活动筹备中，敬请期待' },
}

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}
</script>

<template>
  <PhoneFrame bg="bg-white" withBottomNav>
    <PullRefresh :onRefresh="handleRefresh">
      <header class="flex h-10 items-center gap-2 px-3 mt-3">
        <button
          type="button"
          @click="router.push('/discover')"
          class="flex h-9 w-9 flex-shrink-0 flex-col items-center justify-center bg-surface-gray"
          style="border-radius: 8px"
          aria-label="资讯公告"
        >
          <span class="text-[10px] font-bold leading-none text-ink-primary">资讯</span>
          <span class="text-[10px] font-bold leading-none text-ink-primary">公告</span>
        </button>
        <button
          type="button"
          @click="router.push(`/discover/${ANNOUNCELIST[currentAnnounceIndex].id}`)"
          class="flex h-9 flex-1 items-center gap-2 overflow-hidden border bg-surface-gray px-2"
          style="border-radius: 8px"
          aria-label="公告详情"
        >
          <Megaphone class="h-3.5 w-3.5 flex-shrink-0 text-brand-magenta" />
          <span class="truncate text-xs text-ink-primary">
            {{ ANNOUNCELIST[currentAnnounceIndex].title }}
          </span>
        </button>
        <Menu class="h-5 w-5 flex-shrink-0 text-ink-secondary" />
      </header>

      <main class="pb-2">
        <section class="mx-4 mt-2">
          <BannerCarousel />
        </section>

        <section class="mx-4 mt-4 rounded-2xl bg-white p-3 shadow-card">
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="item in ICON_3D_META"
              :key="item.key"
              type="button"
              @click="router.push(ROUTE_OF_ICON[item.key])"
              class="flex flex-col items-center gap-1.5 active:scale-95"
            >
              <img
                :src="ICON_IMAGES[item.key]"
                :alt="item.label"
                class="h-12 w-12 rounded-xl object-cover"
              />
              <span class="text-xs text-ink-secondary">{{ item.label }}</span>
            </button>
          </div>
          <div class="mt-3 flex items-center justify-center gap-1.5">
            <span class="h-1.5 w-4 rounded-full bg-fn-danger" />
            <span class="h-1.5 w-1.5 rounded-full bg-ink-divider" />
          </div>
        </section>

        <section class="mt-4">
          <div class="flex h-11 items-center gap-6 border-b border-ink-divider px-4">
            <button
              v-for="tab in TABS"
              :key="tab.key"
              type="button"
              @click="activeTab = tab.key"
              :class="[
                'relative h-full',
                activeTab === tab.key
                  ? 'font-semibold text-fn-danger'
                  : 'text-ink-tertiary',
              ]"
            >
              {{ tab.label }}
              <span
                v-if="activeTab === tab.key"
                class="absolute inset-x-0 -bottom-px mx-auto h-[3px] w-5 bg-fn-danger"
              />
            </button>
          </div>
          <div class="flex min-h-[180px] flex-col items-center justify-center gap-2 py-8">
            <template v-if="activeTab === 'blind'">
              <Sparkles class="h-10 w-10 text-ink-tertiary opacity-40" />
              <p class="text-sm text-ink-tertiary">{{ TAB_CONTENT[activeTab].title }}</p>
              <p class="text-xs text-ink-tertiary opacity-70">{{ TAB_CONTENT[activeTab].desc }}</p>
            </template>
            <template v-else-if="activeTab === 'featured'">
              <Package class="h-10 w-10 text-ink-tertiary opacity-40" />
              <p class="text-sm text-ink-tertiary">{{ TAB_CONTENT[activeTab].title }}</p>
              <p class="text-xs text-ink-tertiary opacity-70">{{ TAB_CONTENT[activeTab].desc }}</p>
            </template>
            <template v-else>
              <AbstractBoxIllustration :size="80" tone="pink" />
              <p class="text-sm text-ink-tertiary">{{ TAB_CONTENT[activeTab].title }}</p>
              <p class="text-xs text-ink-tertiary opacity-70">{{ TAB_CONTENT[activeTab].desc }}</p>
            </template>
          </div>
        </section>
      </main>
    </PullRefresh>

    <BottomNav active="home" accent="magenta" />
  </PhoneFrame>
</template>
