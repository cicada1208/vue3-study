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
    view: 'HomeView', //'../views/HomeView.vue',
    title: '首頁'
  },
  {
    path: '/vue-core',
    name: 'VueCore',
    view: 'VueCore', //'../views/VueCore.vue',
    title: 'Vue Core'
  }
];
