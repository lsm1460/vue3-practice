<script setup lang="ts">
import { MemberJoinProps } from '../../types'
defineProps<MemberJoinProps>()
</script>

<template>
  <div :style="{ display: isShow ? 'block' : 'none' }">payment</div>
</template>
