<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <MainHeader></MainHeader>
      <div style="display: flex; width: 100%; justify-content: center;" class="q-mt-xl">
        <div style="width: 20%; display: flex; justify-content: flex-end;">
          <h4 v-if="!groupStore.group_name">Select group</h4>
          <h4 v-else style="word-break: break-all;">Group: {{ groupStore.group_name }}</h4>
        </div>
        <div style="width: 60%; display: flex; justify-content: center;">
          <GroupsLayout v-if="Router.currentRoute.value.fullPath === '/main'"></GroupsLayout>
          <GroupLayout v-if="Router.currentRoute.value.fullPath.includes('group')"></GroupLayout>
        </div>
        <MenuLayout></MenuLayout>
      </div>
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
import GroupsLayout from './GroupsLayout.vue';
import MenuLayout from './MenuLayout.vue';
import GroupLayout from './GroupLayout.vue';
import { useGroupStore } from 'src/stores/group';

const userStore = useUserStore();

const groupStore = useGroupStore();

onBeforeMount(async () => {
  const jwt = localStorage.getItem('jwt');
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
    Router.push('auth');
  }

  if (userId) {
    await ApiClient.userControllerGetUserById(userId).then((u) => {
      const user = u as UserDto;
      userStore.setUser({
        _id: user._id,
        username: user.username,
        score: user.score,
        is_teacher: user.is_teacher,
      });
    });
  }
});
</script>
