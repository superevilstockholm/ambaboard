<script setup>
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
</script>
<template>
    <Navbar v-if="route.meta?.showNavbar ?? false" />
    <main>
        <RouterView />
    </main>
</template>
<style scoped>
/* Styles */
</style>
