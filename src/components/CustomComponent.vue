<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

// Props:
// 唯讀、響應式
// const props = defineProps<{
//   count?: number
//   obj?: { title: string }
// }>();
const { count, obj } = defineProps<{
  count?: number
  obj?: { title: string }
}>();

watchEffect(() => {
  // 在 v3.4 (含)之前：解構後的 prop 不具有響應性，只運行一次
  // 在 v3.5 (含)之後：解構後的 prop 仍具有響應性，變化時重新執行
  console.log('CustomComponent Props [count]:', count);
  // 由 defineProps 解構後的變量 vue 會自動添加 props.，等同如下
  // console.log('CustomComponent Props [count]:', props.count);

  console.log('CustomComponent Props [obj.title]:', obj.title)
});

// 依據 Props 作為初值，但之後不會再隨 Props 變化
const initialCountRef = ref(count);

const emit = defineEmits<{
  (e: 'custom-event', id: number): void
}>();

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

</script>

<template>
  <div>
    {{ 'initialCountRef: ' + initialCountRef }} <br />
    {{ 'CustomComponent Props [count]: ' + count }} <br />
    {{ 'CustomComponent Props [obj.title]: ' + obj.title }} <br />

    <button @click="emit('custom-event', Math.floor(Math.random() * 100))">emit custom-event</button><br />

    <!--
    <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" /><br />
    -->
    <!-- 上式等同下式簡寫 -->
    <input type="text" v-model="name" /><br />
    <input type="text" v-model="lastName" /><br />
  </div>
</template>
