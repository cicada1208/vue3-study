<script setup lang="ts">
import { reactive } from 'vue';

// 创建响应式对象或数组
// 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效
const state = reactive({ count: 0 });

function increment() {
  state.count++;
}
</script>

<template>
  <div class="about">
    <h2>reactive</h2>
    <button @click="increment">
      {{ state.count }}
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
