<template>
    <div>
        <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders header-height">
            <q-header elevated class="bg-white header-height row items-center justify-between  q-pl-md q-pr-md">
                <div class="row">
                    <q-avatar>
                        <img src="../../assets/translate-svgrepo-com.svg" />
                    </q-avatar>
                    <p class="header-logo-text">LangSchool</p>
                </div>
                
                <UserHeader></UserHeader>
            </q-header>
        </q-layout>
    </div>
</template>
<script setup lang="ts">
import UserHeader from './UserHeader.vue'
</script>
<style>
.header-height {
    height: 5rem;
}

.header-logo-text {
    font-size: 32px;
    font-weight: 400;
    color: #8b8b8b;
    padding-left: 2rem;
    margin-bottom: 0;
}
</style>