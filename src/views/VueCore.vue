<script setup lang="ts">
import { reactive, ref } from 'vue';

// 创建响应式对象或数组
// 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。
const reactiveState = reactive({ count: 0 });
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
</script>

<template>
  <div class="about">
    <h2>reactive</h2>
    <button @click="reactiveStateIncrement">
      {{ reactiveState.count }}
    </button>

    <h2>ref</h2>
    <button @click="refStateIncrement">
      {{ refState.count }}
      <!-- 若 refState 為顶层属性，无需 .value -->
    </button>
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
