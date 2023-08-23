<script setup lang="ts">
import ApiContent from '@/libs/models/api-content';
import ApiResult from '@/libs/models/api-result';
import Users from '@/models/users';
import type NisPatInfo from '@/models/nis-pat-info';
import { until, useFetch } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';

//#region useFetch

// http://httpstat.us/500
// https://hub.dummyapis.com/delay?seconds=60
// https://httpbin.org/get
// https://itunes.apple.com/search?term=twice&limit=1
// https://webf00.cych.org.tw/NursingDashboardApi/NisPatInfo/1?clinicalUnitId=SI
const url = ref('https://hub.dummyapis.com/delay?seconds=5');

const {
  data: fetchData,
  error: fetchError,
  execute: fetchExecute,
  isFinished: fetchIsFinished,
  isFetching: fetchIsFetching,
  aborted: fetchAborted,
  canAbort: fetchCanAbort,
  abort: fetchAbort
} = useFetch(url, {
  immediate: false
})
  .get()
  .text();

async function useFetchExecute() {
  // execute 連續執行目前有 bug: isFetching 狀態不正確，且最後 data、error 都有資料

  // the 1st way of get fetchData.value
  await fetchExecute();

  // the 2nd way of get fetchData.value
  // fetchExecute();
  // await until(fetchIsFinished).toBe(true);

  console.log(
    '[useFetchExecute result]',
    'fetchData.value:',
    fetchData.value,
    'fetchError.value:',
    fetchError.value
  );
}

// the 3rd way of get fetchData.value
// watch(fetchIsFinished, () => {
//   if (fetchIsFinished) console.log('fetchData.value:', fetchData.value);
// });

async function useFetchAbort() {
  if (fetchCanAbort.value) {
    console.log('[useFetchAbort start]');
    fetchAbort();
    await until(fetchIsFinished).toBe(true);
    console.log(
      '[useFetchAbort result]',
      'fetchData.value:',
      fetchData.value,
      'fetchError.value:',
      fetchError.value
    );
  }
}

watch(fetchIsFetching, () => {
  console.log(
    '[watch fetchIsFetching]',
    'fetchIsFetching.value:',
    fetchIsFetching.value,
    'fetchIsFinished.value:',
    fetchIsFinished.value,
    'fetchAborted.value:',
    fetchAborted.value
  );
});

watch(fetchAborted, () => {
  console.log(
    '[watch fetchAborted]',
    'fetchIsFetching.value:',
    fetchIsFetching.value,
    'fetchIsFinished.value:',
    fetchIsFinished.value,
    'fetchAborted.value:',
    fetchAborted.value
  );
});
//#endregion

//#region apiUtil

const nisPatInfoContent = ref(new ApiContent<ApiResult<NisPatInfo[]>>());
async function cancelThenFetchNisPatInfoContent() {
  nisPatInfoContent.value.cancel('nisPatInfo cancel');

  ndbApi.get(nisPatInfoContent.value, ndbRoutes.NisPatInfo.GetNisPatInfo + 1, {
    params: {
      clinicalUnitId: 'SI'
    }
  });
}

const userRst = ref(new ApiResult<Users[]>());
const userRstUser = computed(() => userRst.value.Data?.[0] ?? new Users());

async function fetchUserRst1() {
  userRst.value = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
    params: new Users({
      loginId: '10964',
      isActive: true
    })
  });

  logUserRst();
}

async function fetchUserRst2() {
  userRst.value = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
    params: new Users({
      loginId: '02217',
      isActive: true
    })
  });

  logUserRst();
}

function logUserRst() {
  console.log('userRst.value:', userRst.value);
  console.log('userRstUser.value:', userRstUser.value);
  console.log('userRstUser.value.userName:', userRstUser.value.userName);
}

const userContent = ref(new ApiContent<ApiResult<Users[]>>());
const userContentUser = computed(
  () => userContent.value.rst.Data?.[0] ?? new Users()
);

async function fetchUserContent1() {
  ndbApi.get(userContent.value, `${ndbRoutes.Users.GetUsers}1`, {
    params: {
      loginId: '10964',
      isActive: true
    }
  });
}

async function fetchUserContent2() {
  ndbApi.get(userContent.value, `${ndbRoutes.Users.GetUsers}1`, {
    params: {
      loginId: '02217',
      isActive: true
    }
  });
}

//#endregion
</script>

<template>
  <div>
    <h2 id="useFetch"><a href="#useFetch">useFetch</a></h2>
    <button @click="useFetchExecute">useFetchExecute</button>
    <button @click="useFetchAbort">useFetchAbort</button><br />
    {{ fetchData }}<br />

    <h2 id="apiUtil"><a href="#apiUtil">apiUtil</a></h2>
    <button @click="cancelThenFetchNisPatInfoContent">
      cancelThenFetchNisPatInfoContent</button
    ><br />
    {{ `nisPatInfoConten.loading: ${nisPatInfoContent.loading}` }}<br />
    {{ `nisPatInfoContent.rst:` }}
    {{ nisPatInfoContent.rst }}<br />

    <button @click="fetchUserRst1">fetchUserRst1</button>
    <button @click="fetchUserRst2">fetchUserRst2</button><br />
    {{ 'userRst.Code:' + userRst.Code }} <br />
    {{ 'userRst.Succ:' + userRst.Succ }} <br />
    {{ 'userRst.Msg:' + userRst.Msg }} <br />
    {{ 'userRstUser.userName:' + userRstUser.userName }} <br />
    <button @click="fetchUserContent1">fetchUserContent1</button>
    <button @click="fetchUserContent2">fetchUserContent2</button><br />
    {{ 'userContent.loading:' + userContent.loading }} <br />
    {{ 'userContent.rst.Code:' + userContent.rst.Code }} <br />
    {{ 'userContent.rst.Succ:' + userContent.rst.Succ }} <br />
    {{ 'userContent.rst.Msg:' + userContent.rst.Msg }} <br />
    {{ 'userContentUser.userName:' + userContentUser.userName }} <br />
  </div>
</template>

<style scoped></style>
