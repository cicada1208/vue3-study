<script setup lang="ts">
import { useDebounceRef } from '@/libs/vueuse/useDebounceRef';
import { reactive, ref, computed, watch, shallowRef, type Ref } from 'vue';

//#region reactive

// 建立響應式物件或陣列
// 對物件類型有效：物件、陣列、Map、Set 集合類型
// 對原始型別無效：string、number、boolean
const reactiveState = reactive({
  count: 0,
  obj: { title: 'test1' }
});

// reactive 的響應是 JavaScript Proxy，只有 property 能追蹤響應
// 再次對 reactiveState 賦值會失了原先引用的響應性連接
// 例如 reactiveState = reactive({ count: 99 });

function reactiveStateIncrement() {
  reactiveState.count++;
}

// 當直接監聽一個響應式物件時，監聽器會自動啟用深層模式
watch(reactiveState, newState => console.log(newState));

//#endregion

//#region ref

// 建立響應式任意類型的值
// 並能在不丟失響應性的前提下傳遞這些引用
// const refState = ref(0);
const refState = ref({
  count: 0,
  obj: { title: 'test1' }
});

function refStateIncrement() {
  refState.value.count++;

  // 修改多筆狀態後，會在 next tick 更新週期，一次全部更新 DOM，如下
  // DOM 未更新
  // await nextTick() // 等待 DOM 更新
  // 現在 DOM 已更新
}

watch(refState, newState => console.log(newState), { deep: true });

//#endregion

//#region computed

// 計算函式中不應變更原陣列，需先建立副本再行操作
// 會改變原陣列的方法：pop()、push()、shift()、unshift()、splice()、sort()、reverse()
const numbers = reactive([1, 2, 3, 4, 5]);
const reverseNumbers = computed(() => [...numbers].reverse());

//#endregion

//#region useDebounceRef

const debouncedText = useDebounceRef('hello', 1000);

//#endregion

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
  console.log('stodShallowRef:', stodShallowRef);
  console.log('stodRef:', stodRef);
}

function asignTitlePropertyOfDeep() {
  stodRef.value.title = 'asign title property of deep';
  console.log('stodShallowRef:', stodShallowRef);
  console.log('stodRef:', stodRef);
}

//#endregion
</script>

<template>
  <div>
    <h2 id="reactive"><a href="#reactive">reactive</a></h2>
    <button @click="reactiveStateIncrement">
      {{ reactiveState.count }}
    </button>

    <h2 id="ref"><a href="#ref">ref</a></h2>
    <button @click="refStateIncrement">
      {{ refState.count }}
      <!-- 若 refState 為頂層屬性，無需 .value -->
      <!-- const object = { id: ref(1) };
       object.id 非頂層屬性，會需 object.id.value -->
    </button>

    <h2 id="computed"><a href="#computed">computed</a></h2>
    <ul>
      <li v-for="num in reverseNumbers" :key="num">{{ num }}</li>
    </ul>

    <h2 id="useDebounceRef">
      <a href="#useDebounceRef">useDebounceRef</a>
    </h2>
    <p>This debouncedText only updates 1 second after you've stopped typing.</p>
    <p>{{ debouncedText }}</p>
    <input v-model="debouncedText" />

    <h2 id="cssvbind">
      <a href="#cssvbind">css v-bind()</a>
    </h2>
    <div class="themeColor">show theme color</div>
    <button @click="invertTheme">invert theme color</button>

    <h2 id="shallowToDeep">
      <a href="#shallowToDeep">shallow to deep</a>
    </h2>
    <button @click="asignValueOfShallowRef">asign value of shallowRef</button>
    <button @click="asignTitlePropertyOfDeep">
      asign title property of deep</button><br />
    {{ `stodShallowRef.title = ${stodShallowRef.title}` }}<br />
    {{ `stodRef.title = ${stodRef.title}` }}<br />
  </div>
</template>

<style scoped>
.themeColor {
  color: v-bind('theme.color');
}
</style>
