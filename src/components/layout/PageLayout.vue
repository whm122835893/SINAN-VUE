<script setup lang="ts">
import PhoneFrame from './PhoneFrame.vue'

interface Props {
  bg?: string
}

withDefaults(defineProps<Props>(), {
  bg: 'bg-white',
})
</script>

<template>
  <PhoneFrame :bg="bg">
    <main class="no-scrollbar relative flex-1 overflow-y-auto">
      <slot />
    </main>
  </PhoneFrame>
</template>
