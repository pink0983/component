<script setup>
import { reactive,ref } from 'vue'
import FormItem from '../../../src/components/From/FromItem.vue'
import Input from '../../../src/components/Input/Input.vue'
import Button from '../../../src/components/Button/Button.vue'
import From  from '../../../src/components/From/From.vue'
const model = reactive({
  email:'',
  password:'',
  test: ''
})
const rules = {
  email:[{type:'email',required:true,trigger:'blur'},{type:'string',required:true,trigger:'input'}],
  password:[{type:'string',required:true,trigger:'blur',min:3,mav:5}],
  test:[{type:'string',required:true,trigger:'blur'}],
}
const formRef = ref()
const submit = async () => {
  try{
    await formRef.value.validate()

  } catch(e){
    console.log(e)
  }
}
</script>
<template>
  <div>
    <From :model="model" :rules="rules" ref="formRef">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email"/>
      </FormItem>
      <FormItem label="the p assword" prop="password">
        <template #label=" {label}" >
            {{ label }}
        </template>
        <Input type="password" v-model="model.password"/>
      </FormItem>
      <FormItem label="原生input" prop="test">
        <template #default=" {validate}" >
            <input type="text" v-model="model.test" @blur="validate">
        </template>
      </FormItem>
    <div>
        <Button type="primary" @click.prevent="submit"> sumbit </Button>
        <Button> Reset </Button>
    </div>
    </From>
  </div>
</template>