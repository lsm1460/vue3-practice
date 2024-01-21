<script setup lang="ts">
const { isShow, text } = defineProps<{ isShow: boolean; text: string }>()
</script>

<template>
  <p v-if="isShow">{{ text }}</p>
</template>
