<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Lock, ShieldCheck, Smartphone } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const router = useRouter()
const showPwd = ref(false)
const showPwd2 = ref(false)
const agree = ref(false)
</script>

<template>
  <PhoneFrame bg="bg-white">
    <TopBar title="注册" />

    <main class="flex-1 overflow-y-auto px-6 pb-12">
      <div class="mt-4">
        <label class="text-sm font-semibold text-ink-primary">请输入您的手机号</label>
        <p class="mt-1 text-xs text-ink-tertiary">用于接收验证码和账户安全验证</p>
        <div class="mt-2 flex h-12 items-center gap-2 rounded-lg bg-surface-gray px-3 shadow-sm">
          <Smartphone class="h-5 w-5 text-ink-tertiary" />
          <input
            type="tel"
            placeholder="请输入手机号"
            class="h-full flex-1 text-sm placeholder:text-ink-tertiary"
          />
        </div>
      </div>

      <div class="mt-6">
        <label class="text-sm font-semibold text-ink-primary">发送验证码</label>
        <p class="mt-1 text-xs text-ink-tertiary">验证码已发送至您的手机</p>
        <div class="mt-2 flex h-12 items-center gap-2 rounded-lg bg-surface-gray px-3 shadow-sm">
          <ShieldCheck class="h-5 w-5 text-ink-tertiary" />
          <input
            type="text"
            placeholder="请输入验证码"
            class="h-full flex-1 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            class="rounded-md border border-brand-magenta px-2.5 py-1 text-xs font-medium text-brand-magenta active:scale-95"
          >
            发送验证码
          </button>
        </div>
      </div>

      <div class="mt-6">
        <label class="text-sm font-semibold text-ink-primary">设置登录密码</label>
        <p class="mt-1 text-xs text-ink-tertiary">密码至少8位，包含数字、字母，可选特殊符号</p>
        <div class="mt-2 flex h-12 items-center gap-2 rounded-lg bg-surface-gray px-3 shadow-sm">
          <Lock class="h-5 w-5 text-ink-tertiary" />
          <input
            :type="showPwd ? 'text' : 'password'"
            placeholder="请输入登录密码"
            class="h-full flex-1 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="showPwd = !showPwd"
            aria-label="切换密码显隐"
          >
            <Eye v-if="showPwd" class="h-5 w-5 text-ink-secondary" />
            <EyeOff v-else class="h-5 w-5 text-ink-secondary" />
          </button>
        </div>
      </div>

      <div class="mt-6">
        <label class="text-sm font-semibold text-ink-primary">再次确认登录密码</label>
        <div class="mt-2 flex h-12 items-center gap-2 rounded-lg bg-surface-gray px-3 shadow-sm">
          <Lock class="h-5 w-5 text-ink-tertiary" />
          <input
            :type="showPwd2 ? 'text' : 'password'"
            placeholder="请再次输入登录密码"
            class="h-full flex-1 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="showPwd2 = !showPwd2"
            aria-label="切换密码显隐"
          >
            <Eye v-if="showPwd2" class="h-5 w-5 text-ink-secondary" />
            <EyeOff v-else class="h-5 w-5 text-ink-secondary" />
          </button>
        </div>
      </div>

      <button
        type="button"
        @click="agree && router.push('/login')"
        :disabled="!agree"
        class="mt-8 w-full py-3.5 text-base font-semibold text-white shadow-md transition-opacity active:scale-95"
        style="
          height: 52px;
          border-radius: 8px;
          background: #E91E63;
        "
        :style="{
          opacity: agree ? 1 : 0.5,
          cursor: agree ? 'pointer' : 'not-allowed',
        }"
      >
        立即注册
      </button>

      <div class="mt-5 flex items-start gap-2">
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
          我已阅读并同意
          <span class="text-brand-magenta">《用户服务协议》</span>
          <span class="text-brand-magenta">《隐私权政策》</span>
          <span class="text-brand-magenta">《平台交易细则》</span>
          <span class="text-brand-magenta">《风险揭示书》</span>
        </p>
      </div>
    </main>
  </PhoneFrame>
</template>
