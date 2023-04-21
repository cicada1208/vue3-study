import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';
import { defaultRoutes, type IRoute } from './routes';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

// dynamic-import-vars limitations:
// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
// https://cn.vitejs.dev/guide/features.html#glob-import
const viewComponents = import.meta.glob([
  '../views/**/*.vue',
  '../components/**/*.vue'
]);

function setRoute({ path, name, view, ...meta }: IRoute): RouteRecordRaw {
  return {
    path,
    name,
    component: viewComponents[`${view}`],
    meta
  };
}

const routes = defaultRoutes
  .map(r => setRoute(r))
  .concat([{ path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 若需等待過渡動畫後再滾動，return Promise
    return new Promise(resolve => {
      setTimeout(() => {
        if (to.hash)
          resolve({
            el: to.hash,
            behavior: 'smooth'
          });
        else if (savedPosition) resolve(savedPosition);
        else resolve({ top: 0 });
      }, 500);
    });
  }
});

router.afterEach(to => {
  document.title = to.meta.title;
});

export default router;
