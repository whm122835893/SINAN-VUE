<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useAttrs, computed } from 'vue'

interface Props {
  icon?: any
  title: any
  subtitle?: any
  right?: any
  showChevron?: boolean
  divider?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  showChevron: true,
  divider: true,
})

const emit = defineEmits<{
  click: []
}>()

const attrs = useAttrs()
const hasClickListener = computed(() => !!attrs.onClick)
</script>

<template>
  <div
    @click="emit('click')"
    :class="cn(
      'flex h-14 items-center gap-3 px-4',
      hasClickListener && 'cursor-pointer active:bg-surface-gray',
      divider && 'border-b border-ink-divider',
      className,
    )"
  >
    <div v-if="icon" class="flex-shrink-0">
      <component :is="icon" />
    </div>
    <div class="min-w-0 flex-1">
      <div class="text-sm font-medium text-ink-primary">
        <component :is="title" v-if="typeof title !== 'string'" />
        <template v-else>{{ title }}</template>
      </div>
      <div v-if="subtitle" class="mt-0.5 text-xs text-ink-tertiary">
        <component :is="subtitle" v-if="typeof subtitle !== 'string'" />
        <template v-else>{{ subtitle }}</template>
      </div>
    </div>
    <div v-if="right" class="flex-shrink-0">
      <component :is="right" />
    </div>
    <ChevronRight
      v-if="showChevron"
      class="h-4 w-4 text-ink-divider"
      :stroke-width="2.5"
    />
  </div>
</template>
