<template>
  <div
  class="vk-select"
  :class="{'is-disabled': disabled }"
  @click="toggleDropdown"
  @mouseenter="states.mouseHover = true"
  @mouseleave="states.mouseHover = false"
>
  <Tooltip
    placement="bottom-start"
    ref="tooltipRef"
    :popperOptions="popperOptions"
    @click-outside="controlDropdown(false)"
    manual
  >
    <Input 
      v-model="states.inputValue"
      :disabled="disabled"
      :placeholder="filteredPlaceholder"
      ref="inputRef"
      :readonly="!filterable || !isDropdownShow"
      @input="onFilter"
    >
      <template #suffix>
        <Icon icon="circle-xmark" v-if="showClearIcon" class="vk-input__clear"  @mousedown.prevent="NOOP" @click.stop="onClear"></Icon>
        <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }"/>
      </template>
    </Input>
    <template #content>
      <ul class="vk-select__menu">
        <template v-for="(item, index) in filteredOptions" :key="index">
          <li 
            class="vk-select__menu-item"
            :class="{'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
            :id="`select-item-${item.value}`"
            @click.stop="itemSelect(item)"
          >
            <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"></RenderVnode>
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed,watch } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import type { InputInstance } from '../Input/types'
import RenderVnode from '../Common/RenderVnode'
import { isFunction} from 'lodash-es'
const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  return option ? option : null
}

defineOptions({
  name: 'VkSelect'
})
const props = withDefaults(defineProps<SelectProps>(),{
  // 要用箭头函数的形式设置数组默认值
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading:false
})
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}
const filteredOptions = ref(props.options)
// 从外部传入响应式的值要用watch检测一下
watch( () => props.options,(newOptions) =>{
  filteredOptions.value = newOptions
})
const generateFilterOptions = async (searchValue:string) =>{
  if(!props.filterable) return
  if(props.filterMethod && isFunction(props.filterMethod)){
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)){
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)

    } catch(e){
      console.error(e)
      filteredOptions.value = []

    } finally{
      states.loading = false

    }
  }else {
    filteredOptions.value = props.options.filter( option => option.label.includes(searchValue))
  }
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
const filteredPlaceholder = computed ( () => {
  return (props.filterable && states.selectedOption && isDropdownShow.value) ?
  states.selectedOption.label : props.placeholder
})

const controlDropdown = (show: boolean) => {
    if(show){
      if(props.filterable && states.selectedOption){
        states.inputValue = ''
      }
      if (props.filterable){
        generateFilterOptions(states.inputValue)
      }
        tooltipRef.value.show()
    } else {
        tooltipRef.value.hide()
        if(props.filterable){
          states.inputValue = states.selectedOption ? states.selectedOption.label : ''
        }
    }
    isDropdownShow.value = show
    emits('visible-change',show)
}
const showClearIcon = computed(() => {
    return props.clearable
        && states.mouseHover
        && states.selectedOption
        && states.inputValue.trim() !== ''
})
const onClear = () => {
    states.selectedOption = null
    states.inputValue = ''
    emits('clear')
    emits('change','')
    emits('update:modelValue','')
}
const NOOP = () =>{}
const toggleDropdown = () => {
    if(props.disabled) return
    if(isDropdownShow.value){
        controlDropdown(false)
    } else {
        controlDropdown(true)
    }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>


