<template>
  <div
    style="
      gap: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    "
    class="q-pb-xl q-pt-xl q-pl-md"
  >
    <h4>Home</h4>
    <h4 @click="logout" style="cursor: pointer;">Logout</h4>
  </div>
</template>
<script setup lang="ts">
import Router from 'src/router';


const logout = () => {
    localStorage.removeItem('jwt');
    Router.push('/auth')
}
</script>
