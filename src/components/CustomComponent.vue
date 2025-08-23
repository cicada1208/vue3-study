<script lang="ts" setup>
import { watchEffect } from 'vue';

// Props:
// property 唯讀
// property 為響應式
// const props = defineProps<{
//   count?: number
//   obj?: { title: string }
// }>();
const { count } = defineProps<{
  count?: number
  obj?: { title: string }
}>();

watchEffect(() => {
  // 在 3.4 (含)之前：解構後的 prop 不具有響應性，只運行一次
  // 在 3.5 (含)之後：解構後的 prop 仍具有響應性，變化時重新執行
  console.log('props [count]: ', count)
})

</script>

<template>
  <div>

  </div>
</template>
