export interface IRoute {
  path: string;
  name: string;
  view: string;
  title: string;
}

export const paths: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    view: '../views/HomeView.vue', //'../views/HomeView.vue',
    title: '首頁'
  },
  {
    path: '/vue-core',
    name: 'VueCore',
    view: '../views/test/VueCore.vue', //'../views/VueCore.vue',
    title: 'Vue Core'
  }
];
