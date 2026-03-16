<template>
  <div class="step-indicator">
    <!-- Step 1 -->
    <div class="step-item">
      <div
        class="step-circle"
        :class="{
          active: currentStep === 1,
          completed: currentStep > 1
        }"
      >
        <span v-if="currentStep <= 1">1</span>
        <i v-else class="bi bi-check-lg"></i>
      </div>
      <span class="step-label" :class="{ active: currentStep === 1 }">Cadastro</span>
    </div>

    <!-- Connector -->
    <div class="step-connector" :class="{ completed: currentStep > 1 }"></div>

    <!-- Step 2 -->
    <div class="step-item">
      <div
        class="step-circle"
        :class="{
          active: currentStep === 2,
          completed: currentStep > 2
        }"
      >
        <span v-if="currentStep <= 2">2</span>
        <i v-else class="bi bi-check-lg"></i>
      </div>
      <span class="step-label" :class="{ active: currentStep === 2 }">
        Pagamento e Contrato
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ currentStep: number }>()
</script>
