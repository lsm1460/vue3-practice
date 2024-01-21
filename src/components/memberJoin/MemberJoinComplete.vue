<script setup lang="ts">
const { joinComplete } = defineProps<{
  joinComplete: {
    name: string
    email: string
    address: string
    phone: string
  }
}>()
</script>

<template>
  <div>
    <h2>"{{ joinComplete.name }}"님,<br />회원 가입이<br />완료되었습니다.</h2>

    <ul>
      <li>
        이메일 : <a v-bind:href="`mailto:${joinComplete.email}`">{{ joinComplete.email }}</a>
      </li>

      <li>주소 : {{ joinComplete.address }}</li>
      <li>연락처 : {{ joinComplete.phone }}</li>
    </ul>
  </div>
</template>
