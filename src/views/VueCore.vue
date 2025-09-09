<script setup lang="ts">
import { useDebounceRef } from '@/infrastructure/vueuse/useDebounceRef';
import { reactive, ref, computed, watch, watchEffect, useTemplateRef, onMounted, onErrorCaptured, provide, readonly } from 'vue';
import Error from '@/components/Error.vue';
import CustomComponent from '@/components/CustomComponent.vue';
import injections from '@/consts/injections';
import { useCounterStore } from '@/stores/counter';

//#region reactive

// reactive：建立響應式物件或陣列
// 對物件類型有效：物件、陣列、Map、Set 集合類型
// 對原始型別無效：string、number、boolean
const reactiveState = reactive({
  count: 0,
  obj: { title: 'test' }
});

// reactive 的響應是透過 JavaScript Proxy：
// 只有 property 能追蹤響應
// 能攔截新增屬性、刪除屬性、讀取屬性、修改屬性
// 例如 const test = reactive({}); // ref({}) 亦同
// test.newProperty = Date.now(); // test.newProperty 為新增屬性且是響應式
// 再次對 reactiveState 賦值會失了原先引用的響應性連接
// 例如 reactiveState = reactive({ count: 99 });

const { count: reactiveCount, obj: reactiveObj } = reactiveState;

function reactiveStateIncrement() {
  reactiveState.count++; // reactiveCount 失去響應
  reactiveState.obj.title = `test ${reactiveState.count}`; // reactiveObj.title 響應
  // reactiveState.obj = { title: '999' }; // reactiveObj.title 失去響應
}

//#endregion

//#region watch

// watch & watchEffect：
// 非同步：會有 race condition，需做 cancel 機制
// callback 觸發時機：父組件更新之後，所屬組件 DOM 更新之前調用。若要訪問更新之後的所屬組件 DOM，需使用 flush: 'post' or watchPostEffect()

// watch：
// 明確追蹤響應式依賴，並在依賴變化時重新執行
// 可以做：改變其他響應狀態、非同步請求、更改 DOM
// 當直接監聽一個響應式物件時，監聽器會自動啟用深層模式
watch(reactiveState, newState => console.log('reactiveState:', newState));

// watch() 或組合式函式 useXXX() 傳入參數：
// 無法保持響應性：傳入值 reactiveState.count
// 可保持響應性：傳入 getter funtion，如下
// watch(() => reactiveState.count, (newCount) => {
//   console.log(`reactiveState.count: ${newCount}`)
// })

// watchEffect(() => { ... })：
// 自動追蹤 callback 中的響應式依賴(該依賴為取值 get 不是賦值 set)，並在依賴變化時重新執行
// 可以做：改變其他響應狀態、非同步請求、更改 DOM
// 立即執行：不需 immediate: true
// 非同步追蹤：第一個 await 前的響應式依賴會被追蹤
// 僅追蹤 callback 中響應式依賴用到的 property，較 watch 深層監聽高效
const watchEffectA = ref(0);
const watchEffectB = ref(0);
watchEffect(async () => {
  console.log('watchEffectA 會被追蹤:', watchEffectA.value);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('watchEffectB 不被追蹤:', watchEffectB.value);
});

//#endregion

//#region ref

// ref：建立響應式任意類型的值
// 並能在不丟失響應性的前提下傳遞這些引用
// const year = ref<string | number>('2020') // 覆蓋默認類型推導
const refState = ref({
  count: 0,
  obj: { title: 'test' }
});

const { count: refCount, obj: refObj } = refState.value;

function refStateIncrement() {
  refState.value.count++; // refCount 失去響應
  refState.value.obj.title = `test ${refState.value.count}`; // refObj.title 響應
  // refState.value.obj = { title: '999' }; // refObj.title 失去響應

  // 修改多筆狀態後，會在 next tick 更新週期，一次全部更新 DOM，如下
  // DOM 未更新
  // await nextTick() // 等待 DOM 更新
  // 現在 DOM 已更新
}

watch(refState.value, newState => console.log('refState:', newState));
// watch(refState, newState => console.log(newState), { deep: true }); // 結果同上

//#endregion

//#region computed

// computed property getter：
// 描述響應式狀態的複雜邏輯
// 計算值會被緩存，響應式依賴更新時才重算
// 不可做：改變其他響應狀態、非同步請求、更改 DOM
// 不應變更原陣列，需先建立副本再行操作
// 會改變原陣列的方法：pop()、push()、shift()、unshift()、splice()、sort()、reverse()
const numbers = reactive([1, 2, 3, 4, 5]);
const reverseNumbers = computed(() => [...numbers].reverse());

//#endregion

//#region component

const prop = ref({
  count: 0,
  obj: { title: 'prop title' }
});

function propIncrement() {
  prop.value.count++;
  prop.value.obj.title = `prop title ${prop.value.count}`;
}

const nameModel = ref('name');
const lastNameModel = ref('last name');

//#endregion

//#region lifecycle

// onErrorCaptured:
// 捕獲後代組件傳遞錯誤時調用
// 默認情況下錯誤由組件繼承鏈向上傳遞 (bubble)，直到 app.config.errorHandler；除非 return false 表示已處理
onErrorCaptured((err, istance, info) => {
  console.error('onErrorCaptured [err]:', err);
  console.error('onErrorCaptured [istance]:', istance); // 觸發錯誤的組件實例
  console.error('onErrorCaptured [info]:', info); // 錯誤來源類型的字串
  // return false; // 阻止錯誤向上 bubble，表示已處理
})

//#endregion

//#region provide / inject

const location = ref('North Pole');

function updateLocation() {
  location.value = 'South Pole';
}

provide(injections.location, {
  location: readonly(location),
  updateLocation
});

//#endregion

//#region pinia

const counterStore = useCounterStore();

// 無法解構賦值，需透過 storeToRefs 保持響應
// const { count, doubleCount } = storeToRefs(counterStore);
// const { increment } = counterStore;

// 變更 state
// counterStore.count = 99;
// counterStore.$patch({ count: 99 });
// counterStore.$patch(() => {
//   counterStore.count = 99;
// });
// counterStore.$state = { count: 99 }; // pinia 實際會 call $patch 變更 state

// 訂閱 state 監聽變更
// $subscribe 在 $patch 後只觸發一次
// 可做全域監聽：寫於 main.ts 此行 app.use(createPinia()) 之後
counterStore.$subscribe((mutation, state) => {
  console.log(`${mutation.storeId} store $subscribe [mutation] 發生變更`, mutation);
  console.log(`${mutation.storeId} store $subscribe [state] 最新 state`, state);
});

// 訂閱 action 監聽結果
counterStore.$onAction(
  ({
    name, // action 名稱
    store, // store 實例
    args, // 傳遞給 action 的參數
    after, // action return or resolve 後調用
    onError, // action throw exception or reject 後調用
  }) => {
    const startTime = Date.now()

    console.log(`${store.$id} store ${name} action start with params:`, args) // 這將在執行 store action 之前觸發

    after((result) => {
      console.log(
        `${store.$id} store ${name} action finished after ${Date.now() - startTime
        }ms. result: ${result}.`
      )
    })

    onError((error) => {
      console.warn(
        `${store.$id} store ${name} action failed after ${Date.now() - startTime}ms. error: ${error}.`
      )
    })
  }
)

//#endregion

//#region useTemplateRef

// 模板引用
const focusInput = useTemplateRef("focusInput");

onMounted(() => {
  focusInput.value?.focus();
});

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

// interface IStoD {
//   title?: string;
// }

// const stodShallowRef = shallowRef<IStoD>({ title: 'initial data' });
// const stodRef: Ref<IStoD> = ref(reactive(stodShallowRef));

// function asignValueOfShallowRef() {
//   stodShallowRef.value = { title: 'asign value of shallowRef' };
//   console.log('stodShallowRef:', stodShallowRef);
//   console.log('stodRef:', stodRef);
// }

// function asignTitlePropertyOfDeep() {
//   stodRef.value.title = 'asign title property of deep';
//   console.log('stodShallowRef:', stodShallowRef);
//   console.log('stodRef:', stodRef);
// }

//#endregion
</script>

<template>
  <div>
    <h2 id="reactive"><a href="#reactive">reactive</a></h2>
    <button @click="reactiveStateIncrement">
      {{ reactiveState.count }}
    </button><br />
    {{ 'reactiveCount: ' + reactiveCount }} <br />
    {{ 'reactiveObj.title: ' + reactiveObj.title }} <br />

    <h2 id="ref"><a href="#ref">ref</a></h2>
    <button @click="refStateIncrement">
      {{ refState.count }}
      <!-- 若 refState 為頂層屬性，無需 .value -->
      <!-- const object = { id: ref(1) };
       object.id 非頂層屬性，會需 object.id.value -->
    </button><br />
    {{ 'refCount: ' + refCount }} <br />
    {{ 'refObj.title: ' + refObj.title }} <br />

    <h2 id="computed"><a href="#computed">computed</a></h2>
    <ul>
      <li v-for="num in reverseNumbers" :key="num">{{ num }}</li>
    </ul>

    <h2 id="component">
      <a href="#component">component</a>
    </h2>
    <button @click="propIncrement">
      {{ prop.count }}
    </button>
    <CustomComponent :count="prop.count" :obj="prop.obj"
      @custom-event="console.log('listen custom-event with id: ', $event)" v-model.trim="nameModel"
      v-model:last-name.capitalize="lastNameModel" attr-var="attr-var-value" @attr-event=""
      v-model:attr-model="nameModel" style="background-color:darkslategrey;" />
    {{ 'nameModel: ' + nameModel }} <br />
    {{ 'lastNameModel: ' + lastNameModel }} <br />

    <h2 id="onErrorCaptured">
      <a href="#onErrorCaptured">onErrorCaptured</a>
    </h2>
    <Error />

    <h2 id="pinia">
      <a href="#pinia">pinia</a>
    </h2>
    <button @click="counterStore.increment">
      counter store increment: {{ counterStore.count }}
    </button>
    <button @click="counterStore.$reset">
      reset counter store state
    </button>

    <h2 id="useTemplateRef">
      <a href="#useTemplateRef">useTemplateRef</a>
    </h2>
    <input ref="focusInput" value="focus this input" />

    <h2 id="useDebounceRef">
      <a href="#useDebounceRef">useDebounceRef</a>
    </h2>
    <p>This debouncedText only updates 1 second after you've stopped typing.</p>
    <input v-model="debouncedText" /><br />
    {{ 'debouncedText: ' + debouncedText }} <br />

    <h2 id="cssvbind">
      <a href="#cssvbind">css v-bind()</a>
    </h2>
    <button @click="invertTheme">invert theme color</button>
    <div class="themeColor">show theme color</div>

    <!-- <h2 id="shallowToDeep">
      <a href="#shallowToDeep">shallow to deep</a>
    </h2>
    <button @click="asignValueOfShallowRef">
      asign value of shallowRef
    </button>
    <button @click="asignTitlePropertyOfDeep">
      asign title property of deep
    </button><br />
    {{ `stodShallowRef.title = ${stodShallowRef.title}` }} <br />
    {{ `stodRef.title = ${stodRef.title}` }} <br /> -->
  </div>
</template>

<style scoped>
.themeColor {
  color: v-bind('theme.color');
}
</style>
