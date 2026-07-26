<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const router = useRouter()
const code = ref('')
const countdown = ref(0)
const password = ref<string[]>(['', '', '', '', '', ''])
const confirmPwd = ref<string[]>(['', '', '', '', '', ''])
const error = ref('')
const success = ref(false)

const pwdRefs = ref<(HTMLInputElement | null)[]>([])
const confirmRefs = ref<(HTMLInputElement | null)[]>([])

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

const handlePwdChange = (index: number, value: string, isConfirm: boolean) => {
  if (!/^\d?$/.test(value)) return
  const target = isConfirm ? confirmPwd : password
  const refs = isConfirm ? confirmRefs : pwdRefs

  const next = [...target.value]
  next[index] = value
  target.value = next
  error.value = ''

  if (value && index < 5) {
    nextTick(() => {
      refs.value[index + 1]?.focus()
    })
  }
}

const handlePwdKeyDown = (index: number, e: KeyboardEvent, isConfirm: boolean) => {
  const refs = isConfirm ? confirmRefs : pwdRefs
  const target = isConfirm ? confirmPwd : password

  if (e.key === 'Backspace' && !target.value[index] && index > 0) {
    const next = [...target.value]
    next[index - 1] = ''
    target.value = next
    nextTick(() => {
      refs.value[index - 1]?.focus()
    })
  }
}

const handleSubmit = () => {
  const pwd = password.value.join('')
  const cpwd = confirmPwd.value.join('')
  if (code.value.length !== 6) {
    error.value = '请输入6位验证码'
    return
  }
  if (pwd.length !== 6) {
    error.value = '请输入6位操作密码'
    return
  }
  if (cpwd.length !== 6) {
    error.value = '请确认操作密码'
    return
  }
  if (pwd !== cpwd) {
    error.value = '两次输入的密码不一致'
    return
  }
  success.value = true
  setTimeout(() => router.back(), 1500)
}
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="设置操作密码" />

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
        <label class="mb-2 block text-sm font-medium text-ink-primary">设置6位操作密码</label>
        <div class="flex justify-between gap-2">
          <input
            v-for="(digit, i) in password"
            :key="i"
            :ref="(el) => { pwdRefs[i] = el as HTMLInputElement | null }"
            type="password"
            inputmode="numeric"
            maxlength="1"
            :value="digit"
            @input="handlePwdChange(i, ($event.target as HTMLInputElement).value, false)"
            @keydown="handlePwdKeyDown(i, $event, false)"
            class="h-12 w-12 rounded-lg border border-ink-divider bg-white text-center text-lg font-semibold text-ink-primary focus:border-brand-magenta focus:outline-none"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium text-ink-primary">确认操作密码</label>
        <div class="flex justify-between gap-2">
          <input
            v-for="(digit, i) in confirmPwd"
            :key="i"
            :ref="(el) => { confirmRefs[i] = el as HTMLInputElement | null }"
            type="password"
            inputmode="numeric"
            maxlength="1"
            :value="digit"
            @input="handlePwdChange(i, ($event.target as HTMLInputElement).value, true)"
            @keydown="handlePwdKeyDown(i, $event, true)"
            class="h-12 w-12 rounded-lg border border-ink-divider bg-white text-center text-lg font-semibold text-ink-primary focus:border-brand-magenta focus:outline-none"
          />
        </div>
      </div>

      <p v-if="error" class="mb-4 text-sm text-fn-danger">{{ error }}</p>

      <p v-if="success" class="mb-4 text-sm text-fn-success">操作密码设置成功！</p>

      <button
        type="button"
        @click="handleSubmit"
        class="mt-4 h-12 w-full rounded-lg text-base font-semibold text-white shadow-md active:scale-95"
        style="background: #E91E63"
      >
        确认设置
      </button>
    </main>
  </PhoneFrame>
</template>
