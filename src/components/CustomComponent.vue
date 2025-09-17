<script lang="ts" setup>
import injections, { type ILocationInjection } from '@/consts/injections';
import { inject, ref, useAttrs, watchEffect } from 'vue';

//#region props

// props:
// 唯讀、響應式
// const props = defineProps<{
//   count?: number
//   obj?: { title: string }
// }>();
const { count, obj, propWithDefault = ['one', 'two'] } = defineProps<{
  count: number
  obj: { title: string },
  propWithDefault?: Array<string>
}>();

watchEffect(() => {
  // 在 v3.4 (含)之前：解構後的 prop 不具有響應性，只運行一次
  // 在 v3.5 (含)之後：解構後的 prop 仍具有響應性，變化時重新執行
  console.log('CustomComponent props [count]:', count);
  // 由 defineProps 解構後的變量 vue 會自動添加 props.，等同如下
  // console.log('CustomComponent props [count]:', props.count);

  console.log('CustomComponent props [obj.title]:', obj.title)
});

//#endregion

//#region init with prop

// 依據 props 作為初值，但之後不會再隨 props 變化
const initialCountRef = ref(count);

//#endregion

//#region emit

const emit = defineEmits<{
  (e: 'custom-event', id: number): void
}>();
// const emit = defineEmits<{
//   "custom-event": [id: number] // 具名元組
// }>();

//#endregion

//#region v-model

// const props = defineProps<{ modelValue?: string }>();
// const emit = defineEmits<{
//   (e: 'update:modelValue', modelValue: string): void
// }>();
// 上式等同下式簡寫
const name = defineModel();
const [lastName, lastNameModifiers] = defineModel<string>('lastName', {
  required: true,
  set(value) {
    if (lastNameModifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
});

//#endregion

//#region attrs

// attrs:
// 透傳 attributes：未被該組件聲明為 props、emits 的 attributes，例如 class、style、id
// 非響應式
// 組件僅單一根元素：attributes (含 v-on 監聽器)會自動加入根元素
const attrs = useAttrs();
console.log('attrs:', attrs);

// 禁用 attributes 繼承:
// 可手動指定繼承 attributes 的元素
// defineOptions({
//   inheritAttrs: false
// });

//#endregion

//#region provide / inject

const { location, updateLocation } = inject(injections.location) as ILocationInjection; // 若確有 provide 可斷言，但若未 provide 會出錯，除非給預值

//#endregion

</script>

<template>
  <div>
    {{ 'CustomComponent props [count]: ' + count }} <br />
    {{ 'CustomComponent props [obj.title]: ' + obj.title }} <br />
    {{ 'CustomComponent props [propWithDefault]: ' + propWithDefault }} <br />
    {{ 'Init with CustomComponent prop [initialCountRef]: ' + initialCountRef }} <br />

    <button @click="emit('custom-event', Math.floor(Math.random() * 100))">
      emit custom-event
    </button><br />

    <!--
    <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" /><br />
    -->
    <!-- 上式等同下式簡寫 -->
    <input type="text" v-model="name" /><br />
    <input type="text" v-model="lastName" /><br />

    <!-- <div v-bind="$attrs">
      手動指定繼承 attributes 的元素
    </div> -->

    <button @click="updateLocation">
      {{ 'provide / inject: ' + location }}
    </button>
  </div>
</template>
