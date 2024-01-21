import { INPUT_FORM } from '@/consts'
import { ShallowRef, computed, ref } from 'vue'

export function useWarring<K extends string>(
  _validator: Record<K, (..._args: string[]) => boolean>,
  _inputForm: Record<K, typeof INPUT_FORM>
) {
  const warringKeys = ref(
    Object.keys(_validator).reduce((_acc, _cur) => ({ ..._acc, [_cur]: false }), {} as ShallowRef<Record<K, boolean>>)
  )

  const warringInputs = computed(() =>
    Object.keys(warringKeys.value).reduce((_acc, _cur) => {
      const _key = _cur as K

      return {
        ..._acc,
        [_cur]: warringKeys.value[_key] || (!!_inputForm[_key].text && !_inputForm[_key].isCorrectFormat),
      }
    }, {} as Record<K, boolean>)
  )

  return { warringKeys, warringInputs }
}
