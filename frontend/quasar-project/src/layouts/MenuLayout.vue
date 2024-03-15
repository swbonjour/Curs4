<template>
  <div
    style="
      gap: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 20%;
    "
  >
    <div v-if="Router.currentRoute.value.fullPath !== '/main'">
      <h4 @click="home">Home</h4>
      <h4 @click="selectGroupOption(GroupOption.USERS)" v-if="userStore.is_teacher" style="padding-top: 4rem;">Users</h4>
      <h4 @click="selectGroupOption(GroupOption.QUIZ)" style="padding-top: 2rem;">Quiz</h4>
      <h4 @click="selectGroupOption(GroupOption.LISTENING)" style="padding-top: 2rem;">Listening</h4>
      <h4 @click="selectGroupOption(GroupOption.DICTIONARY)" style="padding-top: 2rem;">Dictionary</h4>
    </div>
    <h4 @click="logout" style="cursor: pointer">Logout</h4>
  </div>
</template>
<script setup lang="ts">
import Router from 'src/router';
import { GroupOption, useGroupStore } from 'src/stores/group';
import { useUserStore } from 'src/stores/user';

const groupStore = useGroupStore();

const userStore = useUserStore();

const home = () => {
  groupStore.$reset()
  Router.push('/main');
};

const selectGroupOption = (option: GroupOption) => {
  groupStore.option = option;
}

const logout = () => {
  localStorage.removeItem('jwt');
  Router.push('/auth');
};
</script>
<style scoped>
h4 {
  cursor: pointer;
  position: relative;
  width: fit-content;
  transition: all 0.1s;
}

h4:hover {
  font-size: 2.5rem;
}

h4::after {
  content: "";
  width: 100%;
  position: absolute;
  height: 0.1rem;
  background-color: black;
  left: 0;
  bottom: -0.5rem;
}
</style>
