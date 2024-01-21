<script setup lang="ts">
import { ref } from 'vue'
import { useWarring } from '../../composables/memberJoin'
import { MemberJoinProps } from '../../types'
import { checkEmail, checkPassword, getValidatedKeyList, makeFormData } from '../../utils'
import CommonButton from '../common/CommonButton.vue'
import WarringText from '../common/WarringText.vue'

const { isShow, moveToNextStep } = defineProps<MemberJoinProps>()

const validator = {
  email: checkEmail,
  password: checkPassword,
  passwordConfirm: (_passwordConfirm: string, _password: string) => !!_password && _password === _passwordConfirm,
} as const

const privacyForm = ref(makeFormData<keyof typeof validator>(Object.keys(validator)))
const { warringKeys, warringInputs } = useWarring<keyof typeof validator>(validator, privacyForm.value)

const checkForm = (_keyType: keyof typeof validator) => {
  warringKeys.value[_keyType] = false

  let _param = [privacyForm.value[_keyType].text]
  if (_keyType === 'passwordConfirm') {
    _param.push(privacyForm.value['password'].text)
  }

  privacyForm.value[_keyType].isCorrectFormat = validator[_keyType](...(_param as [string, string]))
}

const moveNext = () => {
  const valueList = [
    [privacyForm.value.email.text],
    [privacyForm.value.password.text],
    [privacyForm.value.passwordConfirm.text, privacyForm.value.password.text],
  ]

  const _keyList = getValidatedKeyList(validator, valueList)

  if (_keyList.length < 1) {
    moveToNextStep()
  } else {
    warringKeys.value = {
      ...warringKeys.value,
      ..._keyList.reduce((_acc, _cur) => ({ ..._acc, [_cur]: true }), {}),
    }
  }
}
</script>

<template>
  <div class="step-area" v-bind:class="{ active: isShow }">
    <ul>
      <li class="list-item">
        <label>
          이메일
          <input
            name="email"
            type="text"
            v-model.trim="privacyForm.email.text"
            @keypress.space="(_evt) => _evt.preventDefault()"
            @input="() => checkForm('email')"
          />
        </label>
        <WarringText :isShow="warringInputs['email']" :text="'이메일 형식이 올바르지 않습니다.'" />
      </li>
      <li class="list-item">
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            v-model.trim="privacyForm.password.text"
            @input="() => checkForm('password')"
          />
        </label>
        <WarringText
          :isShow="warringInputs['password']"
          :text="'비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.'"
        />
      </li>
      <li class="list-item">
        <label>
          비밀번호 확인
          <input
            type="password"
            v-model.trim="privacyForm.passwordConfirm.text"
            @input="() => checkForm('passwordConfirm')"
          />
        </label>
        <WarringText :isShow="warringInputs['passwordConfirm']" :text="'비밀번호가 일치하지 않습니다.'" />
      </li>
    </ul>

    <div class="button-wrap">
      <CommonButton :onClick="moveNext" text="다음" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../mixin';

@include list-item-mixin;
@include step-area-mixin;
</style>
