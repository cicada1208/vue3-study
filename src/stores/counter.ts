import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Pinia：響應式全域狀態及業務邏輯
// 推薦命名方式：useXXXStore
// 調用 useCounterStore()，store 實例才會被創建
// state：默認可透過 store 實例訪問 state，並直接讀寫
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  /** 重置 state */
  function $reset() {
    count.value = 0;
  }

  function increment() {
    count.value++;
  }

  return { count, doubleCount, $reset, increment };
});
