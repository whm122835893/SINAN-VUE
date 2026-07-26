<script setup lang="ts">
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'
</script>

<template>
  <PhoneFrame bg="bg-white">
    <TopBar title="我的钱包" />

    <main class="flex-1 overflow-y-auto px-4 pt-5">
      <div
        class="relative flex h-36 flex-col justify-between overflow-hidden rounded-[20px] p-5"
        style="background: linear-gradient(135deg, #FF6B6B, #C0392B)"
      >
        <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div class="absolute -right-2 bottom-6 h-12 w-12 rounded-full bg-white/10" />
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <span class="text-base font-bold text-fn-danger">汇</span>
          </div>
          <span class="text-base font-medium text-white">汇付支付</span>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-capsule px-5 py-2 text-sm font-medium text-white"
            style="background: #C45C1A"
          >
            进入钱包
          </button>
        </div>
      </div>

      <div
        class="relative mt-4 flex h-36 flex-col justify-between overflow-hidden rounded-[20px] p-5"
        style="background: linear-gradient(135deg, #4CAF50, #2E7D32)"
      >
        <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div class="absolute -right-2 bottom-6 h-12 w-12 rounded-full bg-white/10" />
        <div>
          <div class="flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <span class="text-base font-bold text-fn-success">易</span>
            </div>
            <span class="text-base font-medium text-white">易宝支付</span>
          </div>
          <p class="mt-1 ml-12 text-[10px] tracking-wider" style="color: #C8E6C9">
            YIBAOZHIFU
          </p>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-capsule px-5 py-2 text-sm font-medium text-white"
            style="background: #22C55E"
          >
            进入钱包
          </button>
        </div>
      </div>
    </main>
  </PhoneFrame>
</template>
