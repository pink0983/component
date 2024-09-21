import type { VNode } from 'vue'

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
  }
  
  export interface SelectProps {
    // v-model
    modelValue: string;
    // 选项
    options?: SelectOption[];
    // 一些基本表单属性
    placeholder: string;
    disabled: boolean;
    clearable?: boolean;
    renderLabel?: RenderLabelFunc;
    filterable?:boolean;
    filterMethod?:CustomFilterFunc;
    // 联想功能
    remote?:boolean
    remoteMethod?:CustomFilterRemoteFunc;

  }
  export interface SelectStates {
    inputValue: string;
    selectedOption: null | SelectOption;
    mouseHover: boolean;
    loading:boolean;

  }
// 自定义渲染
  export type RenderLabelFunc = (option:SelectOption) => VNode
  // 筛选功能
  export type CustomFilterFunc = (value: string) => SelectOption[]
  // 联想功能
  export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;
  export interface SelectEmits {
    (e:'change', value: string) : void;
    (e:'update:modelValue', value: string) : void;
    (e: 'visible-change', value:boolean): void;
    (e: 'clear'): void;
  }