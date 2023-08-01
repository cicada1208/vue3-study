<script setup lang="ts">
import { useMouse, useTitle, throttleFilter } from '@vueuse/core';
import dayjs from 'dayjs';

// tracks mouse position
// 並使用 throttleFilter 1s 更新1次
const { x, y } = useMouse({ eventFilter: throttleFilter(1000) });

// Reactive document title.
const title = useTitle();
function changeTitle() {
  title.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}
</script>

<template>
  <div>
    <h2 id="useMouse"><a href="#useMouse">useMouse</a></h2>
    {{ `x = ${x}, y = ${y}` }}

    <h2 id="useTitle"><a href="#useTitle">useTitle</a></h2>
    {{ title }}
    <button @click="changeTitle">changeTitle</button>
  </div>
</template>

<style scoped></style>
