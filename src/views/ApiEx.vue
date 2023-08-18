<script setup lang="ts">
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import Users from '@/models/users';
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';

//#region useFetch
const url = ref('https://httpbin.org/get'); // 'https://itunes.apple.com/search?term=twice&limit=1'

const { data: fetchData, execute: fetchExecute } = useFetch(url, {
  immediate: false
});

function useFetchClick() {
  fetchExecute();
}
//#endregion

//#region apiUtil
const userRst = ref(new ApiResult<Users[]>());
const userRstUser = computed(() => userRst.value.Data?.[0] ?? new Users());

async function fetchUserRst1() {
  userRst.value = await ndbApi
    .getPs(ndbRoutes.Users.GetUsers + 1, {
      params: new Users({
        loginId: '10964',
        isActive: true
      })
    })
    .then(r => {
      console.log('r', r);
      return r as ApiResult<Users[]>;
    })
    .catch(e => {
      console.log('e', e);
      return e as ApiResult<Users[]>;
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
    {{ fetchData }}

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
    {{ 'userContent.Code:' + userContent.rst.Code }} <br />
    {{ 'userContent.Succ:' + userContent.rst.Succ }} <br />
    {{ 'userContent.Msg:' + userContent.rst.Msg }} <br />
    {{ 'userName:' + userContentUser.userName }} <br />
    {{ 'err:' + (userContent.err ? userContent.rst : '') }}
    <br />
  </div>
</template>

<style scoped></style>
