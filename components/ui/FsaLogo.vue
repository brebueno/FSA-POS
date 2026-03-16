<template>
  <div class="fsa-logo-wrap" :style="{ '--logo-size': size }">
    <svg
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="fsa-logo-icon"
    >
      <defs>
        <linearGradient id="diamondGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0A2463" />
          <stop offset="100%" stop-color="#1a3d8a" />
        </linearGradient>
        <linearGradient id="diamondBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38B6FF" />
          <stop offset="100%" stop-color="#1E9FE8" />
        </linearGradient>
      </defs>
      <!-- Diamond shape -->
      <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="url(#diamondGrad)" />
      <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="url(#diamondBorder)" stroke-width="1.5" />
      <!-- S lettermark -->
      <path
        d="M18 19 C18 16.5 20 15 24 15 C28 15 30 16.8 30 19.5 C30 22 28 23 24 24 C20 25 18 26.5 18 29 C18 31.8 20 33 24 33 C28 33 30 31.2 30 29"
        stroke="#38B6FF"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />
    </svg>

    <div v-if="showText" class="fsa-logo-text">
      <span class="fsa-logo-top">FACULDADE</span>
      <span class="fsa-logo-bottom">SANTO ANTÔNIO</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: String, default: 'md' },
  showText: { type: Boolean, default: true }
})

const iconSize = computed(() => {
  const sizes: Record<string, number> = { sm: 32, md: 40, lg: 52, xl: 64 }
  return sizes[props.size] || 40
})
</script>

<style scoped>
.fsa-logo-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  user-select: none;
}
.fsa-logo-icon { flex-shrink: 0; }
.fsa-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.fsa-logo-top {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #38B6FF;
}
.fsa-logo-bottom {
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #FFFFFF;
}
</style>
