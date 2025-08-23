<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

// Props:
// 唯讀、響應式
// const props = defineProps<{
//   count?: number
//   obj?: { title: string }
// }>();
const { count } = defineProps<{
  count?: number
  obj?: { title: string }
}>();

watchEffect(() => {
  // 在 v3.4 (含)之前：解構後的 prop 不具有響應性，只運行一次
  // 在 v3.5 (含)之後：解構後的 prop 仍具有響應性，變化時重新執行
  console.log('CustomComponent Props [count]:', count);
  // 由 defineProps 解構後的變量 vue 會自動添加 props.，等同如下
  // console.log('CustomComponent Props [count]: ', props.count);
});

// 依據 Props 作為初值，但之後不會再隨 Props 變化
const countRef = ref(count);

</script>

<template>
  <div>
    {{ 'CustomComponent Props [count]: ' + count }} <br />
    {{ 'countRef: ' + countRef }}
  </div>
</template>
