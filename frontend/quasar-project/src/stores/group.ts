import { defineStore } from 'pinia';

export enum GroupOption {
  EMPTY = '',
  QUIZ = 'quiz',
  USERS = 'users',
  LISTENING = 'listening',
  DICTIONARY = 'dictionary',
}

export const useGroupStore = defineStore('group', {
  state: (): { option: GroupOption; group_id: string, group_name: string } => ({
    option: GroupOption.EMPTY,
    group_id: '',
    group_name: '',
  }),

  actions: {
    setAction(action: GroupOption) {
      this.option = action;
    },

    setGroup(group: string, group_name: string) {
      this.group_id = group;
      this.group_name = group_name;
    },
  },
});
