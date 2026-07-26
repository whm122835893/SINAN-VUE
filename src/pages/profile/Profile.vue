<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Settings,
  Copy,
  ChevronRight,
  Wallet,
  Coins,
  ShieldCheck,
  BadgeCheck,
  Lock,
  FileText,
  Info,
  Share2,
  UserPlus,
} from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import Card from '@/components/ui/Card.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SinanLogo from '@/components/icons/SinanLogo.vue'
import { DiamondDecoration } from '@/components/icons/Illustrations.vue'
import PullRefresh from '@/components/ui/PullRefresh.vue'

const ICON_BG = 'bg-brand-pink/10'
const AUTH_KEY = 'sinan_realname_auth'

const avatarUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('可爱卡通风格头像，圆形，粉色调，简约设计') + '&image_size=square_hd'

const router = useRouter()
const authed = ref(false)

function isAuthed(): boolean {
  try {
    return !!localStorage.getItem(AUTH_KEY)
  } catch {
    return false
  }
}

onMounted(() => {
  authed.value = isAuthed()
})

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
}

interface RowProps {
  icon: any
  title: string
  subtitle?: string
  right?: any
  onClick?: () => void
}

const moreFeatures = [
  { Icon: Share2, t1: '分享司南博物', t2: '分享给好友', onClick: undefined },
  { Icon: UserPlus, t1: '邀请好友', t2: '邀请好友，领取奖励', onClick: () => router.push('/invite') },
]
</script>

<template>
  <PhoneFrame bg="bg-white" withBottomNav>
    <PullRefresh :onRefresh="handleRefresh">
      <header class="flex h-12 items-center justify-between px-4">
        <span class="w-8" />
        <h1 class="text-lg font-semibold text-ink-primary">我的</h1>
        <button
          type="button"
          @click="router.push('/profile/settings')"
          class="p-1"
          aria-label="设置"
        >
          <Settings class="h-5 w-5 text-ink-primary" />
        </button>
      </header>

      <main class="pb-4">
        <div class="mx-4 overflow-hidden rounded-[20px] p-5 relative">
          <div class="absolute inset-0" style="background-image: url(https://images.unsplash.com/photo-1558021262-23073752cc42?w=400&h=200&fit=crop); background-size: cover; background-position: center" />
          <div class="absolute inset-0" style="background-color: rgba(255,179,71,0.3)" />
          <DiamondDecoration :size="90" />
          <div class="relative flex items-center gap-3">
            <img :src="avatarUrl" alt="头像" class="h-12 w-12 rounded-full object-cover shadow-md" />
            <div>
              <p class="text-base font-semibold text-ink-primary">B4HzCeAE</p>
              <p class="text-xs text-ink-tertiary">UID: 187648</p>
            </div>
          </div>
          <div class="relative mt-3 flex items-center gap-1.5">
            <span class="text-[13px] text-ink-secondary font-mono">链上地址：0x4397c1686...e42daa392</span>
            <Copy class="h-3.5 w-3.5 text-brand-orange" />
          </div>
        </div>

        <div class="mx-4 mt-4">
          <div class="px-4 py-2 mb-3">
            <SectionTitle>资产服务</SectionTitle>
          </div>
          <div class="flex gap-2.5">
            <div
              @click="router.push('/assets')"
              class="flex-1 rounded-lg bg-white p-2.5 cursor-pointer active:bg-surface-gray"
              style="box-shadow: 0 2px 8px rgba(0,0,0,0.04)"
            >
              <div class="flex items-center gap-2">
                <div :class="[ICON_BG, 'flex h-9 w-9 items-center justify-center rounded-full']">
                  <Coins class="h-4.5 w-4.5 text-brand-pink" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-ink-primary">我的资产</p>
                  <p class="text-xs text-ink-tertiary">查看数字资产</p>
                </div>
                <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
              </div>
            </div>
            <div
              @click="router.push('/wallet')"
              class="flex-1 rounded-lg bg-white p-2.5 cursor-pointer active:bg-surface-gray"
              style="box-shadow: 0 2px 8px rgba(0,0,0,0.04)"
            >
              <div class="flex items-center gap-2">
                <div :class="[ICON_BG, 'flex h-9 w-9 items-center justify-center rounded-full']">
                  <Wallet class="h-4.5 w-4.5 text-brand-pink" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-ink-primary">我的钱包</p>
                  <p class="text-xs text-ink-tertiary">管理钱包余额</p>
                </div>
                <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
              </div>
            </div>
          </div>
        </div>

        <Card padding="md" radius="lg" shadow="none" className="mx-4 mt-3 px-0 py-2">
          <div class="px-4 py-2">
            <SectionTitle>订单与认证</SectionTitle>
          </div>
          <div class="flex h-14 items-center gap-3 px-4 cursor-pointer active:bg-surface-gray border-b border-ink-divider" @click="router.push('/orders')">
            <div :class="[ICON_BG, 'flex h-8 w-8 items-center justify-center rounded-lg']">
              <ShieldCheck class="h-4 w-4 text-brand-pink" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-ink-primary">司南博物订单</p>
              <p class="text-xs text-ink-tertiary">查看我的订单记录</p>
            </div>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
          <div class="flex h-14 items-center gap-3 px-4 cursor-pointer active:bg-surface-gray border-b border-ink-divider" @click="router.push('/profile/realname')">
            <div :class="[ICON_BG, 'flex h-8 w-8 items-center justify-center rounded-lg']">
              <BadgeCheck class="h-4 w-4 text-brand-pink" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-ink-primary">我的认证</p>
              <p class="text-xs text-ink-tertiary">{{ authed ? '已完成实名认证' : '完成认证，解锁更多权益' }}</p>
            </div>
            <span
              class="rounded px-1.5 py-0.5 text-[10px]"
              :style="{
                background: authed ? '#FFE0EC' : '#EFEFEF',
                color: authed ? '#FF6B9D' : '#999999',
                borderRadius: '4px',
              }"
            >
              {{ authed ? '已认证' : '未认证' }}
            </span>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
          <div class="flex h-14 items-center gap-3 px-4 cursor-pointer active:bg-surface-gray border-b border-ink-divider" @click="router.push('/profile/security')">
            <div :class="[ICON_BG, 'flex h-8 w-8 items-center justify-center rounded-lg']">
              <Lock class="h-4 w-4 text-brand-pink" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-ink-primary">安全设置</p>
              <p class="text-xs text-ink-tertiary">管理账号安全与隐私</p>
            </div>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
          <div class="flex h-14 items-center gap-3 px-4 border-b border-ink-divider">
            <div :class="[ICON_BG, 'flex h-8 w-8 items-center justify-center rounded-lg']">
              <FileText class="h-4 w-4 text-brand-pink" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-ink-primary">相关协议</p>
              <p class="text-xs text-ink-tertiary">查看平台相关协议</p>
            </div>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
          <div class="flex h-14 items-center gap-3 px-4">
            <div :class="[ICON_BG, 'flex h-8 w-8 items-center justify-center rounded-lg']">
              <Info class="h-4 w-4 text-brand-pink" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-ink-primary">关于司南博物</p>
              <p class="text-xs text-ink-tertiary">版本信息与平台介绍</p>
            </div>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
        </Card>

        <Card padding="md" radius="lg" shadow="none" className="mx-4 mt-3">
          <SectionTitle>更多功能</SectionTitle>
          <div class="mt-3 grid grid-cols-3 gap-2">
            <button
              v-for="(item, i) in moreFeatures"
              :key="i"
              @click="item.onClick?.()"
              class="flex flex-col items-center gap-1.5 text-center"
            >
              <div :class="[ICON_BG, 'flex h-10 w-10 items-center justify-center rounded-full']">
                <component :is="item.Icon" class="h-5 w-5 text-brand-pink" />
              </div>
              <p class="text-xs font-medium text-ink-primary">{{ item.t1 }}</p>
              <p class="text-[10px] text-ink-tertiary leading-tight">{{ item.t2 }}</p>
            </button>
          </div>
        </Card>

        <div class="mx-4 mt-6 mb-4">
          <button
            type="button"
            @click="router.push('/login')"
            class="h-11 w-full rounded-lg text-base font-semibold text-white active:scale-95"
            style="background: #E91E63"
          >
            退出账号
          </button>
        </div>
      </main>
    </PullRefresh>

    <BottomNav active="profile" accent="pink" />
  </PhoneFrame>
</template>
