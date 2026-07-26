<script setup lang="ts">
import { ChevronRight, Copy } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const avatarUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('可爱卡通风格头像，圆形，粉色调，简约设计') + '&image_size=square_hd'
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="个人信息" />

    <main class="flex-1 overflow-y-auto">
      <div class="mt-3 bg-white">
        <div class="flex h-14 items-center justify-between px-4 border-b border-ink-divider">
          <span class="text-base text-ink-primary">头像</span>
          <div class="flex items-center gap-1">
            <img :src="avatarUrl" alt="头像" class="h-10 w-10 rounded-full object-cover" />
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
        </div>
        <div class="flex h-14 items-center justify-between px-4 border-b border-ink-divider">
          <span class="text-base text-ink-primary">昵称</span>
          <div class="flex items-center gap-1">
            <span class="text-sm text-ink-tertiary">B4HzCeAE</span>
            <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
          </div>
        </div>
        <div class="flex h-14 items-center justify-between px-4 border-b border-ink-divider">
          <span class="text-base text-ink-primary">手机号</span>
          <span class="text-sm text-ink-tertiary">175****1293</span>
        </div>
        <div class="flex h-14 items-center justify-between px-4 border-b border-ink-divider">
          <span class="text-base text-ink-primary">区块链地址</span>
          <button type="button" aria-label="复制地址">
            <Copy class="h-5 w-5 text-brand-orange" />
          </button>
        </div>
        <div class="flex h-14 items-center justify-between px-4 border-b border-ink-divider">
          <span class="text-base text-ink-primary">收货地址</span>
          <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
        </div>
        <div class="flex h-14 items-center justify-between px-4">
          <span class="text-base text-ink-primary">平台交易细则</span>
          <ChevronRight class="h-4 w-4 text-ink-divider" :stroke-width="2.5" />
        </div>
      </div>
    </main>
  </PhoneFrame>
</template>
