<script setup lang="ts">
import { ref } from 'vue'

import { MEMBER_JOIN_STEP } from '../consts'
import { MemberJoinStepType } from '../types'
import PrivacyStep from '../components/memberJoin/PrivacyStep.vue'
import AddressStep from '../components/memberJoin/AddressStep.vue'
import PaymentStep from '../components/memberJoin/PaymentStep.vue'

const joinStep = ref<MemberJoinStepType>(0)
const joinForm = ref<HTMLFormElement | null>(null)

const showStep = (_joinStep: number, _step: number) => (_joinStep === _step ? true : false)
const moveStep = () => {
  if (!joinForm.value) {
    return
  }

  if (joinStep.value < MEMBER_JOIN_STEP.length - 1) {
    joinStep.value++
  } else {
    // move to complete
    const _form = new FormData(joinForm.value)
    _form.get('email')
  }
}
</script>

<template>
  <div>
    <form action="" ref="joinForm">
      <PrivacyStep :isShow="showStep(joinStep, 0)" :moveStep="moveStep" />
      <AddressStep :isShow="showStep(joinStep, 1)" :moveStep="moveStep" />
      <PaymentStep :isShow="showStep(joinStep, 2)" :moveStep="moveStep" />
    </form>
  </div>
</template>

<style scoped lang="scss">
div {
  button {
    font-size: 20px;
  }
}
</style>
