<script setup>
import { useRoute } from 'vue-router';

// Tablser icons
import { IconBrand4chan } from '@tabler/icons-vue';

const route = useRoute();

const navLinks = [
    {
        name: 'Home',
        route_name: 'index',
    },
    {
        name: 'Features',
        route_name: 'features',
    },
];
</script>
<template>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <div class="w-100 p-0 mx-0 my-1 d-lg-flex rounded-pill" style="backdrop-filter: blur(10px)">
                <div class="d-inline-block w-lg-25 d-lg-flex justify-content-lg-start">
                    <RouterLink class="navbar-brand d-flex flex-column gap-05 fs-6" :to="{ name: 'index' }">
                        <span class="fw-bold d-flex align-items-center gap-1">
                            <IconBrand4chan size="20" />
                            ambaboard
                        </span>
                        <span class="w-100 border border-1" style="border-color: var(--bs-body-color) !important"></span>
                        <span class="w-100 border border-1" style="border-color: var(--bs-body-color) !important"></span>
                    </RouterLink>
                </div>
                <button class="navbar-toggler float-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse w-lg-50 justify-content-lg-center" id="navbarNav">
                    <ul class="navbar-nav fs-09 gap-lg-2">
                        <li v-for="(item, index) in navLinks" :key="index" class="nav-item">
                            <RouterLink class="nav-link" :class="route.name === item.route_name ? 'active' : ''" aria-current="page" :to="{ name: item.route_name }">{{ item.name }}</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="d-none d-lg-flex w-lg-25 justify-content-end fs-09">
                    <ul class="navbar-nav fs-09 align-items-center gap-2">
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'login' }">Log in</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link border border-1 px-3 py-1 sign-in" style="background-color: rgba(var(--bs-tertiary-bg-rgb), 0.5);" :to="{ name: 'signup' }">Sign up</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<style scoped>
/* Styles */
.gap-05 {
    gap: 0.125rem;
}
.nav-link {
    transition: all 200ms ease-in-out;
}
.sign-in:hover {
    background-color: rgba(var(--bs-tertiary-bg-rgb), 0.75) !important;
}
</style>