<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <MainHeader></MainHeader>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainHeader from '../components/Header/MainHeader.vue';
import { ApiClient } from 'src/api';
import Router from 'src/router';
import { useUserStore } from 'src/stores/user';
import { UserDto } from 'src/types/user';

const userStore = useUserStore();

onBeforeMount(async () => {
  const jwt = localStorage.getItem('jwt');
  console.log(jwt);
  let userId = '';
  if (jwt) {
    await ApiClient.authControllerWhoAmI({ jwt: jwt })
      .then((res: any) => {
        const userData = res as { id: string };
        userId = userData.id;
      })
      .catch((err: any) => {
        Router.push('auth');
      });
  } else {
    Router.push('auth')
  }

  if (userId) {
    await ApiClient.userControllerGetUserById({
      id: userId,
    }).then((u) => {
      const user = u as UserDto;
      userStore.setUser({
        id: user.id,
        username: user.username,
        score: user.score,
        is_admin: user.is_admin,
      });
    });
  }
});
</script>
