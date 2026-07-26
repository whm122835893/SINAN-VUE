<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldCheck, User, CreditCard, CheckCircle2 } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const AUTH_KEY = 'sinan_realname_auth'

interface AuthInfo {
  name: string
  idCard: string
}

function getAuthInfo(): AuthInfo | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* empty */
  }
  return null
}

function setAuthInfo(info: AuthInfo) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(info))
  } catch {
    /* empty */
  }
}

function maskIdCard(id: string): string {
  if (id.length < 8) return id
  return id.slice(0, 4) + '**********' + id.slice(-4)
}

function validateIdCard(id: string): boolean {
  return /^\d{17}[\dXx]$/.test(id)
}

const router = useRouter()
const authed = ref(false)
const info = ref<AuthInfo | null>(null)
const name = ref('')
const idCard = ref('')
const error = ref('')

onMounted(() => {
  const saved = getAuthInfo()
  if (saved) {
    authed.value = true
    info.value = saved
  }
})

const handleSubmit = () => {
  error.value = ''
  if (!name.value.trim()) {
    error.value = '请输入真实姓名'
    return
  }
  if (!validateIdCard(idCard.value.trim())) {
    error.value = '请输入正确的18位身份证号'
    return
  }
  const newInfo = { name: name.value.trim(), idCard: idCard.value.trim() }
  setAuthInfo(newInfo)
  info.value = newInfo
  authed.value = true
}
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="实名认证" />

    <main class="flex-1 overflow-y-auto px-4 pt-4 pb-8">
      <div v-if="authed && info" class="overflow-hidden rounded-2xl bg-white shadow-card">
        <div class="flex flex-col items-center py-8" style="background: linear-gradient(135deg, #FFB347, #FF6B9D)">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <CheckCircle2 class="h-9 w-9 text-white" />
          </div>
          <p class="mt-3 text-lg font-semibold text-white">已认证</p>
          <p class="mt-1 text-xs text-white/80">您的实名信息已通过审核</p>
        </div>

        <div class="divide-y divide-ink-divider">
          <div class="flex h-14 items-center justify-between px-4">
            <div class="flex items-center gap-2">
              <User class="h-4 w-4 text-brand-pink" />
              <span class="text-sm text-ink-primary">真实姓名</span>
            </div>
            <span class="text-sm text-ink-secondary">{{ info.name }}</span>
          </div>
          <div class="flex h-14 items-center justify-between px-4">
            <div class="flex items-center gap-2">
              <CreditCard class="h-4 w-4 text-brand-pink" />
              <span class="text-sm text-ink-primary">身份证号</span>
            </div>
            <span class="text-sm text-ink-secondary font-mono">
              {{ maskIdCard(info.idCard) }}
            </span>
          </div>
        </div>

        <div class="px-4 py-4">
          <p class="text-xs text-ink-tertiary">
            注：实名信息一经认证无法修改，请确保填写的信息真实有效。
          </p>
        </div>
      </div>

      <div v-else class="overflow-hidden rounded-2xl bg-white shadow-card">
        <div class="flex flex-col items-center py-6" style="background: linear-gradient(135deg, #FFB347, #FF6B9D)">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <ShieldCheck class="h-7 w-7 text-white" />
          </div>
          <p class="mt-2 text-base font-semibold text-white">实名认证</p>
          <p class="mt-1 text-xs text-white/80">完成认证，解锁更多权益</p>
        </div>

        <div class="space-y-4 p-4">
          <div>
            <label class="mb-1.5 block text-sm text-ink-primary">真实姓名</label>
            <div class="flex h-11 items-center gap-2 rounded-lg border border-ink-divider bg-white px-3 focus-within:border-brand-pink">
              <User class="h-4 w-4 text-ink-tertiary" />
              <input
                type="text"
                v-model="name"
                placeholder="请输入您的真实姓名"
                class="flex-1 text-sm placeholder:text-ink-tertiary outline-none"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm text-ink-primary">身份证号</label>
            <div class="flex h-11 items-center gap-2 rounded-lg border border-ink-divider bg-white px-3 focus-within:border-brand-pink">
              <CreditCard class="h-4 w-4 text-ink-tertiary" />
              <input
                type="text"
                v-model="idCard"
                @input="idCard = idCard.toUpperCase()"
                placeholder="请输入18位身份证号"
                maxlength="18"
                class="flex-1 text-sm placeholder:text-ink-tertiary outline-none font-mono"
              />
            </div>
          </div>

          <p v-if="error" class="text-xs text-fn-danger">{{ error }}</p>

          <button
            type="button"
            @click="handleSubmit"
            class="h-11 w-full rounded-lg text-sm font-semibold text-white active:scale-95"
            style="background: #FF5A7D"
          >
            提交认证
          </button>

          <p class="text-xs text-ink-tertiary leading-relaxed">
            温馨提示：您的实名信息仅用于身份验证，我们将严格保密，不会泄露给任何第三方。
          </p>
        </div>
      </div>
    </main>
  </PhoneFrame>
</template>
