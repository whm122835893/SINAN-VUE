<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  title?: any
  onBack?: () => void
  back?: boolean
  transparent?: boolean
  white?: boolean
  right?: any
  backBtnClass?: string
  backIconClass?: string
  className?: string
  sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  transparent: false,
  white: false,
  sticky: false,
})

const router = useRouter()

const handleBack = () => {
  if (props.onBack) {
    props.onBack()
  } else {
    router.back()
  }
}
</script>

<template>
  <header
    :class="cn(
      'relative z-50 flex h-12 items-center justify-between px-3',
      transparent ? 'bg-transparent' : white ? 'bg-white' : 'bg-transparent',
      sticky && 'sticky top-0',
      className,
    )"
  >
    <div class="flex w-12 items-center">
      <button
        v-if="back"
        type="button"
        @click="handleBack"
        aria-label="返回"
        :class="cn(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          backBtnClass ?? 'bg-white shadow-sm',
        )"
      >
        <ChevronLeft
          :class="cn('h-5 w-5', backIconClass ?? 'text-brand-magenta')"
          :stroke-width="2.5"
        />
      </button>
    </div>
    <div
      :class="cn(
        'flex-1 text-center text-base font-semibold',
        white ? 'text-white' : 'text-ink-primary',
      )"
    >
      <component :is="title" v-if="typeof title !== 'string'" />
      <template v-else>{{ title }}</template>
    </div>
    <div class="flex w-12 items-center justify-end">
      <component :is="right" v-if="right" />
    </div>
  </header>
</template>
