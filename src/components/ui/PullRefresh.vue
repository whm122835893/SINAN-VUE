<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  onRefresh: () => Promise<void>
}

const props = defineProps<Props>()

const isRefreshing = ref(false)
const showRefresh = ref(false)
const startY = ref(0)
const isPulling = ref(false)

const handleTouchStart = (e: TouchEvent) => {
  if (isRefreshing.value) return
  const target = e.target as HTMLElement
  const scrollable = target.closest('.scroll-container') as HTMLElement | null
  const scrollTop = scrollable?.scrollTop ?? 0
  if (scrollTop <= 0) {
    isPulling.value = true
    startY.value = e.touches[0].clientY
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isPulling.value || isRefreshing.value) return
  const currentY = e.touches[0].clientY
  const diff = currentY - startY.value
  if (diff > 60) {
    e.preventDefault()
    showRefresh.value = true
  }
}

const handleTouchEnd = async () => {
  if (!isPulling.value) return
  isPulling.value = false
  if (showRefresh.value && !isRefreshing.value) {
    isRefreshing.value = true
    await props.onRefresh()
    isRefreshing.value = false
    showRefresh.value = false
  } else {
    showRefresh.value = false
  }
}
</script>

<template>
  <div
    class="relative h-full overflow-y-auto scroll-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      v-if="showRefresh"
      class="absolute left-0 right-0 top-0 flex h-10 items-center justify-center"
      :style="{ zIndex: 100 }"
    >
      <div
        v-if="isRefreshing"
        class="h-5 w-5 animate-spin rounded-full border-2 border-brand-pink border-t-transparent"
      />
      <svg
        v-else
        class="h-5 w-5 text-brand-pink"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          :stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
    <slot />
  </div>
</template>
