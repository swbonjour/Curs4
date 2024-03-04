<template>
  <div class="layout">
    <div class="card">
      <div class="left-side">
        <h2>Auth</h2>
        <q-input
          type="text"
          class="login"
          placeholder="login"
          v-model="login"
        />
        <q-input
          type="text"
          class="password"
          placeholder="password"
          v-model="password"
        />
        <div class="left-side-btn">
          <q-btn class="logIn" @click="logIn" size="md">log In</q-btn>
          <q-btn class="signIn" @click="signIn" size="md">sign In</q-btn>
        </div>
      </div>
      <div class="right-side">
        <h1>LangSchool</h1>
        <div class="right-side-img">
          <img src="../assets/translate-svgrepo-com.svg" alt="" />
          <img src="../assets/people-nearby-svgrepo-com.svg" alt="" />
        </div>
        <h6 class="err" :hidden="err.length ? false : true">{{ err }}</h6>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Router from 'src/router';
import { useUserStore } from 'src/stores/user';
import { ApiClient, client } from 'src/api/index';
import { AuthResponseDto } from 'src/api/client';
import { UserDto } from 'src/types/user';
import { stat } from 'fs';

const userStore = useUserStore();

const login = ref('');
const password = ref('');

const err = ref('');

const signIn = async () => {
  let userData: AuthResponseDto | undefined;
  await ApiClient.authControllerSignIn({
    username: login.value,
    password: password.value,
  })
    .then(async (res) => {
      userData = res as AuthResponseDto;
    })
    .catch((rej) => {
      err.value = rej.response.data.message;
    });

  if (userData) {
    const status = await setUserData(userData);
    if (status) {
      Router.push('/main');
    }
  }
};

const logIn = async () => {
  let userData: AuthResponseDto | undefined;
  await ApiClient.authControllerLogin({
    username: login.value,
    password: password.value,
  })
    .then(async (res) => {
      userData = res as AuthResponseDto;
    })
    .catch((rej) => {
      err.value = rej.response.data.message;
    });

  if (userData) {
    const status = await setUserData(userData);
    if (status) {
      Router.push('/main');
    }
  }
};

const setUserData = async (res: AuthResponseDto): Promise<boolean> => {
  localStorage.setItem('jwt', res.access_token);
  client.setSecurityData(res.access_token);

  let status = false;

  await ApiClient.userControllerGetUserById(res.userId)
    .then((u) => {
      const user = u as UserDto;
      userStore.setUser({
        _id: user._id,
        username: user.username,
        score: user.score,
        is_teacher: user.is_teacher,
      });
      status = true;
    })
    .catch((rej) => {
      err.value = rej.response.data.message;
    });

  return status;
};
</script>
<style scoped>
.layout {
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 30%;
  height: 40%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  display: flex;
}

.left-side {
  width: 50%;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-right: 1px solid #e4e4e4;
  padding: 1rem;
  text-align: center;
  margin-top: 4rem;

  display: flex;
  flex-direction: column;

  .left-side-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
}

.right-side {
  width: 50%;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 32px;
    font-weight: 400;
    color: #8b8b8b;
  }
}

.right-side-img {
  img {
    width: 46px;
  }
}

.err {
  color: rgb(221, 132, 132);
}
</style>
