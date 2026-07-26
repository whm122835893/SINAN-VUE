<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const router = useRouter()
const showPwd = ref(false)
const agree = ref(false)

const rightBtn = {
  setup() {
    return () =>
      h(
        'button',
        {
          type: 'button',
          onClick: () => router.push('/register'),
          class: 'text-base text-ink-primary',
        },
        '注册'
      )
  },
}
</script>

<template>
  <PhoneFrame bg="bg-white" className="!max-w-[420px]">
    <TopBar back :right="rightBtn" />

    <main class="relative flex flex-1 flex-col items-center px-8 pt-12">
      <div class="relative">
        <div
          class="relative flex h-20 w-20 items-center justify-center rounded-2xl"
          style="
            background: linear-gradient(180deg, #1A1A1A, #000000);
            box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          "
        >
          <span
            class="text-lg font-bold"
            style="
              color: #D4A574;
              font-family: Georgia, serif;
              text-shadow: 0 1px 2px rgba(0,0,0,0.6), 0 0 1px #D4A574;
            "
          >
            司南
          </span>
        </div>
      </div>

      <h1
        class="mt-5 text-3xl font-bold text-ink-primary"
        style="font-family: Georgia, serif"
      >
        司南博物
      </h1>

      <div class="mt-8 w-full">
        <label class="text-sm font-medium text-ink-primary">手机号</label>
        <input
          type="tel"
          placeholder="请输入手机号码"
          class="mt-2 h-9 w-full border-b border-ink-tertiary bg-transparent text-sm placeholder:text-ink-tertiary"
        />

        <label class="mt-6 block text-sm font-medium text-ink-primary">密码</label>
        <div class="relative mt-2">
          <input
            :type="showPwd ? 'text' : 'password'"
            placeholder="请输入密码"
            class="h-9 w-full border-b border-ink-tertiary bg-transparent text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="showPwd = !showPwd"
            class="absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="切换密码显隐"
          >
            <Eye v-if="showPwd" class="h-5 w-5 text-ink-secondary" />
            <EyeOff v-else class="h-5 w-5 text-ink-secondary" />
          </button>
        </div>
      </div>

      <button
        type="button"
        @click="agree && router.push('/')"
        :disabled="!agree"
        class="mt-8 h-12 w-full text-base font-semibold text-white shadow-md transition-opacity active:scale-95"
        style="
          border-radius: 8px;
          background: #E91E63;
        "
        :style="{
          opacity: agree ? 1 : 0.5,
          cursor: agree ? 'pointer' : 'not-allowed',
        }"
      >
        登录
      </button>
      <button
        type="button"
        @click="router.push('/register')"
        class="mt-4 text-base text-ink-primary"
      >
        验证码
      </button>

      <div class="mt-auto mb-8 flex items-start gap-2">
        <button
          type="button"
          @click="agree = !agree"
          class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
          style="border: 2px solid #E91E63"
          :style="{ background: agree ? '#E91E63' : 'transparent' }"
          aria-label="同意协议"
        >
          <span v-if="agree" class="text-xs text-white">✓</span>
        </button>
        <p class="text-xs leading-relaxed text-ink-primary">
          已阅读并同意
          <span class="text-brand-magenta">《用户协议》</span>
          <span class="text-brand-magenta">《隐私政策》</span>
          <span class="text-brand-magenta">《平台交易细则》</span>
          <span class="text-brand-magenta">《风险揭示书》</span>
        </p>
      </div>
    </main>
  </PhoneFrame>
</template>
