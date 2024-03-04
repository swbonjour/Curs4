<template>
  <div class="groups-wrapper">
    <q-scroll-area style="height: 48rem">
      <div class="groups row offset-2">
        <div
          v-for="item in groups"
          class="col-3 groups-item column justify-around items-center q-pl-sm q-pr-sm"
          style="height: 10rem; position: relative"
          :key="item._id"
        >
          <div
            style="position: absolute; top: 0; right: 0.2rem"
            @click="deleteGroup(item._id)"
            v-if="userStore.is_teacher"
          >
            <q-icon name="close" size="16px" color="red"></q-icon>
          </div>
          <h5>{{ item.name }}</h5>
          <h5>{{ groupsMapOnOwnerName.get(item._id) }}</h5>
        </div>
        <div
          class="col-3 groups-item column justify-around items-center q-pl-sm q-pr-sm"
          style="height: 10rem; position: relative"
          @click="addGroup = true"
        >
          <q-icon name="add" size="32px"></q-icon>
        </div>
      </div>
    </q-scroll-area>
  </div>

  <q-dialog v-model="addGroup" persistent>
    <q-card style="width: 30rem; padding: 2rem">
      <q-card-section>
        <q-icon
          name="close"
          size="32px"
          style="margin-left: 22rem; cursor: pointer"
          v-close-popup
          @click="clearInput"
        ></q-icon>
      </q-card-section>
      <h4>Create new group</h4>
      <q-card-section>
        <q-input v-model="groupName" label="Group name"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn
          flat
          label="Create"
          v-close-popup
          style="margin-left: 18rem"
          @click="createGroup"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ApiClient } from 'src/api';
import { useUserStore } from 'src/stores/user';
import { GroupDto } from 'src/types/group';
import { UserDto } from 'src/types/user';
import { onMounted, ref, watch } from 'vue';

const groups = ref<GroupDto[]>([]);
const groupsMapOnOwnerName = ref<Map<string, string>>(new Map());
const addGroup = ref(false);
const groupName = ref('');

const userStore = useUserStore();
const userRefs = storeToRefs(userStore);

const deleteGroup = async (id: string) => {
  await ApiClient.groupControllerDeleteGroup({ _id: id });
  groups.value = groups.value.filter((item) => item._id !== id);
};

const clearInput = () => {
  groupName.value = '';
};

const createGroup = async () => {
  await ApiClient.groupControllerCreateGroup({
    name: groupName.value,
    owner: userStore._id,
  }).then(async (res) => {
    const group = res as GroupDto;
    groups.value.push(group);
    await ApiClient.userControllerGetUserById(group.owner).then((u) => {
        const user = u as UserDto;
        groupsMapOnOwnerName.value.set(group._id, user.username);
      });
  });
};

watch(userRefs._id, async () => {
  await ApiClient.groupControllerGetGroups({
    user_id: userStore._id,
    owner: userStore.is_teacher === false ? 'false' : 'true',
  }).then(async (res) => {
    groups.value = res as GroupDto[];
    groups.value.forEach(async (item) => {
      await ApiClient.userControllerGetUserById(item.owner).then((u) => {
        const user = u as UserDto;
        groupsMapOnOwnerName.value.set(item._id, user.username);
      });
    });
  });
});

onMounted(async () => {
  if (userStore._id) {
    await ApiClient.groupControllerGetGroups({
      user_id: userStore._id,
      owner: userStore.is_teacher === false ? 'false' : 'true',
    }).then((res) => {
      groups.value = res as GroupDto[];
      groups.value.forEach(async (item) => {
        await ApiClient.userControllerGetUserById(item.owner).then((u) => {
          const user = u as UserDto;
          groupsMapOnOwnerName.value.set(item._id, user.username);
        });
      });
    });
  }
});
</script>
<style>
.groups {
  gap: 2rem;
}

.groups-item {
  border-radius: 8px;
  border: 1px solid rgb(179, 179, 179);
  word-break: break-all;
  cursor: pointer;
  transition: background-color 0.2s;
}

.groups-item:hover {
  background-color: rgb(211, 211, 211);
}

.groups-wrapper {
  width: 50rem;
}
</style>
