<script setup>
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const router = useRoute();
</script>
<template>
    <Navbar v-if="router.meta?.showNavbar ?? true" />
    <main>
        <RouterView />
    </main>
</template>
<style scoped>
/* Styles */
</style>
