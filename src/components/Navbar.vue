<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

// Auth
import { useAuth } from '@/composables/useAuth';
const { user, logout } = useAuth();

// Tabler icons
import { IconBrand4chan, IconLogout, IconChevronDown } from '@tabler/icons-vue';
import Swal from 'sweetalert2';

// Router
const route = useRoute();
const router = useRouter();

// Screen width - responsiveness
const width = ref(window.innerWidth);
const updateWidth = () => {
    width.value = window.innerWidth;
    updateNavbarMaxWidth();
};
const updateNavbarMaxWidth = () => {
    const container = document.getElementById('navbar-container');
    if (!container) return;
    let maxWidth;
    if (width.value >= 1400) {
        const pxLg4 = 1.5 * 16;
        maxWidth = 1320 + pxLg4 * 2;
    } else if (width.value >= 1200) {
        const pxLg4 = 1.5 * 16;
        maxWidth = 1140 + pxLg4 * 2;
    } else if (width.value >= 992) {
        const pxLg4 = 1.5 * 16;
        maxWidth = 960 + pxLg4 * 2;
    } else if (width.value >= 768) {
        maxWidth = 720;
    } else if (width.value >= 576) {
        maxWidth = 540;
    } else {
        maxWidth = '100%';
    }
    container.style.maxWidth = typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth;
};
onMounted(() => {
    window.addEventListener('resize', updateWidth);
    updateNavbarMaxWidth();
});
onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});

// Nav links
const navLinks = [
    {
        name: 'Home',
        route_name: 'index',
    },
    {
        name: 'Features',
        route_name: 'features',
    },
    {
        name: 'Boards',
        route_name: 'boards',
    },
];

// Logout
async function logoutHandler() {
    await logout();
    await Swal.fire({
        icon: 'success',
        title: 'Logout berhasil! 👋',
        showConfirmButton: false,
        timer: 1500,
    });
    await router.push({ name: 'login' });
}
</script>
<template>
    <nav class="navbar navbar-expand-lg sticky-top" :class="width < 992 ? 'backdrop-blur-10px' : ''">
        <div class="container" id="navbar-container">
            <div class="w-100 p-0 m-0 py-lg-1 px-lg-4 mt-lg-1 d-lg-flex rounded-lg-pill" :class="width >= 992 ? 'backdrop-blur-10px' : ''">
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
                    <hr />
                    <!-- Mobile -->
                    <ul class="navbar-nav fs-09 gap-lg-2 d-flex flex-row align-items-center gap-3 d-lg-none text-center">
                        <template v-if="!user">
                            <li class="nav-item w-100">
                                <RouterLink class="nav-link" :to="{ name: 'login' }">Log in</RouterLink>
                            </li>
                            <li class="nav-item w-100">
                                <RouterLink class="nav-link border border-1 px-3 py-1 semi-bg-nav-link" style="background-color: rgba(var(--bs-tertiary-bg-rgb), 0.1)" :to="{ name: 'signup' }"> Sign up </RouterLink>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item dropdown w-100">
                                <div class="w-100 d-flex justify-content-between align-items-center" style="cursor: pointer" role="button" data-bs-toggle="dropdown" @click="toggleDropdown">
                                    {{ user.displayName || user.email }}
                                    <IconChevronDown size="20"></IconChevronDown>
                                </div>
                                <ul class="dropdown-menu w-100 text-center mt-2 py-0 border-0" style="background-color: rgba(var(--bs-body-color-rgb), 0.1) !important">
                                    <li>
                                        <button class="dropdown-item text-danger rounded" @click="logoutHandler"><IconLogout size="16" /> Logout</button>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </div>
                <!-- Desktop -->
                <div class="d-none d-lg-flex w-lg-25 justify-content-end fs-09 position-relative">
                    <ul class="navbar-nav fs-09 align-items-center gap-2">
                        <template v-if="!user">
                            <li class="nav-item">
                                <RouterLink class="nav-link" :to="{ name: 'login' }">Log in</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="nav-link border border-1 px-3 py-1 semi-bg-nav-link" style="background-color: rgba(var(--bs-tertiary-bg-rgb), 0.1)" :to="{ name: 'signup' }"> Sign up </RouterLink>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item dropdown position-relative">
                                <div class="d-flex align-items-center gap-1 px-2 py-1" style="cursor: pointer" role="button" data-bs-toggle="dropdown" @click="toggleDropdown">
                                    {{ user.displayName || user.email }}
                                    <IconChevronDown size="20"></IconChevronDown>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-end mt-0 py-0 border-0" style="background-color: rgba(var(--bs-body-color-rgb), 0.1) !important">
                                    <li>
                                        <button class="dropdown-item text-danger fw-semibold rounded semi-bg-nav-link" @click="logoutHandler"><IconLogout size="16" /> Logout</button>
                                    </li>
                                </ul>
                            </li>
                        </template>
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
.nav-link,
.dropdown-item {
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
}
.semi-bg-nav-link:hover {
    background-color: rgba(var(--bs-tertiary-bg-rgb), 0.5) !important;
}
.backdrop-blur-10px {
    backdrop-filter: blur(10px);
}
</style>
