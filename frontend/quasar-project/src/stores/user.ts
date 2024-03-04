import { defineStore } from 'pinia';
import { UserDto } from 'src/types/user';

export const useUserStore = defineStore('user', {
  state: (): UserDto => ({
    _id: '' as string,
    username: '' as string,
    score: 0 as number,
    is_teacher: false as boolean,
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2;
    // }
  },

  actions: {
    setUser(action: UserDto) {
      this._id = action._id;
      this.username = action.username;
      this.score = action.score;
      this.is_teacher = action.is_teacher;
    },
  },
});
