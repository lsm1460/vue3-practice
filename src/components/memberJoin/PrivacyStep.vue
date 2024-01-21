<script setup lang="ts">
import { ref } from 'vue'
import { MemberJoinProps } from '../../types'
import CommonButton from '../common/CommonButton.vue'
import { checkEmail, checkPassword } from '../../utils'

const { isShow, moveStep } = defineProps<MemberJoinProps>()

const validator = {
  email: checkEmail,
  password: checkPassword,
  passwordConfirm: (_password: string, _passwordConfirm: string) => _password === _passwordConfirm,
} as const

const initForm = { text: '', isCorrectFormat: false }

const emailForm = ref({ ...initForm })
const checkEmailFormat = () => {
  emailForm.value.isCorrectFormat = validator.email(emailForm.value.text)
}

const passwordForm = ref({ ...initForm })
const checkPasswordFormat = () => {
  passwordForm.value.isCorrectFormat = validator.password(passwordForm.value.text)
}

const passwordConfirmForm = ref({ ...initForm })
const checkPasswordConfirm = (_event: Event) => {
  const _inputEl = _event.target as HTMLInputElement
  passwordConfirmForm.value.isCorrectFormat = passwordForm.value.text === _inputEl.value
}

const moveNext = () => {
  const valueList = [
    [emailForm.value.text],
    [passwordForm.value.text],
    [passwordForm.value.text, passwordConfirmForm.value.text],
  ]
  const validatorKeyList = Object.keys(validator)

  for (let _i = 0; _i < validatorKeyList.length; _i++) {
    const _key = validatorKeyList[_i] as keyof typeof validator

    const isChecker = validator[_key](...(valueList[_i] as [string, string]))

    if (!isChecker) {
      // you can do show what wrong with key..
      console.log(_key)
      return
    }
  }

  moveStep()
}
</script>

<template>
  <div :style="{ display: isShow ? 'block' : 'none' }">
    <ul>
      <li>
        <label>
          이메일
          <input name="email" type="text" v-model.trim="emailForm.text" @input="checkEmailFormat" />
        </label>
        <p v-if="emailForm.text && !emailForm.isCorrectFormat">이메일 형식이 올바르지 않습니다.</p>
      </li>
      <li>
        <label>
          비밀번호
          <input name="email" type="password" v-model.trim="passwordForm.text" @input="checkPasswordFormat" />
        </label>
        <p v-if="passwordForm.text && !passwordForm.isCorrectFormat">
          비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.
        </p>
      </li>
      <li>
        <label>
          비밀번호 확인
          <input type="password" v-model.trim="passwordConfirmForm.text" @input="checkPasswordConfirm" />
        </label>
        <p v-if="passwordConfirmForm.text && !passwordConfirmForm.isCorrectFormat">비밀번호가 일치하지 않습니다</p>
      </li>
    </ul>

    <CommonButton :onClick="moveNext" />
  </div>
</template>
