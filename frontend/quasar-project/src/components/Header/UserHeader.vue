<template>
  <div class="user-height row items-center justify-end">
    <div class="row items-center justify-center">
      <q-icon name="emoji_events" size="md" color="orange"></q-icon>
      <h5>{{ userStore.score }}</h5>
    </div>
    <h5>{{ userStore.username }}</h5>
    <q-icon name="account_circle" size="xl" color="grey"></q-icon>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
</script>
<style>
.user-height {
  height: 5rem;
  width: 40%;
  color: black;
  overflow: hidden;
  gap: 2rem;
}
</style>
