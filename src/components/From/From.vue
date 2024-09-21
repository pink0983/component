<template>
  <form class="vk-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import type {ValidateFieldsError} from 'async-validator'
import type {FromContext, FromItemContext, FromProps,FromValidateFailure,FormInstance } from './types'
import {provide} from 'vue'
import {fromContextKey} from './types'
import { keys } from 'lodash-es';
defineOptions({
    name: 'VKForm'
})
const props = defineProps<FromProps>()

const fields: FromItemContext[] = []
const addField: FromContext['addField']  = (field) =>{
  fields.push(field)
}
const removeField:FromContext['removeField']  = (field) =>{
  if(field.prop){
    fields.splice(fields.indexOf(field),1)
  }
  
}
const resetFields = (keys: string[]=[]) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach( field => field.resetField());
}
const clearValidate = (keys: string[]=[]) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach( field => field.clearValidate());
}
const validate = async () => {
  let validationErrors:ValidateFieldsError = {}
  for (const field of fields){
    try{
      await field.validate('')
    } catch(e) {
      const error = e as FromValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}
provide(fromContextKey,{
  ...props,
  addField,
  removeField
})

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>

<style lang="scss" scoped></style>
