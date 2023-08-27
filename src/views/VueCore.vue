<script setup lang="ts">
import { useDebounceRef } from '@/libs/vueuse/useDebounceRef';
import { reactive, ref, computed, watch, shallowRef, type Ref } from 'vue';

//#region reactive

// 创建响应式对象或数组
// 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），
// 而对 string、number 和 boolean 这样的 原始类型 无效。
const reactiveState = reactive({
  count: 0,
  obj: { title: 'test1' }
});

// reactive 的响应是 JavaScript Proxy，只有 property 能追蹤响应。
// 再次對 reactiveState 赋值會失了响应，
// 例如 reactiveState = reactive({ count: 99 });。

function reactiveStateIncrement() {
  reactiveState.count++;
}

// 当直接侦听一个响应式对象时，侦听器会自动启用深层模式
watch(reactiveState, newState => console.log(newState));

//#endregion

//#region ref

// 定义响应式变量，创建对任意值的 “引用”
// 并能在不丢失响应性的前提下传递这些引用。
// const refState = ref(0);
const refState = ref({
  count: 0,
  obj: { title: 'test1' }
});

function refStateIncrement() {
  refState.value.count++;
}

watch(refState, newState => console.log(newState), { deep: true });

//#endregion

//#region computed

// 計算函數中不應變更原數組，需先建立副本再行操作
// 會變更原數組的分法：pop()、push()、shift()、unshift()、splice()、sort()、reverse()
const numbers = reactive([1, 2, 3, 4, 5]);
const reverseNumbers = computed(() => [...numbers].reverse());

//#endregion

const debouncedText = useDebounceRef('hello', 1000);

//#region css v-bind()

const theme = reactive({
  color: 'red'
});

function invertTheme() {
  if (theme.color === 'red') theme.color = 'blue';
  else theme.color = 'red';
}

//#endregion

//#region shallow to deep
//非正規，不確定有無後遺症

interface IStoD {
  title?: string;
}

const stodShallowRef = shallowRef<IStoD>({ title: 'initial data' });
const stodRef: Ref<IStoD> = ref(reactive(stodShallowRef));

function asignValueOfShallowRef() {
  stodShallowRef.value = { title: 'asign value of shallowRef' };
}

function asignTitlePropertyOfDeep() {
  stodRef.value.title = 'asign title property of deep';
}

//#endregion
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

    <h2 id="useDebounceRef"><a href="#useDebounceRef">useDebounceRef</a></h2>
    <p>This debouncedText only updates 1 second after you've stopped typing.</p>
    <p>{{ debouncedText }}</p>
    <input v-model="debouncedText" />

    <h2 id="cssvbind"><a href="#cssvbind">css v-bind()</a></h2>
    <div class="themeColor">show theme color</div>
    <button @click="invertTheme">invert theme color</button>

    <h2 id="shallowToDeep">
      <a href="#shallowToDeep">shallow to deep</a>
    </h2>
    <button @click="asignValueOfShallowRef">asign value of shallowRef</button>
    <button @click="asignTitlePropertyOfDeep">
      asign title property of deep</button
    ><br />
    {{ `stodShallowRef.title = ${stodShallowRef.title}` }}<br />
    {{ `stodRef.title = ${stodRef.title}` }}<br />
  </div>
</template>

<style scoped>
.themeColor {
  color: v-bind('theme.color');
}
</style>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
