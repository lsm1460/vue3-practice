<script setup lang="ts">
const { isShow, text } = defineProps<{ isShow: boolean; text: string }>()
</script>

<template>
  <p v-if="isShow">{{ text }}</p>
</template>

<style scoped lang="scss">
p {
  font-size: 12px;
  color: rgb(217, 120, 120);
  margin-top: 5px;
}
</style>
