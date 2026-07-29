<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { X, CheckCircle } from 'lucide-vue-next'

interface Props {
  visible: boolean
  collectionName?: string
  collectionImage?: string
  collectionNo?: string
  suggestPrice?: number
}

const props = withDefaults(defineProps<Props>(), {
  collectionName: '',
  collectionImage: '',
  collectionNo: '',
  suggestPrice: 0,
})

const emit = defineEmits<{
  close: []
  success: [price: number]
}>()

const price = ref('')
const passwordStr = ref('')
const pwdRefs = ref<(HTMLInputElement | null)[]>([])
const error = ref('')
const loading = ref(false)
const showSuccess = ref(false)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      price.value = ''
      passwordStr.value = ''
      error.value = ''
      showSuccess.value = false
      nextTick(() => {
        pwdRefs.value[0]?.focus()
      })
    }
  },
)

const passwordArr = computed(() => {
  const arr = passwordStr.value.split('')
  while (arr.length < 6) arr.push('')
  return arr.slice(0, 6)
})

const activeIndex = computed(() => Math.min(passwordStr.value.length, 5))

const handlePwdInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const inputVal = target.value.replace(/\D/g, '')

  if (!inputVal) {
    // 全部清空
    passwordStr.value = passwordStr.value.slice(0, index)
    nextTick(() => {
      target.value = ''
      pwdRefs.value[Math.min(index, 5)]?.focus()
    })
    return
  }

  // 新输入的字符
  const newChars = inputVal.split('')
  // 将新字符从当前位置插入
  const before = passwordStr.value.slice(0, index)
  const after = passwordStr.value.slice(index + newChars.length)
  const combined = (before + newChars.join('') + after).slice(0, 6)
  passwordStr.value = combined

  error.value = ''
  target.value = ''

  nextTick(() => {
    const nextIdx = Math.min(combined.length, 5)
    if (combined.length < 6) {
      pwdRefs.value[nextIdx]?.focus()
    } else {
      (document.activeElement as HTMLElement)?.blur()
    }
  })
}

const handlePwdKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace') {
    if (index > 0 && !passwordStr.value[index]) {
      // 当前位置为空，删除上一个
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
  // 聚焦时自动将光标调整到当前实际长度的位置
  if (index !== passwordStr.value.length && passwordStr.value.length < 6) {
    nextTick(() => {
      pwdRefs.value[passwordStr.value.length]?.focus()
    })
  }
}

const handleSubmit = () => {
  const priceNum = parseFloat(price.value)
  if (!price.value || isNaN(priceNum) || priceNum <= 0) {
    error.value = '请输入有效的寄售价格'
    return
  }
  const pwd = passwordStr.value
  if (pwd.length !== 6) {
    error.value = '请输入6位交易密码'
    return
  }

  loading.value = true
  // 模拟验证：密码为 123456 时正确
  setTimeout(() => {
    loading.value = false
    if (pwd === '123456') {
      showSuccess.value = true
      emit('success', priceNum)
      setTimeout(() => {
        emit('close')
      }, 1800)
    } else {
      error.value = '交易密码错误，请重新输入'
      passwordStr.value = ''
      nextTick(() => {
        pwdRefs.value[0]?.focus()
      })
    }
  }, 600)
}

const handlePriceInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  // 只允许数字和小数点，最多两位小数
  const filtered = val.replace(/[^\d.]/g, '').replace(/(\.\d{2}).+$/, '$1')
  price.value = filtered
}

// 手续费 3%，向下取两位小数
const feePercent = 0.03
const consignFee = computed(() => {
  const p = parseFloat(price.value) || 0
  return Math.floor(p * feePercent * 100) / 100
})
// 实际到手
const actualReceive = computed(() => {
  const p = parseFloat(price.value) || 0
  return Math.floor((p - consignFee.value) * 100) / 100
})

const handleClose = () => {
  if (loading.value) return
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-end justify-center bg-black/40" @click.self="handleClose">
      <!-- 成功状态 -->
      <div
        v-if="showSuccess"
        class="w-full rounded-t-3xl bg-white px-6 pb-8 pt-8"
        style="max-width: 420px; animation: slideUp 0.3s ease"
      >
        <div class="flex flex-col items-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-full animate-flip-down" style="background: #E8F5E9">
            <CheckCircle class="h-9 w-9" style="color: #22C55E" />
          </div>
          <p class="mt-4 text-lg font-bold text-ink-primary">寄售成功</p>
          <p class="mt-2 text-sm text-ink-tertiary">藏品已上架至挂单列表</p>
        </div>
      </div>

      <!-- 表单状态 -->
      <div
        v-else
        class="relative w-full rounded-t-3xl bg-white px-6 pb-8 pt-6"
        style="max-width: 420px; animation: slideUp 0.3s ease"
      >
        <button
          type="button"
          @click="handleClose"
          class="absolute right-4 top-4 z-10 text-ink-tertiary"
          aria-label="关闭"
        >
          <X class="h-6 w-6" />
        </button>

        <h3 class="text-lg font-bold text-ink-primary mb-5">寄售藏品</h3>

        <!-- 藏品信息 -->
        <div class="flex items-center gap-3 mb-5">
          <img
            v-if="collectionImage"
            :src="collectionImage"
            :alt="collectionName"
            class="h-14 w-14 rounded-lg object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-ink-primary truncate">{{ collectionName }}</p>
            <p v-if="collectionNo" class="mt-0.5 text-xs text-ink-tertiary">编号 {{ collectionNo }}</p>
          </div>
        </div>

        <!-- 价格输入 -->
        <div class="mb-5">
          <label class="mb-2 block text-sm font-medium text-ink-primary">寄售价格</label>
          <div class="flex items-center rounded-lg border border-ink-divider bg-white px-4 h-12">
            <span class="text-base font-semibold text-ink-primary mr-1">¥</span>
            <input
              type="text"
              inputmode="decimal"
              placeholder="请输入寄售价格"
              :value="price"
              @input="handlePriceInput"
              class="flex-1 h-full text-base placeholder:text-ink-tertiary"
            />
          </div>
          <p v-if="suggestPrice > 0" class="mt-1.5 text-xs text-ink-tertiary">
            建议价格：¥{{ suggestPrice }} · 当前市场最低价
          </p>

          <!-- 手续费明细 -->
          <div class="mt-3 rounded-lg px-4 py-3" style="background: #FFF8F0">
            <div class="flex items-center justify-between py-1">
              <span class="text-sm text-ink-secondary">寄售价格</span>
              <span class="text-sm font-medium text-ink-primary">¥{{ price || '0.00' }}</span>
            </div>
            <div class="flex items-center justify-between py-1" style="border-top: 1px dashed #F0E0C8; margin-top: 4px; padding-top: 8px">
              <span class="text-sm text-ink-secondary">平台手续费 (3%)</span>
              <span class="text-sm font-medium text-fn-danger">- ¥{{ consignFee.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between py-1 mt-1">
              <span class="text-sm font-semibold text-ink-primary">实际到手</span>
              <span class="text-lg font-bold text-brand-magenta">¥{{ actualReceive.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- 交易密码 -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-ink-primary">交易密码</label>
          <div class="flex justify-between gap-2">
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
              class="h-12 w-12 rounded-lg border-2 bg-white text-center text-lg font-bold text-ink-primary focus:outline-none transition"
              :style="{
                borderColor: error
                  ? '#FF4D4F'
                  : digit
                    ? '#E91E63'
                    : i === activeIndex
                      ? '#888888'
                      : '#999999',
                boxShadow: digit ? '0 0 0 1px #E91E63' : i === activeIndex ? '0 0 0 1px #888888' : 'none',
                borderWidth: '2px',
              }"
            />
          </div>
        </div>

        <p v-if="error" class="mb-3 text-sm text-fn-danger">{{ error }}</p>

        <!-- 演示提示 -->
        <div class="mb-5 rounded-lg px-4 py-2 text-center" style="background: #FFF8F0">
          <p class="text-xs text-ink-tertiary">
            演示密码：<span class="font-mono font-bold text-brand-magenta">123456</span>
          </p>
        </div>

        <!-- 提交按钮 -->
        <button
          type="button"
          @click="handleSubmit"
          :disabled="loading"
          class="h-12 w-full rounded-lg text-base font-semibold text-white active:scale-95 disabled:opacity-60"
          style="background: #E91E63"
        >
          {{ loading ? '提交中...' : '确认寄售' }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
