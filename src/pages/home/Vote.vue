<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy, ThumbsUp, CheckCircle2 } from 'lucide-vue-next'
import PhoneFrame from '@/components/layout/PhoneFrame.vue'
import TopBar from '@/components/layout/TopBar.vue'

interface Collectible {
  id: number
  name: string
  creator: string
  votes: number
  cover: string
}

const COLLECTIBLES: Collectible[] = [
  {
    id: 1,
    name: '霓虹脉冲 #001',
    creator: '@DJ_Nova',
    votes: 1280,
    cover: 'linear-gradient(135deg, #FF6B9D, #C04A6E)',
  },
  {
    id: 2,
    name: '深海回响',
    creator: '@Wave_Lab',
    votes: 980,
    cover: 'linear-gradient(135deg, #2E8BFF, #0E1A2E)',
  },
  {
    id: 3,
    name: '复古节拍',
    creator: '@BeatMaster',
    votes: 2140,
    cover: 'linear-gradient(135deg, #FFB347, #FF6B35)',
  },
  {
    id: 4,
    name: '量子风暴',
    creator: '@SynthWave',
    votes: 670,
    cover: 'linear-gradient(135deg, #7B4DFF, #C04A6E)',
  },
]

const TOTAL_VOTES = COLLECTIBLES.reduce((sum, c) => sum + c.votes, 0)

const votedId = ref<number | null>(null)
const items = ref<Collectible[]>([...COLLECTIBLES])

const handleVote = (id: number) => {
  if (votedId.value !== null) return
  votedId.value = id
  items.value = items.value.map((item) =>
    item.id === id ? { ...item, votes: item.votes + 1 } : item
  )
}

const sorted = computed(() => [...items.value].sort((a, b) => b.votes - a.votes))
const votedItem = computed(() => items.value.find((i) => i.id === votedId.value))
const totalVotesWithUser = computed(() => TOTAL_VOTES + (votedId.value ? 1 : 0))

const getRankStyle = (rank: number) => {
  const bg =
    rank === 1
      ? '#FFD700'
      : rank === 2
      ? '#C0C0C0'
      : rank === 3
      ? '#CD7F32'
      : '#F5F5F5'
  const color = rank <= 3 ? '#FFF' : '#999'
  return { background: bg, color }
}
</script>

<template>
  <PhoneFrame bg="bg-surface-gray">
    <TopBar title="投票活动" />

    <main class="flex-1 overflow-y-auto pb-4">
      <section class="mx-4 mt-3">
        <div
          class="relative overflow-hidden rounded-2xl p-5"
          style="background: linear-gradient(135deg, #7B4DFF 0%, #C04A6E 100%)"
        >
          <div class="absolute -right-2 -top-2 opacity-20">
            <Trophy class="h-24 w-24 text-white" />
          </div>
          <p class="relative text-sm text-white/80">藏品人气投票</p>
          <h2 class="relative mt-1 text-2xl font-black text-white">
            为你喜爱的藏品打Call
          </h2>
          <p class="relative mt-2 text-xs text-white/70">
            投票截止：2026/07/31 23:59
          </p>
          <div class="relative mt-3 flex items-center gap-4">
            <div>
              <p class="text-lg font-bold text-white">{{ totalVotesWithUser }}</p>
              <p class="text-[10px] text-white/70">累计投票</p>
            </div>
            <div class="h-8 w-px bg-white/20" />
            <div>
              <p class="text-lg font-bold text-white">{{ COLLECTIBLES.length }}</p>
              <p class="text-[10px] text-white/70">参选藏品</p>
            </div>
            <div class="h-8 w-px bg-white/20" />
            <div>
              <p class="text-lg font-bold text-white">{{ votedId ? 1 : 0 }}/1</p>
              <p class="text-[10px] text-white/70">我的投票</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="votedItem" class="mx-4 mt-3">
        <div class="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3">
          <CheckCircle2 class="h-5 w-5 text-fn-success" />
          <p class="text-sm text-fn-success">
            投票成功！你已为「{{ votedItem.name }}」投票
          </p>
        </div>
      </section>

      <section class="mx-4 mt-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-base font-semibold text-ink-primary">人气排行</h3>
          <span class="text-xs text-ink-tertiary">按票数排序</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in sorted"
            :key="item.id"
            class="overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <div class="flex items-center gap-3 p-3">
              <div
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                :style="getRankStyle(idx + 1)"
              >
                {{ idx + 1 }}
              </div>

              <div
                class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
                :style="{ background: item.cover }"
              >
                <span class="text-xs font-bold text-white">#{{ item.id }}</span>
              </div>

              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-ink-primary">
                  {{ item.name }}
                </p>
                <p class="text-xs text-ink-tertiary">{{ item.creator }}</p>
                <div class="mt-1 flex items-center gap-2">
                  <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-gray">
                    <div
                      class="h-full rounded-full transition-all"
                      :style="{
                        width: `${Math.round((item.votes / totalVotesWithUser) * 100)}%`,
                        background: 'linear-gradient(90deg, #7B4DFF, #C04A6E)',
                      }"
                    />
                  </div>
                  <span class="text-[10px] text-ink-tertiary">
                    {{ Math.round((item.votes / totalVotesWithUser) * 100) }}%
                  </span>
                </div>
              </div>

              <div class="flex flex-shrink-0 flex-col items-center">
                <span
                  v-if="votedId === item.id"
                  class="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-fn-success"
                >
                  <CheckCircle2 class="h-3.5 w-3.5" />
                  已投
                </span>
                <button
                  v-else
                  type="button"
                  @click="handleVote(item.id)"
                  :disabled="votedId !== null"
                  class="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-95"
                  :class="votedId !== null ? 'bg-surface-gray text-ink-tertiary' : 'text-white'"
                  :style="votedId === null ? { background: 'linear-gradient(90deg, #7B4DFF, #C04A6E)' } : undefined"
                >
                  <ThumbsUp class="h-3.5 w-3.5" />
                  投票
                </button>
                <span class="mt-1 text-[10px] text-ink-tertiary">
                  {{ item.votes }}票
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-4 mt-6">
        <div class="rounded-2xl bg-white p-4 shadow-card">
          <h3 class="text-sm font-semibold text-ink-primary">活动规则</h3>
          <ul class="mt-2 space-y-1.5 text-xs text-ink-tertiary leading-relaxed">
            <li>· 每位用户仅有1次投票机会，投票后不可更改</li>
            <li>· 投票截止后，票数最高的藏品将获得限定奖励</li>
            <li>· 参与投票的用户可获得10钻石奖励</li>
            <li>· 严禁刷票行为，一经发现将取消资格</li>
          </ul>
        </div>
      </section>
    </main>
  </PhoneFrame>
</template>
