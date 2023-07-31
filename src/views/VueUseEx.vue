<script setup lang="ts">
import { useMouse } from '@vueuse/core';

// tracks mouse position
const { x, y } = useMouse();
</script>

<template>
  <div>
    <h2 id="useMouse"><a href="#useMouse">useMouse</a></h2>
    {{ `x = ${x}, y = ${y}` }}
  </div>
</template>

<style scoped></style>
