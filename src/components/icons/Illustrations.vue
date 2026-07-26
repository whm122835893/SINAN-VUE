<script lang="ts">
import { cn } from '@/lib/utils'
import { computed, h, defineComponent } from 'vue'

interface GiftBoxProps {
  size?: number
  tone?: 'orange' | 'pink' | 'warm'
  withFloatIcons?: boolean
  className?: string
}

interface TreasureBoxProps {
  size?: number
  className?: string
}

interface AbstractBoxProps {
  size?: number
  tone?: 'pink' | 'orange'
  className?: string
}

interface OpenBoxProps {
  size?: number
  className?: string
}

interface DiamondDecorationProps {
  size?: number
  className?: string
}

interface AstronautProps {
  size?: number
  className?: string
}

interface GashaponMachineProps {
  className?: string
}

interface StarryOverlayProps {
  className?: string
}

interface QrPlaceholderProps {
  size?: number
  className?: string
}

const GiftBoxIllustration = defineComponent({
  name: 'GiftBoxIllustration',
  props: {
    size: { type: Number, default: 120 },
    tone: { type: String as () => 'orange' | 'pink' | 'warm', default: 'orange' },
    withFloatIcons: { type: Boolean, default: false },
    className: { type: String, default: '' },
  },
  setup(props: GiftBoxProps) {
    const colors = computed(() => {
      const colorMap = {
        orange: { box: '#FFB988', lid: '#FFC99A', band: '#FF8C44', shadow: '#FFD4B8' },
        pink: { box: '#FFB6C1', lid: '#FFC8D1', band: '#FF6B9D', shadow: '#FFE0EC' },
        warm: { box: '#FFCB99', lid: '#FFD6A8', band: '#FF7A45', shadow: '#FFE4C7' },
      }
      return colorMap[props.tone!]
    })

    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          props.withFloatIcons &&
            h('div', { class: 'absolute -right-2 top-2 animate-float text-xl', style: { animationDelay: '0.2s' } }, '🛒'),
          props.withFloatIcons &&
            h('div', { class: 'absolute -left-3 top-6 animate-float text-lg', style: { animationDelay: '0.6s' } }, '👍'),
          props.withFloatIcons &&
            h('div', { class: 'absolute right-0 bottom-4 animate-float text-base', style: { animationDelay: '1s' } }, '✨'),
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 120 120' },
            [
              h('ellipse', { cx: '60', cy: '108', rx: '32', ry: '6', fill: colors.value.shadow, opacity: '0.7' }),
              h('rect', { x: '28', y: '58', width: '64', height: '48', rx: '6', fill: colors.value.box, opacity: '0.95' }),
              h('rect', { x: '22', y: '44', width: '76', height: '18', rx: '6', fill: colors.value.lid, opacity: '0.95' }),
              h('path', { d: 'M60 44 C 50 36, 36 38, 36 50 C 36 58, 50 58, 60 50 Z', fill: colors.value.band, opacity: '0.95' }),
              h('path', { d: 'M60 44 C 70 36, 84 38, 84 50 C 84 58, 70 58, 60 50 Z', fill: colors.value.band, opacity: '0.95' }),
              h('circle', { cx: '60', cy: '50', r: '4', fill: colors.value.band }),
              h('rect', { x: '56', y: '58', width: '8', height: '48', fill: colors.value.band, opacity: '0.85' }),
              h('rect', { x: '32', y: '62', width: '14', height: '40', rx: '2', fill: 'rgba(255,255,255,0.4)' }),
            ]
          ),
        ]
      )
  },
})

const TreasureBoxIllustration = defineComponent({
  name: 'TreasureBoxIllustration',
  props: {
    size: { type: Number, default: 120 },
    className: { type: String, default: '' },
  },
  setup(props: TreasureBoxProps) {
    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 120 120' },
            [
              h('ellipse', { cx: '60', cy: '108', rx: '34', ry: '6', fill: '#FFE0B2', opacity: '0.7' }),
              h('rect', { x: '22', y: '60', width: '76', height: '42', rx: '6', fill: '#C97A4A' }),
              h('rect', { x: '22', y: '60', width: '76', height: '42', rx: '6', fill: 'url(#chestGrad)', opacity: '0.9' }),
              h('path', { d: 'M22 60 C 22 44, 98 44, 98 60 Z', fill: '#B86A3A' }),
              h('path', { d: 'M22 60 C 22 44, 98 44, 98 60 Z', fill: 'url(#lidGrad)', opacity: '0.9' }),
              h('rect', { x: '55', y: '44', width: '10', height: '58', fill: '#FFD700', opacity: '0.95' }),
              h('rect', { x: '22', y: '76', width: '76', height: '6', fill: '#FFD700', opacity: '0.7' }),
              h('circle', { cx: '60', cy: '78', r: '4', fill: '#FFD700' }),
              h('rect', { x: '30', y: '64', width: '10', height: '32', rx: '2', fill: 'rgba(255,255,255,0.35)' }),
              h('defs', [
                h('linearGradient', { id: 'chestGrad', x1: '0', x2: '0', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: '#FFB27A' }),
                  h('stop', { offset: '1', stopColor: '#C97A4A' }),
                ]),
                h('linearGradient', { id: 'lidGrad', x1: '0', x2: '0', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: '#FFC890' }),
                  h('stop', { offset: '1', stopColor: '#B86A3A' }),
                ]),
              ]),
            ]
          ),
        ]
      )
  },
})

const AbstractBoxIllustration = defineComponent({
  name: 'AbstractBoxIllustration',
  props: {
    size: { type: Number, default: 100 },
    tone: { type: String as () => 'pink' | 'orange', default: 'pink' },
    className: { type: String, default: '' },
  },
  setup(props: AbstractBoxProps) {
    const color = computed(() => (props.tone === 'pink' ? '#FFB6C1' : '#FFC99A'))

    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 100 100' },
            [
              h('ellipse', { cx: '50', cy: '88', rx: '26', ry: '4', fill: color.value, opacity: '0.4' }),
              h(
                'g',
                { opacity: '0.65' },
                [
                  h('path', { d: 'M50 18 L 80 34 V 66 L 50 82 L 20 66 V 34 Z', fill: color.value, opacity: '0.55' }),
                  h('path', { d: 'M50 18 L 80 34 L 50 50 L 20 34 Z', fill: color.value, opacity: '0.85' }),
                  h('path', { d: 'M20 34 L 50 50 V 82 L 20 66 Z', fill: color.value, opacity: '0.7' }),
                  h('path', { d: 'M80 34 L 50 50 V 82 L 80 66 Z', fill: color.value, opacity: '0.5' }),
                ]
              ),
              h('circle', { cx: '50', cy: '50', r: '3', fill: 'rgba(255,255,255,0.7)' }),
            ]
          ),
        ]
      )
  },
})

const OpenBoxIllustration = defineComponent({
  name: 'OpenBoxIllustration',
  props: {
    size: { type: Number, default: 120 },
    className: { type: String, default: '' },
  },
  setup(props: OpenBoxProps) {
    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 120 120' },
            [
              h('ellipse', { cx: '60', cy: '108', rx: '34', ry: '6', fill: '#FFC0CB', opacity: '0.5' }),
              h('polygon', { points: '20,55 60,40 100,55 60,70', fill: '#FFD8E0', opacity: '0.8' }),
              h('polygon', { points: '20,55 60,70 60,108 20,90', fill: '#FFB6C1', opacity: '0.75' }),
              h('polygon', { points: '100,55 60,70 60,108 100,90', fill: '#FFA8B8', opacity: '0.7' }),
              h('path', { d: 'M30 50 L 60 35 L 90 50', stroke: 'rgba(255,255,255,0.6)', strokeWidth: '2', fill: 'none' }),
              h('rect', { x: '55', y: '40', width: '10', height: '68', fill: 'rgba(255,255,255,0.3)' }),
            ]
          ),
        ]
      )
  },
})

const DiamondDecoration = defineComponent({
  name: 'DiamondDecoration',
  props: {
    size: { type: Number, default: 80 },
    className: { type: String, default: '' },
  },
  setup(props: DiamondDecorationProps) {
    return () =>
      h(
        'div',
        {
          class: cn('pointer-events-none absolute right-3 top-3 inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 80 80' },
            [
              h('defs', [
                h('linearGradient', { id: 'diaGrad', x1: '0', x2: '1', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: 'rgba(255,255,255,0.95)' }),
                  h('stop', { offset: '0.5', stopColor: 'rgba(255,255,255,0.5)' }),
                  h('stop', { offset: '1', stopColor: 'rgba(255,255,255,0.75)' }),
                ]),
              ]),
              h('polygon', { points: '40,8 70,28 40,72 10,28', fill: 'url(#diaGrad)', opacity: '0.6' }),
              h('polygon', { points: '40,8 70,28 40,40', fill: 'rgba(255,255,255,0.7)', opacity: '0.8' }),
              h('polygon', { points: '40,8 10,28 40,40', fill: 'rgba(255,255,255,0.4)' }),
              h('polygon', { points: '40,40 70,28 40,72', fill: 'rgba(255,255,255,0.3)' }),
            ]
          ),
        ]
      )
  },
})

const Astronaut = defineComponent({
  name: 'Astronaut',
  props: {
    size: { type: Number, default: 100 },
    className: { type: String, default: '' },
  },
  setup(props: AstronautProps) {
    return () =>
      h(
        'div',
        {
          class: cn('inline-block', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'svg',
            { width: props.size, height: props.size, viewBox: '0 0 100 100' },
            [
              h('defs', [
                h('radialGradient', { id: 'helmet', cx: '0.35', cy: '0.35' }, [
                  h('stop', { offset: '0', stopColor: '#FFFFFF', stopOpacity: '0.95' }),
                  h('stop', { offset: '0.6', stopColor: '#D8E6FF', stopOpacity: '0.8' }),
                  h('stop', { offset: '1', stopColor: '#7B9DC9', stopOpacity: '0.7' }),
                ]),
                h('linearGradient', { id: 'suit', x1: '0', x2: '0', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: '#FFFFFF' }),
                  h('stop', { offset: '1', stopColor: '#D0DCEC' }),
                ]),
              ]),
              h('ellipse', { cx: '50', cy: '68', rx: '22', ry: '24', fill: 'url(#suit)' }),
              h('rect', { x: '42', y: '58', width: '16', height: '14', rx: '2', fill: '#FF5A7D', opacity: '0.85' }),
              h('circle', { cx: '50', cy: '38', r: '22', fill: 'url(#suit)' }),
              h('circle', { cx: '50', cy: '38', r: '17', fill: 'url(#helmet)' }),
              h('circle', { cx: '44', cy: '33', r: '5', fill: 'rgba(255,255,255,0.85)' }),
              h('line', { x1: '50', y1: '16', x2: '50', y2: '10', stroke: '#FF5A7D', strokeWidth: '2' }),
              h('circle', { cx: '50', cy: '8', r: '3', fill: '#FFD700' }),
              h('ellipse', { cx: '28', cy: '65', rx: '6', ry: '14', fill: 'url(#suit)', transform: 'rotate(-20 28 65)' }),
              h('ellipse', { cx: '72', cy: '65', rx: '6', ry: '14', fill: 'url(#suit)', transform: 'rotate(20 72 65)' }),
              h('ellipse', { cx: '42', cy: '92', rx: '6', ry: '3', fill: '#9CB3CC' }),
              h('ellipse', { cx: '58', cy: '92', rx: '6', ry: '3', fill: '#9CB3CC' }),
            ]
          ),
        ]
      )
  },
})

const GashaponMachine = defineComponent({
  name: 'GashaponMachine',
  props: {
    className: { type: String, default: '' },
  },
  setup(props: GashaponMachineProps) {
    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block', props.className),
        },
        [
          h(
            'svg',
            { width: '220', height: '260', viewBox: '0 0 220 260' },
            [
              h('defs', [
                h('linearGradient', { id: 'bodyRed', x1: '0', x2: '0', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: '#E63946' }),
                  h('stop', { offset: '1', stopColor: '#9D1F2B' }),
                ]),
                h('radialGradient', { id: 'glassBall', cx: '0.35', cy: '0.35' }, [
                  h('stop', { offset: '0', stopColor: 'rgba(255,255,255,0.7)' }),
                  h('stop', { offset: '0.5', stopColor: 'rgba(200,220,255,0.4)' }),
                  h('stop', { offset: '1', stopColor: 'rgba(120,160,200,0.55)' }),
                ]),
                h('linearGradient', { id: 'goldMetal', x1: '0', x2: '0', y1: '0', y2: '1' }, [
                  h('stop', { offset: '0', stopColor: '#FFD700' }),
                  h('stop', { offset: '0.5', stopColor: '#FFCC33' }),
                  h('stop', { offset: '1', stopColor: '#E0A020' }),
                ]),
              ]),
              h('circle', { cx: '110', cy: '80', r: '60', fill: 'url(#glassBall)', stroke: 'rgba(255,255,255,0.5)', strokeWidth: '2' }),
              h('circle', { cx: '90', cy: '95', r: '14', fill: '#FFB6C1', opacity: '0.95' }),
              h('circle', { cx: '120', cy: '105', r: '13', fill: '#FFD700', opacity: '0.95' }),
              h('circle', { cx: '100', cy: '115', r: '12', fill: '#87CEEB', opacity: '0.95' }),
              h('circle', { cx: '135', cy: '80', r: '11', fill: '#FF9F80', opacity: '0.95' }),
              h('circle', { cx: '85', cy: '80', r: '10', fill: '#C8A6FF', opacity: '0.95' }),
              h('ellipse', { cx: '92', cy: '62', rx: '14', ry: '8', fill: 'rgba(255,255,255,0.7)' }),
              h('path', { d: 'M50 140 H 170 V 230 Q 170 245, 155 245 H 65 Q 50 245, 50 230 Z', fill: 'url(#bodyRed)' }),
              h('rect', { x: '50', y: '138', width: '120', height: '8', fill: 'url(#goldMetal)' }),
              h('rect', { x: '90', y: '195', width: '40', height: '30', rx: '6', fill: '#1A0508', stroke: 'url(#goldMetal)', strokeWidth: '2' }),
              h('circle', { cx: '155', cy: '175', r: '10', fill: 'url(#goldMetal)' }),
              h('rect', { x: '153', y: '185', width: '4', height: '10', fill: '#1A0508' }),
              h('rect', { x: '60', y: '160', width: '14', height: '14', rx: '2', fill: 'rgba(255,255,255,0.18)' }),
              h('rect', { x: '146', y: '160', width: '14', height: '14', rx: '2', fill: 'rgba(255,255,255,0.18)' }),
            ]
          ),
        ]
      )
  },
})

const StarryOverlay = defineComponent({
  name: 'StarryOverlay',
  props: {
    className: { type: String, default: '' },
  },
  setup(props: StarryOverlayProps) {
    const stars = Array.from({ length: 30 }).map((_, i) => ({
      top: `${(i * 37) % 100}%`,
      left: `${(i * 53) % 100}%`,
      size: (i % 3) + 1,
      delay: `${(i % 5) * 0.4}s`,
    }))

    return () =>
      h(
        'div',
        {
          class: cn('pointer-events-none absolute inset-0 overflow-hidden', props.className),
        },
        stars.map((s, i) =>
          h('span', {
            key: i,
            class: 'absolute rounded-full bg-white animate-twinkle',
            style: { top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay },
          })
        )
      )
  },
})

const QrPlaceholder = defineComponent({
  name: 'QrPlaceholder',
  props: {
    size: { type: Number, default: 120 },
    className: { type: String, default: '' },
  },
  setup(props: QrPlaceholderProps) {
    const cells = Array.from({ length: 144 }).map((_, i) => (i * 37 + (i % 7)) % 3 === 0)

    return () =>
      h(
        'div',
        {
          class: cn('relative inline-block rounded-2xl bg-white p-3', props.className),
          style: { width: props.size, height: props.size },
        },
        [
          h(
            'div',
            { class: 'grid h-full w-full grid-cols-12 gap-[1px]' },
            cells.map((on, i) =>
              h('div', {
                key: i,
                class: on ? 'bg-black' : 'bg-white',
              })
            )
          ),
          h(
            'div',
            { class: 'absolute left-2 top-2 h-5 w-5 rounded-sm border-[3px] border-black' },
            [h('div', { class: 'm-auto h-2 w-2 rounded-full bg-black' })]
          ),
          h(
            'div',
            { class: 'absolute right-2 top-2 h-5 w-5 rounded-sm border-[3px] border-black' },
            [h('div', { class: 'm-auto h-2 w-2 rounded-full bg-black' })]
          ),
          h(
            'div',
            { class: 'absolute bottom-2 left-2 h-5 w-5 rounded-sm border-[3px] border-black' },
            [h('div', { class: 'm-auto h-2 w-2 rounded-full bg-black' })]
          ),
        ]
      )
  },
})

export {
  GiftBoxIllustration,
  TreasureBoxIllustration,
  AbstractBoxIllustration,
  OpenBoxIllustration,
  DiamondDecoration,
  Astronaut,
  GashaponMachine,
  StarryOverlay,
  QrPlaceholder,
}
</script>

<template></template>
