<template>
  <div 
  class="vk-form-item"
  :class="{
    'is-error':validateStatus.state === 'error',
    'is-success':validateStatus.state === 'success',
    'is-loading':validateStatus.loading,
    'is-required':isRequired
  }">
    <slot name="label"  :label="label">
        {{ label }}
    </slot>
    
    <div class="vk-form-item__content">
        <slot :validate="validate"></slot>
        <div class="vk-form-item__error-msg" v-if="validateStatus.state === 'error'">
          {{ validateStatus.errorMsg }}
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject , computed,reactive,provide,onMounted,onUnmounted} from "vue"
import type {FormItemProps,FromValidateFailure,FromItemContext} from './types'
import {fromContextKey,fromItemContextKey} from './types'
import {isNil} from 'lodash-es'
import Schema from 'async-validator'
defineOptions({
    name: 'VkFromItem'
})
const props = defineProps<FormItemProps>()

const fromContext = inject(fromContextKey)

const validateStatus = reactive({
  state: 'init',
  errorMsg: '',
  loading:false
})
let initialValue: any = null
const innerValue = computed(() => {
  const model = fromContext?.model
  // 对象中通过[]获取属性值，key是动态的，既可以是字符串也可以是数字
  if(model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
const itemRules = computed(() => {
  const rules = fromContext?.rules
  if(rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})
const getTriggeredRules = (trigger?:string) =>{
  const rules = itemRules.value
  if(rules){
    return rules.filter( rule => {
      if(!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
   } else {
      return []
    }
  }
const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})
const validate = async (trigger?: string) => {
  const modelName  = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length === 0){
    return true
  }
  if(modelName){
    const validator = new Schema({
      [modelName]:triggeredRules
    })
    validateStatus.loading = true
    return validator.validate({ [modelName]:innerValue.value})
    .then(() =>{
      validateStatus.state = 'success'
    }).catch((e:FromValidateFailure) => {
      const { errors } = e
      validateStatus.state = 'error'
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || ' ' : ' '
      return Promise.reject(e)
    })
    .finally( () => {
      validateStatus.loading = false
    })
  }

}
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}
const resetField = () => {
  clearValidate()
  const model = fromContext?.model
  if(model && props.prop && !isNil(model[props.prop])){
    model[props.prop] = initialValue
  }

}
const context: FromItemContext = {
  validate,
  prop:props.prop || ' ',
  clearValidate,
  resetField
} 
provide(fromItemContextKey,context)

onMounted(() => {
  if(props.prop){
    fromContext?.addField(context)
    initialValue = innerValue.value
  }
})
onUnmounted(() =>{
  fromContext?.removeField(context)
})
</script>

<style lang="scss" scoped></style>
