<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref,h ,onMounted} from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
import { createMessage } from './components/Message/methods'
// import Message from './components/Message/Message.vue'
const tooltipRef = ref<TooltipInstance | null>(null)
const size = ref<any>('3x')
const trigger = ref<any>('click')
const openedValue = ref(['a'])
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const buttonRef = ref<ButtonInstance | null>(null)
  const open = () => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
const inlineConsole = (...args: any) => {
  console.log(...args)
}
onMounted(() => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello world three', duration: 0, type: 'danger', showClose: true })
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
    // instance.destory()
    // trigger.value = 'hover'
  }, 2000)
})
</script>

<template>
  <header>
    <Tooltip placement="right" :trigger="trigger">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <template #content>
        <h1>I am tooltip</h1>
      </template>
    </Tooltip>
    <Dropdown 
      placement="bottom" 
      :trigger="trigger" 
      :menu-options="options"
      @visible-change="e => inlineConsole('visible change', e)"
      @select="e => inlineConsole('select', e)"
      manual
      ref="tooltipRef"
    >
    </Dropdown>
  </header>
  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d"/>
  <main>
   
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>
    <Button size="large" loading>Loading</Button>
    <!-- <Button size="large" icon="arrow-up">Icon</Button><br/><br/>    -->


    <Collapse v-model="openedValue">
      <Item name="a">
        <template #title>
          <h4 >First title</h4>
        </template>
        <h1>headline title</h1>
        <div> this is content  aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
  </main>
</template>

<style scoped>
header{
  line-height: 1.5;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
