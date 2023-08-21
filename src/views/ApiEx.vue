<script setup lang="ts">
import ApiContent from '@/libs/models/api-content';
import ApiResult from '@/libs/models/api-result';
import Users from '@/models/users';
import type NisPatInfo from '@/models/nis-pat-info';
import { until, useFetch } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import type { CancelTokenSource } from 'axios';
import axios from 'axios';

//#region useFetch

// 'https://httpbin.org/get'
// 'https://itunes.apple.com/search?term=twice&limit=1'
// https://webf00.cych.org.tw/NursingDashboardApi/NisPatInfo/1?clinicalUnitId=SI
const url = ref(
  'https://webf00.cych.org.tw/NursingDashboardApi/NisPatInfo/1?clinicalUnitId=SI'
);

const {
  data: fetchData,
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
  .json();

async function useFetchClick() {
  // the 1st way of get fetchData.value
  // await fetchExecute(); // 待確認 source code
  // the 2nd way of get fetchData.value
  fetchExecute();
  await until(fetchIsFinished).toBe(true);
  console.log('fetchData.value:', fetchData.value);
}

// the 3rd way of get fetchData.value
// watch(fetchIsFinished, () => {
//   if (fetchIsFinished) console.log('fetchData.value:', fetchData.value);
// });

async function useFetchAbortClick() {
  if (fetchCanAbort.value) {
    console.log('fetchAbort');
    fetchAbort();
  }
}

watch(fetchIsFetching, () => {
  console.log(
    'fetchIsFetching.value:',
    fetchIsFetching.value,
    'fetchAborted.value:',
    fetchAborted.value
  );
});

watch(fetchAborted, () => {
  console.log(
    'fetchAborted.value:',
    fetchAborted.value,
    'fetchIsFetching.value:',
    fetchIsFetching.value
  );
});

const nisPatInfoConten = ref(new ApiContent<ApiResult<NisPatInfo[]>>());
let nisPatInfoCancel: CancelTokenSource = null;
async function fetchNisPatInfoConten() {
  if (nisPatInfoCancel) nisPatInfoCancel.cancel('nisPatInfo cancel');
  nisPatInfoCancel = axios.CancelToken.source();

  ndbApi.get(nisPatInfoConten.value, ndbRoutes.NisPatInfo.GetNisPatInfo + 1, {
    params: {
      clinicalUnitId: 'SI'
    },
    cancelToken: nisPatInfoCancel.token
  });
}

//#endregion

//#region apiUtil

const userRst = ref(new ApiResult<Users[]>());
const userRstUser = computed(() => userRst.value.Data?.[0] ?? new Users());

async function fetchUserRst1() {
  userRst.value = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
    params: new Users({
      loginId: '10964',
      isActive: true
    })
  });

  log();
}

async function fetchUserRst2() {
  userRst.value = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
    params: new Users({
      loginId: '02217',
      isActive: true
    })
  });

  log();
}

function log() {
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
    <button @click="useFetchClick">useFetch click</button>
    <button @click="useFetchAbortClick">useFetch abort click</button>
    {{ fetchData }}

    <br />
    <button @click="fetchNisPatInfoConten">fetchNisPatInfoConten</button><br />
    {{ `nisPatInfoConten.loading: ${nisPatInfoConten.loading}` }}<br />
    {{ `nisPatInfoConten.rst:` }}
    {{ nisPatInfoConten.rst.Data }}

    <h2 id="apiUtil"><a href="#apiUtil">apiUtil</a></h2>
    <button @click="fetchUserRst1">fetchUserRst1</button>
    <button @click="fetchUserRst2">fetchUserRst2</button><br />
    {{ 'userRst.Code:' + userRst.Code }} <br />
    {{ 'userRst.Succ:' + userRst.Succ }} <br />
    {{ 'userRst.Msg:' + userRst.Msg }} <br />
    {{ 'userName:' + userRstUser.userName }} <br />
    <button @click="fetchUserContent1">fetchUserContent1</button>
    <button @click="fetchUserContent2">fetchUserContent2</button><br />
    {{ 'userContent.loading:' + userContent.loading }} <br />
    {{ 'userContent.rst.Code:' + userContent.rst.Code }} <br />
    {{ 'userContent.rst.Succ:' + userContent.rst.Succ }} <br />
    {{ 'userContent.rst.Msg:' + userContent.rst.Msg }} <br />
    {{ 'userName:' + userContentUser.userName }} <br />
    <br />
  </div>
</template>

<style scoped></style>
