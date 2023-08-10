<script setup lang="ts">
import {
  useMouse,
  useTitle,
  throttleFilter,
  useStorage,
  useFetch
} from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';
import { ref } from 'vue';
import dayjs from 'dayjs';

// tracks mouse position
// 並使用 throttleFilter 1s 更新1次
const { x, y } = useMouse({ eventFilter: throttleFilter(1000) });

// Reactive document title.
const title = useTitle();
function changeTitle() {
  title.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}

//Listen for clicks outside of an element. Useful for modal or dropdown.
const showModal = ref(false);
function closeModal() {
  showModal.value = false;
}

const defaultStorage = {
  name: 'Banana',
  color: 'Yellow',
  size: 'Medium',
  count: 0
};
const stateStorage = useStorage('vue-use-local-storage', defaultStorage);

const url = ref('https://httpbin.org/get'); // 'https://itunes.apple.com/search?term=twice&limit=1'
const { data: fetchData, execute: fetchExecute } = useFetch(url, {
  immediate: false
});
function fetchClick() {
  fetchExecute();
}
</script>

<template>
  <div>
    <h2 id="useMouse"><a href="#useMouse">useMouse</a></h2>
    {{ `x = ${x}, y = ${y}` }}

    <h2 id="useTitle"><a href="#useTitle">useTitle</a></h2>
    {{ title }}
    <button @click="changeTitle">changeTitle</button>

    <h2 id="onClickOutside"><a href="#onClickOutside">onClickOutside</a></h2>
    <button @click="showModal = true">Open modal</button>
    <div
      v-if="showModal"
      v-on-click-outside="closeModal"
      style="border: 1px black solid"
    >
      Click outside of modal to close
    </div>

    <h2 id="useStorage"><a href="#useStorage">useStorage</a></h2>
    <input v-model="stateStorage.name" type="text" />
    <input v-model="stateStorage.color" type="text" />
    <input v-model="stateStorage.size" type="text" />
    <input
      v-model.number="stateStorage.count"
      type="range"
      min="0"
      step="0.01"
      max="1000"
    />

    <h2 id="useFetch"><a href="#useFetch">useFetch</a></h2>
    <button @click="fetchClick">fetch click</button>
    {{ fetchData }}
  </div>
</template>

<style scoped></style>
