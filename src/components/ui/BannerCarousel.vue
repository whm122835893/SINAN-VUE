<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface BannerItem {
  bg: string
}

const BANNERS: BannerItem[] = [
  {
    bg: 'linear-gradient(135deg, #1A0A2E 0%, #6B2D5C 40%, #C04A6E 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
  },
]

interface Props {
  autoPlay?: boolean
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 3500,
})

const current = ref(0)
let timer: number | null = null

const goTo = (index: number) => {
  const len = BANNERS.length
  current.value = (((index % len) + len) % len)
}

const startTimer = () => {
  if (!props.autoPlay) return
  if (timer) window.clearInterval(timer)
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % BANNERS.length
  }, props.interval)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-2xl">
    <div
      class="flex transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div
        v-for="(banner, i) in BANNERS"
        :key="i"
        class="relative h-40 w-full flex-shrink-0"
        :style="{ background: banner.bg }"
      />
    </div>

    <div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
      <span
        v-for="(_, i) in BANNERS"
        :key="i"
        class="h-1.5 rounded-full transition-all"
        :class="i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/40'"
      />
    </div>
  </div>
</template>
