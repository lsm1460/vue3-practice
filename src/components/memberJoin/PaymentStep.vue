<script setup lang="ts">
import { ref } from 'vue'
import { MemberJoinProps } from '../../types'
import CommonButton from '../common/CommonButton.vue'
import WarringText from '../common/WarringText.vue'

const { moveToNextStep } = defineProps<MemberJoinProps>()

const cardInputElRef = ref<HTMLInputElement[]>([])
const setInputList = (el: HTMLInputElement | null | any, index: number) => {
  if (el) {
    cardInputElRef.value[index] = el
  }
}

const cardNumber = ref(['', '', '', ''])
const isWarring = ref(false)
const updateValue = (_event: Event, _index: number) => {
  isWarring.value = false

  const _val = (_event.target as HTMLInputElement).value
  // only number
  const regex = /^[0-9]*$/

  if (regex.test(_val)) {
    cardNumber.value[_index] = _val
  }

  cardInputElRef.value[_index].value = cardNumber.value[_index]
}

const checkCardNumber = () => {
  const _sum = cardNumber.value
    .join('')
    .split('')
    .reduceRight((_acc, _cur, _i) => {
      if ((_i + 1) % 2) {
        // 짝
        let _double = parseInt(_cur, 10) * 2
        _double =
          _double >= 9 ? `${_double}`.split('').reduce((__acc, __cur) => __acc + parseInt(__cur, 10), 0) : _double

        return _acc + _double
      } else {
        // 홀
        return _acc + parseInt(_cur, 10)
      }
    }, 0)

  return _sum % 10 === 0
}

const moveNext = () => {
  const _isPass = checkCardNumber()

  if (_isPass) {
    moveToNextStep()
  } else {
    isWarring.value = true
  }
}
</script>

<template>
  <div class="step-area" v-bind:class="{ active: isShow }">
    <ul>
      <li>
        <label>
          카드번호
          <p class="card-number-wrap">
            <input
              v-for="(num, _i) in cardNumber"
              name="card"
              :key="_i"
              type="text"
              maxlength="4"
              :value="num"
              :ref="(el) => setInputList(el, _i)"
              @input="(_evt) => updateValue(_evt, _i)"
            />
          </p>
        </label>
        <WarringText :isShow="isWarring" :text="'잘못된 카드번호입니다.'" />
      </li>
    </ul>

    <div class="button-wrap">
      <CommonButton text="다음" :onClick="moveNext" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../mixin';

@include step-area-mixin;

.card-number-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  input {
    display: block;
    width: 23%;
  }
}
</style>
