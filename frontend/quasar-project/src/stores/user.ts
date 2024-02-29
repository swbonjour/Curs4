import { defineStore } from 'pinia';
import { UserDto } from 'src/types/user';

export const useUserStore = defineStore('user', {
  state: (): UserDto => ({
    username: '' as string,
    score: 0 as number,
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2;
    // }
  },

  actions: {
    setUser(action: UserDto) {
      localStorage.setItem('username', action.username);
      localStorage.setItem('score', String(action.score));
      this.username = action.username;
      this.score = action.score;
    },
  },
});
