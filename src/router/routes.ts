export interface IRoute {
  path: string;
  name: string;
  view: string;
  title: string;
}

export const defaultRoutes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    view: '../views/HomeView.vue',
    title: 'Home'
  },
  {
    path: '/vue-core',
    name: 'VueCore',
    view: '../views/VueCore.vue',
    title: 'VueCore'
  },
  {
    path: '/vue-use-ex',
    name: 'VueUseEx',
    view: '../views/VueUseEx.vue',
    title: 'VueUseEx'
  },
  {
    path: '/api-ex',
    name: 'ApiEx',
    view: '../views/ApiEx.vue',
    title: 'ApiEx'
  }
];
