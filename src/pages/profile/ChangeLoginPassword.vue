<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const router = useRouter()
const code = ref('')
const countdown = ref(0)
const newPwd = ref('')
const confirmPwd = ref('')
const showPwd = ref(false)
const showConfirm = ref(false)
const error = ref('')
const success = ref(false)

watch(countdown, (val) => {
  if (val > 0) {
    const timer = setTimeout(() => {
      countdown.value--
    }, 1000)
    return () => clearTimeout(timer)
  }
})

const sendCode = () => {
  if (countdown.value > 0) return
  countdown.value = 60
  error.value = ''
}

const handleSubmit = () => {
  if (code.value.length !== 6) {
    error.value = '请输入6位验证码'
    return
  }
  if (newPwd.value.length < 6) {
    error.value = '新密码至少6位'
    return
  }
  if (newPwd.value !== confirmPwd.value) {
    error.value = '两次输入的密码不一致'
    return
  }
  success.value = true
  setTimeout(() => router.back(), 1500)
}
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="修改登录密码" />

    <main class="flex-1 overflow-y-auto px-6 pt-6">
      <div class="mb-6">
        <p class="text-sm text-ink-tertiary">当前手机号</p>
        <p class="mt-1 text-lg font-semibold text-ink-primary">175****1293</p>
      </div>

      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium text-ink-primary">验证码</label>
        <div class="flex gap-3">
          <input
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="请输入验证码"
            v-model="code"
            @input="code = code.replace(/\D/g, '')"
            class="h-11 flex-1 rounded-lg border border-ink-divider bg-white px-3 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="sendCode"
            :disabled="countdown > 0"
            class="h-11 flex-shrink-0 rounded-lg px-4 text-sm font-medium text-white active:scale-95"
            :style="{
              background: countdown > 0 ? '#CCCCCC' : '#E91E63',
              opacity: countdown > 0 ? 0.8 : 1,
            }"
          >
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium text-ink-primary">新密码</label>
        <div class="relative">
          <input
            :type="showPwd ? 'text' : 'password'"
            placeholder="请输入新密码（至少6位）"
            v-model="newPwd"
            @input="error = ''"
            class="h-11 w-full rounded-lg border border-ink-divider bg-white px-3 pr-10 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="showPwd = !showPwd"
            class="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="切换密码显隐"
          >
            <Eye v-if="showPwd" class="h-5 w-5 text-ink-secondary" />
            <EyeOff v-else class="h-5 w-5 text-ink-secondary" />
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium text-ink-primary">确认新密码</label>
        <div class="relative">
          <input
            :type="showConfirm ? 'text' : 'password'"
            placeholder="请再次输入新密码"
            v-model="confirmPwd"
            @input="error = ''"
            class="h-11 w-full rounded-lg border border-ink-divider bg-white px-3 pr-10 text-sm placeholder:text-ink-tertiary"
          />
          <button
            type="button"
            @click="showConfirm = !showConfirm"
            class="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="切换密码显隐"
          >
            <Eye v-if="showConfirm" class="h-5 w-5 text-ink-secondary" />
            <EyeOff v-else class="h-5 w-5 text-ink-secondary" />
          </button>
        </div>
      </div>

      <p v-if="error" class="mb-4 text-sm text-fn-danger">{{ error }}</p>

      <p v-if="success" class="mb-4 text-sm text-fn-success">密码修改成功！</p>

      <button
        type="button"
        @click="handleSubmit"
        class="mt-4 h-12 w-full rounded-lg text-base font-semibold text-white shadow-md active:scale-95"
        style="background: #E91E63"
      >
        确认修改
      </button>
    </main>
  </PhoneFrame>
</template>
