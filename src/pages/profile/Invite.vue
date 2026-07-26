<script setup lang="ts">
import { Link2, Download } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { Astronaut, StarryOverlay, QrPlaceholder } from '@/components/icons/Illustrations.vue'
import SinanLogo from '@/components/icons/SinanLogo.vue'
</script>

<template>
  <PhoneFrame className="!max-w-[420px]">
    <div
      class="absolute inset-0"
      style="background: linear-gradient(180deg, #1A0A2E 0%, #4A1F5E 30%, #FF6B35 70%, #FF5A7D 100%)"
    />
    <StarryOverlay />

    <TopBar
      title="邀请好友"
      transparent
      white
      backBtnClass="bg-white shadow-sm"
      backIconClass="text-black"
    />

    <main class="relative flex-1 overflow-y-auto">
      <section class="relative flex flex-col items-center pt-2">
        <div class="relative flex w-full items-center justify-between px-6">
          <Astronaut :size="80" class="animate-float" />
          <Astronaut :size="80" class="animate-float" />
        </div>
        <svg
          class="absolute -bottom-2 left-0 w-full opacity-80"
          height="80"
          viewBox="0 0 375 80"
          preserveAspectRatio="none"
        >
          <polygon points="0,80 60,30 120,60 200,10 270,50 320,20 375,40 375,80" fill="#2A1B3D" opacity="0.85" />
          <polygon points="0,80 80,50 160,70 240,40 320,65 375,55 375,80" fill="#1A0A2E" />
        </svg>

        <h1
          class="relative mt-4 text-center text-5xl font-black leading-tight"
          style="background: linear-gradient(180deg, #FF5A7D 0%, #7C5CFC 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: Georgia, serif; text-shadow: 0 0 1px #FFD700; filter: drop-shadow(0 2px 0 #FFD700) drop-shadow(0 4px 12px rgba(255,90,125,0.6))"
        >
          邀好友
          <br />
          享好礼
        </h1>
      </section>

      <section class="relative mx-4 mt-8">
        <div
          class="absolute -top-4 left-1/2 h-8 w-16 -translate-x-1/2"
          style="background: linear-gradient(180deg, #4A2F2F 0%, #2A1F1F 100%); clip-path: polygon(0 0, 100% 0, 50% 100%); border-radius: 4px"
        />
        <div class="glass-dark rounded-3xl p-5">
          <p class="text-center text-sm" style="color: #FFD700">您的专属邀请码为</p>
          <div
            class="mx-auto mt-3 flex h-12 w-full max-w-xs items-center justify-center rounded-capsule p-[2px]"
            style="background: linear-gradient(90deg, #1890FF, #7C5CFC, #FF5A7D, #FF8C00)"
          >
            <div class="flex h-full w-full items-center justify-center rounded-capsule" style="background: rgba(0,0,0,0.6)">
              <span
                class="font-mono text-xl font-bold tracking-widest"
                style="color: #FFD700"
              >
                #G197648#
              </span>
            </div>
          </div>

          <div class="mt-6 flex flex-col items-center">
            <div class="relative rounded-full bg-white p-3">
              <QrPlaceholder :size="120" class="rounded-2xl" />
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <SinanLogo :size="36" variant="black" />
              </div>
            </div>
            <p class="mt-3 text-sm text-white">扫描二维码</p>
            <p class="mt-0.5 text-sm text-white">下载注册司南博物账号</p>
          </div>

          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-1.5 rounded-capsule py-3 text-sm font-bold text-white active:scale-95"
              style="background: linear-gradient(90deg, #FF6B35, #FF4D4F); box-shadow: 0 4px 12px rgba(255,77,79,0.4)"
            >
              <Link2 class="h-4 w-4" />
              复制链接
            </button>
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-1.5 rounded-capsule py-3 text-sm font-bold text-white active:scale-95"
              style="background: linear-gradient(90deg, #FF5A7D, #E91E63); box-shadow: 0 4px 12px rgba(233,30,99,0.4)"
            >
              <Download class="h-4 w-4" />
              下载邀请海报
            </button>
          </div>
        </div>
      </section>

      <div class="h-12" />
    </main>
  </PhoneFrame>
</template>
