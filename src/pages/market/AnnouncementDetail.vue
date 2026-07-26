<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Calendar, Share2, Heart } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

const ANNOUNCES = [
  {
    id: '1',
    title: '【司南博物运营公告】关于司南博物平台数字资产迁移说明',
    tag: '运营公告',
    time: '2026/07/04 10:26:29',
    cover: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    content: `尊敬的司南博物用户：

为了提升平台服务质量，优化用户体验，司南博物平台将于近期进行数字资产迁移工作。

迁移时间安排：
- 开始时间：2026年7月10日 00:00
- 预计完成：2026年7月12日 24:00

迁移期间，平台将暂停以下服务：
1. 数字藏品的购买和交易
2. 盲盒发售活动
3. 用户之间的藏品转赠

请各位用户提前做好准备，如有疑问请联系客服。

感谢您的理解与支持！

司南博物运营团队
2026年7月4日`,
  },
  {
    id: '2',
    title: '【司南博物运营公告】司南博物·焕新升级进展',
    tag: '运营公告',
    time: '2026/07/01 12:30:09',
    cover: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    content: `尊敬的司南博物用户：

司南博物平台焕新升级工作正在顺利推进中，预计于7月中旬完成全部升级内容。

本次升级内容包括：
1. 全新UI界面设计
2. 优化的交易流程
3. 新增社区互动功能
4. 更完善的安全保障体系

升级期间，我们将保持平台正常运营，确保用户资产安全。

敬请期待全新的司南博物！

司南博物运营团队
2026年7月1日`,
  },
]

const route = useRoute()
const announce = computed(() => ANNOUNCES.find((a) => a.id === route.params.id) || ANNOUNCES[0])
</script>

<template>
  <PhoneFrame bg="bg-white">
    <TopBar title="" />
    <main class="flex-1 overflow-y-auto pb-6">
      <div
        class="mx-4 mt-2 h-40 w-auto"
        :style="{
          borderRadius: '12px',
          background: announce.cover,
        }"
      />

      <div class="mx-4 mt-4 rounded-xl bg-white p-4 shadow-card">
        <h1 class="text-lg font-bold text-ink-primary">{{ announce.title }}</h1>
        <div class="mt-3 flex items-center gap-3">
          <span
            class="rounded px-2 py-0.5 text-xs font-medium"
            style="color: #E91E63; background: #FFE0EC; border-radius: 4px"
          >
            {{ announce.tag }}
          </span>
          <span class="flex items-center gap-1 text-xs text-ink-tertiary">
            <Calendar class="h-3 w-3" />
            {{ announce.time }}
          </span>
        </div>
        <div class="mt-4 space-y-3 text-sm text-ink-primary leading-relaxed whitespace-pre-line">
          {{ announce.content }}
        </div>
      </div>

      <div class="mt-4 flex justify-center gap-6">
        <button
          type="button"
          class="flex items-center gap-2 rounded-full bg-surface-gray px-4 py-2 text-sm text-ink-secondary"
        >
          <Share2 class="h-4 w-4" />
          分享
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-full bg-surface-gray px-4 py-2 text-sm text-ink-secondary"
        >
          <Heart class="h-4 w-4" />
          收藏
        </button>
      </div>
    </main>
  </PhoneFrame>
</template>
