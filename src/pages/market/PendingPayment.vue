<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'

const marketCollections = [
  {
    id: '1',
    name: '秦匣有道',
    issue: 1000,
    circulation: 434,
    price: 288,
    category: '数字藏品',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&h=800&fit=crop',
  },
  {
    id: '2',
    name: '秦匣时有违',
    issue: 66666,
    circulation: 66666,
    price: 5,
    category: '盲盒',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop',
  },
]

const generateOrderList = (collection: typeof marketCollections[0]) => {
  const count = Math.min(Math.floor(Math.random() * 5) + 3, 8)
  return Array.from({ length: count }, (_, i) => ({
    id: `${collection.id}-${i + 1}`,
    name: collection.name,
    issue: collection.issue,
    circulation: collection.circulation,
    price: collection.price + Math.floor(Math.random() * 20) - 10,
    no: String(Math.floor(Math.random() * 900000) + 100000),
  })).sort((a, b) => a.price - b.price)
}

const route = useRoute()
const router = useRouter()

const collection = computed(() => marketCollections.find((c) => c.id === route.params.id) || marketCollections[0])
const orderList = computed(() => generateOrderList(collection.value))
const order = computed(() => orderList.value.find((o) => o.id === route.params.orderId) || orderList.value[0])

// 5分钟倒计时 (300秒)
const remainSeconds = ref(300)
const isExpired = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const startCountdown = () => {
  timer = setInterval(() => {
    if (remainSeconds.value > 0) {
      remainSeconds.value--
    } else {
      isExpired.value = true
      showPasswordModal.value = false
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

const minutes = computed(() => String(Math.floor(remainSeconds.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(remainSeconds.value % 60).padStart(2, '0'))
const isUrgent = computed(() => remainSeconds.value <= 60 && !isExpired.value)

// 支付方式
interface PaymentMethod {
  id: string
  name: string
  desc: string
  icon: string
  color: string
  bgColor: string
}

const paymentMethods: PaymentMethod[] = [
  { id: 'huifu', name: '汇付支付', desc: '汇付钱包快捷支付', icon: '汇', color: '#C0392B', bgColor: 'linear-gradient(135deg, #FF6B6B, #C0392B)' },
  { id: 'yibao', name: '易宝支付', desc: 'YIBAOZHIFU', icon: '易', color: '#2E7D32', bgColor: 'linear-gradient(135deg, #4CAF50, #2E7D32)' },
  { id: 'alipay', name: '支付宝', desc: '支付宝安全支付', icon: '支', color: '#0060A0', bgColor: 'linear-gradient(135deg, #42A5F5, #0060A0)' },
  { id: 'wechat', name: '微信支付', desc: '微信安全支付', icon: '微', color: '#1B9E3E', bgColor: 'linear-gradient(135deg, #66BB6A, #1B9E3E)' },
]

const selectedMethod = ref('huifu')

// 密码弹窗
const showPasswordModal = ref(false)
const passwordStr = ref('')
const pwdRefs = ref<(HTMLInputElement | null)[]>([])
const pwdError = ref('')
const showSuccess = ref(false)

const passwordArr = computed(() => {
  const arr = passwordStr.value.split('')
  while (arr.length < 6) arr.push('')
  return arr.slice(0, 6)
})

const activePwdIndex = computed(() => Math.min(passwordStr.value.length, 5))

const openPasswordModal = () => {
  if (isExpired.value) return
  showPasswordModal.value = true
  passwordStr.value = ''
  pwdError.value = ''
  nextTick(() => {
    pwdRefs.value[0]?.focus()
  })
}

const closePasswordModal = () => {
  showPasswordModal.value = false
  passwordStr.value = ''
  pwdError.value = ''
}

const handlePwdInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const inputVal = target.value.replace(/\D/g, '')

  if (!inputVal) {
    passwordStr.value = passwordStr.value.slice(0, index)
    nextTick(() => {
      target.value = ''
      pwdRefs.value[Math.min(index, 5)]?.focus()
    })
    return
  }

  const newChars = inputVal.split('')
  const before = passwordStr.value.slice(0, index)
  const after = passwordStr.value.slice(index + newChars.length)
  const combined = (before + newChars.join('') + after).slice(0, 6)
  passwordStr.value = combined

  pwdError.value = ''
  target.value = ''

  nextTick(() => {
    if (combined.length < 6) {
      pwdRefs.value[Math.min(combined.length, 5)]?.focus()
    } else {
      verifyPassword()
      (document.activeElement as HTMLElement)?.blur()
    }
  })
}

const handlePwdKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace') {
    if (index > 0 && !passwordStr.value[index]) {
      passwordStr.value = passwordStr.value.slice(0, -1)
      nextTick(() => {
        pwdRefs.value[index - 1]?.focus()
      })
      e.preventDefault()
    }
  } else if (e.key === 'ArrowLeft' && index > 0) {
    nextTick(() => pwdRefs.value[index - 1]?.focus())
    e.preventDefault()
  } else if (e.key === 'ArrowRight' && index < 5) {
    nextTick(() => pwdRefs.value[index + 1]?.focus())
    e.preventDefault()
  }
}

const handlePwdFocus = (index: number) => {
  if (index !== passwordStr.value.length && passwordStr.value.length < 6) {
    nextTick(() => {
      pwdRefs.value[passwordStr.value.length]?.focus()
    })
  }
}

const verifyPassword = () => {
  const pwd = passwordStr.value
  if (pwd.length !== 6) return
  // 模拟：密码为 123456 时正确
  setTimeout(() => {
    if (pwd === '123456') {
      showPasswordModal.value = false
      showSuccess.value = true
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    } else {
      pwdError.value = '支付密码错误，请重新输入'
      passwordStr.value = ''
      nextTick(() => {
        pwdRefs.value[0]?.focus()
      })
    }
  }, 500)
}

const handleBack = () => {
  if (showSuccess.value) {
    router.push('/market')
  } else {
    router.back()
  }
}

const handleExpiredAction = () => {
  router.back()
}

// 模拟服务费
const serviceFee = computed(() => Math.floor(order.value.price * 0.01))
const totalPrice = computed(() => order.value.price + serviceFee.value)
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <!-- 顶部导航 -->
    <header class="relative z-50 flex h-12 items-center justify-between px-3 bg-white border-b border-ink-divider">
      <div class="flex w-12 items-center">
        <button
          type="button"
          @click="handleBack"
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm"
        >
          <ChevronLeft class="h-5 w-5 text-brand-magenta" :stroke-width="2.5" />
        </button>
      </div>
      <div class="flex-1 text-center text-base font-semibold text-ink-primary">待支付</div>
      <div class="flex w-12 items-center justify-end"></div>
    </header>

    <!-- 已过期状态 -->
    <main v-if="isExpired" class="flex flex-1 flex-col items-center justify-center px-6">
      <div class="flex h-20 w-20 items-center justify-center rounded-full" style="background: #FFF3E0">
        <AlertCircle class="h-10 w-10" style="color: #FF9500" />
      </div>
      <p class="mt-5 text-xl font-bold text-ink-primary">订单已取消</p>
      <p class="mt-2 text-sm text-ink-tertiary text-center">支付超时，藏品已释放</p>
      <button
        type="button"
        @click="handleExpiredAction"
        class="mt-8 h-11 w-48 rounded-lg text-base font-semibold text-white active:scale-95"
        style="background: #E91E63"
      >
        返回
      </button>
    </main>

    <!-- 支付成功状态 -->
    <main v-else-if="showSuccess" class="flex flex-1 flex-col items-center justify-center px-6">
      <div class="flex h-20 w-20 items-center justify-center rounded-full animate-flip-down" style="background: #E8F5E9">
        <CheckCircle class="h-10 w-10" style="color: #22C55E" />
      </div>
      <p class="mt-5 text-xl font-bold text-ink-primary">支付成功</p>
      <p class="mt-2 text-sm text-ink-tertiary">藏品已发送至您的账户</p>

      <div class="mt-6 w-full rounded-xl bg-white p-4 shadow-card">
        <div class="flex items-center gap-3">
          <img
            :src="collection.image"
            :alt="order.name"
            class="h-14 w-14 rounded-lg object-cover"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-ink-primary truncate">{{ order.name }}#{{ order.no }}</p>
            <p class="mt-0.5 text-xs text-ink-tertiary">编号 #{{ order.no }}</p>
          </div>
          <span class="text-lg font-bold text-brand-magenta">¥{{ order.price }}</span>
        </div>
      </div>

      <button
        type="button"
        @click="handleBack"
        class="mt-8 h-11 w-48 rounded-lg text-base font-semibold text-white active:scale-95"
        style="background: #E91E63"
      >
        完成
      </button>
    </main>

    <!-- 待支付内容 -->
    <main v-else class="flex-1 overflow-y-auto" style="padding-bottom: 100px">
      <!-- 倒计时 -->
      <div
        class="mx-4 mt-3 flex items-center justify-between rounded-xl px-4 py-3"
        :style="{
          background: isUrgent ? 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' : 'linear-gradient(135deg, #FFF0F0, #FFE0EC)',
        }"
      >
        <div class="flex items-center gap-2">
          <Clock class="h-5 w-5" :style="{ color: isUrgent ? '#FF6B00' : '#E91E63' }" />
          <span class="text-sm font-medium" :style="{ color: isUrgent ? '#FF6B00' : '#E91E63' }">
            支付剩余时间
          </span>
        </div>
        <span
          class="text-xl font-bold font-mono"
          :style="{ color: isUrgent ? '#FF4D4F' : '#E91E63' }"
        >
          {{ minutes }}:{{ seconds }}
        </span>
      </div>

      <!-- 订单信息 -->
      <div class="mx-4 mt-3 rounded-xl bg-white p-4 shadow-card">
        <div class="flex items-center gap-3">
          <img
            :src="collection.image"
            :alt="order.name"
            class="h-16 w-16 rounded-lg object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="text-base font-semibold text-ink-primary truncate">{{ order.name }}</p>
            <p class="mt-1 text-xs text-ink-tertiary">编号 #{{ order.no }}</p>
            <p class="mt-1 text-xs text-ink-tertiary">发行 {{ collection.issue }} · 流通 {{ collection.circulation }}</p>
          </div>
          <div class="flex-shrink-0 text-right">
            <p class="text-lg font-bold text-brand-magenta">¥{{ order.price }}</p>
          </div>
        </div>
      </div>

      <!-- 价格明细 -->
      <div class="mx-4 mt-3 rounded-xl bg-white p-4 shadow-card">
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-ink-secondary">藏品价格</span>
          <span class="text-sm font-medium text-ink-primary">¥{{ order.price }}</span>
        </div>
        <div class="flex items-center justify-between py-2" style="border-top: 1px solid #F5F5F5">
          <span class="text-sm text-ink-secondary">服务费</span>
          <span class="text-sm font-medium text-ink-primary">¥{{ serviceFee }}</span>
        </div>
        <div class="flex items-center justify-between py-2" style="border-top: 1px solid #F5F5F5">
          <span class="text-sm font-semibold text-ink-primary">实付金额</span>
          <span class="text-lg font-bold text-brand-magenta">¥{{ totalPrice }}</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="mx-4 mt-3 rounded-xl bg-white p-4 shadow-card">
        <p class="mb-3 text-sm font-semibold text-ink-primary">选择支付方式</p>
        <div class="flex flex-col gap-1">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            type="button"
            @click="selectedMethod = method.id"
            class="flex items-center gap-3 rounded-lg px-2 py-3 transition active:scale-[0.98]"
            :style="{
              backgroundColor: selectedMethod === method.id ? '#FFF0F0' : 'transparent',
            }"
          >
            <div
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
              :style="{ background: method.bgColor }"
            >
              {{ method.icon }}
            </div>
            <div class="flex-1 text-left">
              <p class="text-sm font-medium text-ink-primary">{{ method.name }}</p>
              <p class="mt-0.5 text-xs text-ink-tertiary">{{ method.desc }}</p>
            </div>
            <div
              class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition"
              :style="{
                borderColor: selectedMethod === method.id ? '#E91E63' : '#DDD',
                background: selectedMethod === method.id ? '#E91E63' : 'transparent',
              }"
            >
              <CheckCircle v-if="selectedMethod === method.id" class="h-3 w-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      <!-- 温馨提示 -->
      <div class="mx-4 mt-3 rounded-xl bg-white p-4 shadow-card">
        <p class="text-sm font-semibold text-ink-primary mb-2">温馨提示</p>
        <ul class="space-y-1.5 text-xs text-ink-tertiary leading-relaxed">
          <li>· 请在 5 分钟内完成支付，超时订单将自动取消并释放藏品</li>
          <li>· 支付成功后藏品将直接发放至您的数字资产账户</li>
          <li>· 数字藏品一经售出，不支持退换</li>
        </ul>
      </div>
    </main>

    <!-- 底部支付栏 -->
    <div
      v-if="!isExpired && !showSuccess"
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4 pt-3 bg-white z-50"
      style="max-width: 420px; box-shadow: 0 -2px 10px rgba(0,0,0,0.06)"
    >
      <div class="flex items-center gap-4">
        <div>
          <div class="text-xs text-ink-tertiary">实付金额</div>
          <div class="text-2xl font-bold text-brand-magenta">¥{{ totalPrice }}</div>
        </div>
        <button
          type="button"
          @click="openPasswordModal"
          class="flex-1 h-12 text-base font-semibold text-white active:scale-[0.98]"
          style="border-radius: 8px; background-color: #FF5A7D"
        >
          立即购买
        </button>
      </div>
    </div>

    <!-- 密码输入弹窗 -->
    <Teleport to="body">
      <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-end justify-center bg-black/40" @click.self="closePasswordModal">
        <div
          class="w-full rounded-t-3xl bg-white px-6 pb-8 pt-6"
          style="max-width: 420px; animation: slideUp 0.3s ease"
        >
          <div class="mb-2 flex items-center justify-between">
            <h3 class="text-lg font-bold text-ink-primary">输入支付密码</h3>
            <button type="button" @click="closePasswordModal" class="text-ink-tertiary text-sm">取消</button>
          </div>
          <p class="mb-6 text-sm text-ink-tertiary">
            支付 <span class="font-bold text-brand-magenta">¥{{ totalPrice }}</span> 至 {{ paymentMethods.find(m => m.id === selectedMethod)?.name }}
          </p>

          <div class="flex justify-between gap-2 mb-4">
            <input
              v-for="(digit, i) in passwordArr"
              :key="i"
              :ref="(el) => { pwdRefs[i] = el as HTMLInputElement | null }"
              type="password"
              inputmode="numeric"
              maxlength="6"
              :value="digit"
              @input="handlePwdInput(i, $event)"
              @keydown="handlePwdKeyDown(i, $event)"
              @focus="handlePwdFocus(i)"
              class="h-14 w-12 rounded-lg border-2 bg-white text-center text-xl font-bold text-ink-primary focus:outline-none transition"
              :style="{
                borderColor: pwdError
                  ? '#FF4D4F'
                  : digit
                    ? '#E91E63'
                    : i === activePwdIndex
                      ? '#888888'
                      : '#999999',
                boxShadow: digit
                  ? '0 0 0 1px #E91E63'
                  : i === activePwdIndex
                    ? '0 0 0 1px #888888'
                    : 'none',
                borderWidth: '2px',
              }"
            />
          </div>

          <p v-if="pwdError" class="mb-4 text-center text-sm text-fn-danger">{{ pwdError }}</p>

          <p class="text-center text-xs text-ink-tertiary">
            <ChevronRight class="inline h-3 w-3" />
            忘记密码？可在安全设置中修改
          </p>

          <div class="mt-4 rounded-lg px-4 py-2 text-center" style="background: #FFF8F0">
            <p class="text-xs text-ink-tertiary">
              演示密码：<span class="font-mono font-bold text-brand-magenta">123456</span>
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </PhoneFrame>
</template>
