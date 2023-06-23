<script setup lang="ts">
import { reactive, ref, computed } from 'vue';

// 创建响应式对象或数组
// 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。
let reactiveState = reactive({ count: 0 });
// reactive 的响应是 JavaScript Proxy，只有 property 能追蹤响应。
// reactiveState = reactive({ count: 99 }); 再次對 reactiveState 赋值會失了响应。
function reactiveStateIncrement() {
  reactiveState.count++;
}

// 定义响应式变量，创建对任意值的 “引用”
// 并能在不丢失响应性的前提下传递这些引用。
// const refState = ref(0);
const refState = ref({ count: 0 });
function refStateIncrement() {
  refState.value.count++;
}

// 計算函數中不應變更原數組，需先建立副本再行操作
// 會變更原數組的分法：pop()、push()、shift()、unshift()、splice()、sort()、reverse()
const numbers = reactive([1, 2, 3, 4, 5]);
const reverseNumbers = computed(() => [...numbers].reverse());
</script>

<template>
  <div class="about">
    <h2 id="reactive"><a href="#reactive">reactive</a></h2>
    <button @click="reactiveStateIncrement">
      {{ reactiveState.count }}
    </button>

    <h2 id="ref"><a href="#ref">ref</a></h2>
    <button @click="refStateIncrement">
      {{ refState.count }}
      <!-- 若 refState 為顶层属性，无需 .value -->
    </button>

    <h2 id="computed"><a href="#computed">computed</a></h2>
    <ul>
      <li v-for="num in reverseNumbers" :key="num">{{ num }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
