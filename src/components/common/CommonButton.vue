<script setup lang="ts">
const { onClick } = defineProps<{ onClick: () => void }>()
</script>

<template>
  <button @click="onClick" type="button">다음</button>
</template>
