<script setup lang="ts">
const { onClick, text } = defineProps<{ onClick: () => void; text: string }>()
</script>

<template>
  <button @click="onClick" type="button">{{ text }}</button>
</template>

<style scoped lang="scss">
@import '../../mixin';

button {
  @include button-default;

  width: 100%;
}
</style>
