import { INPUT_FORM } from './consts'

export const checkEmail = (_email: string) => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return reg.test(_email)
}

export const checkPassword = (_password: string) => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  return reg.test(_password)
}

export const checkUserName = (_userName: string) => {
  if (_userName.length < 2) return false

  for (let i = 0; i < _userName.length; i++) {
    if (_userName.charAt(i) < '가' || _userName.charAt(i) > '힣') {
      return false
    }
  }

  return true
}

export const checkPhoneNumber = (_phone: string) => {
  const reg = /^0\d{2}(-|\s)?\d{3,4}(-|\s)?\d{4}$/

  return reg.test(_phone)
}

export const getValidatedKeyList = (
  _validator: { [_key: string]: (...args: string[]) => boolean },
  _valueList: string[][]
) => {
  const validatorKeyList = Object.keys(_validator)

  return validatorKeyList.filter((_key, _i) => !_validator[_key](..._valueList[_i]))
}

export const makeFormData = <K extends string>(_keyList: (K | string)[]) => {
  return _keyList.reduce((_acc, _cur) => ({ ..._acc, [_cur]: { ...INPUT_FORM } }), {} as Record<K, typeof INPUT_FORM>)
}
