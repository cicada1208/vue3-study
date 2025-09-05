import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 推薦命名方式：useXXXStore
// 調用 useCounterStore()，全域狀態 store 實例才會被創建
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
