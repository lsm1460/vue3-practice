<script setup lang="ts">
import { useWarring } from '@/composables/memberJoin'
import { ref } from 'vue'
import { MemberJoinProps } from '../../types'
import { checkPhoneNumber, checkUserName, getValidatedKeyList, makeFormData } from '../../utils'
import CommonButton from '../common/CommonButton.vue'
import WarringText from '../common/WarringText.vue'

const { isShow, moveToNextStep, moveToPrevStep } = defineProps<MemberJoinProps>()

const validator = {
  userName: checkUserName,
  phoneNumber: checkPhoneNumber,
  address: (_address: string) => !!_address,
  addressDetail: (_address: string) => !!_address,
} as const

const addressForm = ref(makeFormData<keyof typeof validator>(Object.keys(validator)))
const { warringKeys, warringInputs } = useWarring(validator, addressForm.value)

const nameInputElRef = ref<HTMLInputElement | null>(null)
const setUserName = (_event: Event) => {
  warringKeys.value['userName'] = false
  const _nameInputEl = nameInputElRef.value

  if (!_nameInputEl) {
    return
  }

  const _inputEl = _event.target as HTMLInputElement

  // only korean
  const regex = /^$|^[ㄱ-ㅎ|가-힣]+?$/

  if (regex.test(_inputEl.value)) {
    addressForm.value.userName.text = _inputEl.value.trim()
  }

  _nameInputEl.value = addressForm.value.userName.text

  addressForm.value.userName.isCorrectFormat = validator.userName(addressForm.value.userName.text)
}

const phoneInputElRef = ref<HTMLInputElement | null>(null)
const setPhone = (_event: Event) => {
  const _phoneInputEl = phoneInputElRef.value

  if (!_phoneInputEl) {
    return
  }

  const _inputEl = _event.target as HTMLInputElement

  // only number, - , ' '
  const regex = /^[0-9- ]*$/

  if (regex.test(_inputEl.value)) {
    const _val = _inputEl.value.replace(/  +/g, ' ').replace(/--+/g, '-')
    addressForm.value.phoneNumber.text = _val
  }

  _phoneInputEl.value = addressForm.value.phoneNumber.text

  // check validate
  addressForm.value.phoneNumber.isCorrectFormat = validator.phoneNumber(addressForm.value.phoneNumber.text)
}

const addressInputElRef = ref<HTMLInputElement | null>(null)
const addressModal = new window.daum.Postcode({
  oncomplete: function (data: any) {
    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.

    warringKeys.value['address'] = false
    const _inputEl = addressInputElRef.value as HTMLInputElement
    _inputEl.value = data.address
    addressForm.value.address.text = data.address
    addressForm.value.address.isCorrectFormat = true
  },
})
const openAddress = () => {
  addressModal.open()
}

const checkAddressDetail = () => {
  warringKeys.value['addressDetail'] = false

  addressForm.value.addressDetail.isCorrectFormat = !!addressForm.value.addressDetail
}

const moveNext = () => {
  const valueList = Object.values(addressForm.value).map((_val) => [_val.text])

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
  <div :style="{ display: isShow ? 'block' : 'none' }">
    <ul>
      <li>
        <label>
          이름
          <input
            name="name"
            type="text"
            ref="nameInputElRef"
            :value="addressForm.userName.text"
            @input="setUserName"
            placeholder="한글명"
          />
        </label>
        <WarringText :isShow="warringInputs['userName']" :text="'이름이 올바르지 않습니다.'" />
      </li>
      <li>
        <label>
          연락처
          <input
            name="phone"
            type="text"
            ref="phoneInputElRef"
            :value="addressForm.phoneNumber.text"
            @input="setPhone"
          />
        </label>
        <WarringText :isShow="warringInputs['phoneNumber']" :text="'전화번호 형식이 올바르지 않습니다.'" />
      </li>
      <li>
        <label>
          주소
          <button @click="openAddress" type="button">우편번호</button>
        </label>
        <ul>
          <li>
            <p>
              <input name="address" readonly ref="addressInputElRef" @click="openAddress" placeholder="주소" />
            </p>
            <WarringText :isShow="warringInputs['address']" :text="'주소를 입력해주시길 바랍니다.'" />
          </li>
          <li>
            <p>
              <input
                name="address-detail"
                v-model="addressForm.addressDetail.text"
                type="text"
                @input="checkAddressDetail"
                placeholder="상세 주소"
              />
            </p>
            <WarringText :isShow="warringInputs['addressDetail']" :text="'상세 주소를 입력해주시길 바랍니다.'" />
          </li>
        </ul>
      </li>
    </ul>

    <div>
      <CommonButton v-if="!!moveToPrevStep" text="이전" :onClick="moveToPrevStep" />
      <CommonButton text="다음" :onClick="moveNext" />
    </div>
  </div>
</template>
