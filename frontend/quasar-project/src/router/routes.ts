import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '',
    redirect: '/main',
  },
  {
    path: '/main/group/:id',
    component: () => import('layouts/MainLayout.vue')
  }
];

export default routes;
