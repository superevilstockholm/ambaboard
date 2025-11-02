<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Swal from 'sweetalert2';
// Tabler Icons
import { IconAt, IconLock } from '@tabler/icons-vue';
const { signup } = useAuth();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const handleSignup = async () => {
    if (password.value !== confirmPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Password tidak cocok',
            text: 'Pastikan kedua password sama ya!',
            confirmButtonColor: '#d33',
        });
        return;
    }
    loading.value = true;
    try {
        await signup(username.value, email.value, password.value);
        await Swal.fire({
            icon: 'success',
            title: 'Akun berhasil dibuat!',
            text: 'Selamat datang 👋',
            timer: 1800,
            showConfirmButton: false,
        });
        router.push({ name: 'login' });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal mendaftar!',
            text: err.message,
            confirmButtonColor: '#d33',
        });
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-sm p-4" style="width: 400px">
            <h3 class="mb-4 text-center">Sign Up</h3>
            <form @submit.prevent="handleSignup">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <div class="input-group">
                        <span class="input-group-text">@</span>
                        <input type="text" id="username" class="form-control" v-model="username" placeholder="yourname" required />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <div class="input-group">
                        <span class="input-group-text"><IconAt /></span>
                        <input type="email" id="email" class="form-control" v-model="email" placeholder="you@example.com" required />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><IconLock /></span>
                        <input type="password" id="password" class="form-control" v-model="password" placeholder="••••••••" required />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><IconLock /></span>
                        <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" placeholder="••••••••" required />
                    </div>
                </div>
                <button class="btn btn-success w-100" type="submit" :disabled="loading">
                    <span v-if="loading">
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing up...
                    </span>
                    <span v-else>Sign Up</span>
                </button>
            </form>
            <div class="text-center mt-3">
                <div class="d-flex align-items-center gap-1">Already have an account? <router-link :to="{ name: 'login' }">Log in</router-link></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Styles */
</style>
