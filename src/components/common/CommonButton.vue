<script setup lang="ts">
const { onClick, text } = defineProps<{ onClick: () => void; text: string }>()
</script>

<template>
  <button @click="onClick" type="button">{{ text }}</button>
</template>
