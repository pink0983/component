<template>
    <button
    class="vk-button"
    ref="_ref"
    :class="{
        [`vk-button--${type}`]:type,
        [`vk-button--${size}`]:size,
        'is-plain':plain,
        'is-round':round,
        'is-ciecle':circle,
        'is-disabled':disabled,
        'is-loading':loading
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :ButtonHTMLAttributes.type?="nativeType">
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <!-- <Icon :icon="icon" v-if="icon"></Icon> -->
        <span>
            <slot></slot>
        </span>

    </button>
</template>
<script setup lang="ts">
import type { ButtonProps } from './types';
import { ref } from 'vue';
import Icon from '../Icon/Icon.vue'
// defineProps<ButtonProps>()
defineOptions({
  name: 'VkButton'
})


withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>