import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { paths, type IRoute } from './routes';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

// dynamic-import-vars limitations: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
// const path = 'views/test/VueCore';
// const paths = path.split('/');
// import(`@/${paths[0]}/${paths[1]}/${paths[2]}.vue`)

function setRoute({ path, name, view, ...meta }: IRoute): RouteRecordRaw {
  return {
    path,
    name,
    component: () => import(/* @vite-ignore */ `${view}`),
    meta
  };
}

const routes = paths
  .map(path => setRoute(path))
  .concat([{ path: '/:notFound(.*)*', name: 'NotFound', redirect: '/' }]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/vue-core',
  //     name: 'VueCore',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/VueCore.vue')
  //   },
  //   { path: '/:notFound(.*)*', name: 'NotFound', redirect: '/' }
  // ]
});

router.afterEach(to => {
  document.title = to.meta.title;
});

export default router;
