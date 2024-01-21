<script setup lang="ts">
import { ref } from 'vue'

import { MEMBER_JOIN_STEP } from '../consts'
import { MemberJoinStepType } from '../types'
import PrivacyStep from '../components/memberJoin/PrivacyStep.vue'
import AddressStep from '../components/memberJoin/AddressStep.vue'
import PaymentStep from '../components/memberJoin/PaymentStep.vue'
import MemberJoinComplete from '@/components/memberJoin/MemberJoinComplete.vue'

const joinStep = ref<MemberJoinStepType>(0)
const joinForm = ref<HTMLFormElement | null>(null)
const joinComplete = ref({
  name: '',
  email: '',
  address: '',
  phone: '',
})
const showStep = (_joinStep: number, _step: number) => (_joinStep === _step ? true : false)
const moveToNextStep = async () => {
  if (!joinForm.value) {
    return
  }

  if (joinStep.value < MEMBER_JOIN_STEP.length - 2) {
    joinStep.value++
  } else {
    // prevent behavior if loading or fetching
    // show loading here

    try {
      const _form = new FormData(joinForm.value)

      // check value
      // for (let pair of _form.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }

      // do fetch post await

      // for join complete, save data
      joinComplete.value = {
        name: `${_form.get('name')?.toString()}`,
        email: `${_form.get('email')?.toString()}`,
        address: `${_form.get('address')?.toString()}`,
        phone: `${_form.get('phone')?.toString()}`,
      }
      // close loading

      // move to complete
      joinStep.value++
    } catch (e) {
      // handle error if you want..
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="step-wrap" v-if="joinStep < MEMBER_JOIN_STEP.length - 1">
      <form action="" ref="joinForm">
        <PrivacyStep :isShow="showStep(joinStep, 0)" :moveToNextStep="moveToNextStep" />
        <AddressStep
          :isShow="showStep(joinStep, 1)"
          :moveToNextStep="moveToNextStep"
          :moveToPrevStep="() => joinStep--"
        />
        <PaymentStep :isShow="showStep(joinStep, 2)" :moveToNextStep="moveToNextStep" />
      </form>
    </div>
    <MemberJoinComplete v-else :joinComplete="joinComplete" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  max-width: 350px;
  height: 100svh;
  max-height: 500px;
  background-color: rgb(241, 241, 241);
  margin: 0 auto;
  padding: 15px;

  .step-wrap,
  form {
    height: 100%;
  }
}
</style>
