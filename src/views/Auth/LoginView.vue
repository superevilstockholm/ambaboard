<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Swal from 'sweetalert2';
// Tabler Icons
const { login } = useAuth();
const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const handleLogin = async () => {
    loading.value = true;
    try {
        await login(email.value, password.value);
        await Swal.fire({
            icon: 'success',
            title: 'Login berhasil!',
            text: 'Selamat datang kembali 👋',
            timer: 1600,
            showConfirmButton: false,
        });
        router.push({ name: 'boards' });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: err.message.includes('auth/user-not-found') ? 'Akun tidak ditemukan. Coba daftar dulu.' : err.message.includes('auth/wrong-password') ? 'Password salah. Coba lagi!' : err.message,
            confirmButtonColor: '#d33',
        });
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <section class="vh-100">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12 col-md-6 col-lg-5">
                    <div class="card shadow-sm p-4 my-4">
                        <h3 class="text-center mb-1">Welcome Back</h3>
                        <p class="mb-4 text-muted text-center fs-09">Silahkan login untuk melanjutkan</p>
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <div class="input-group">
                                    <input type="email" id="email" class="form-control" v-model="email" placeholder="johndoe12@example.com" autocomplete="email" required />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group">
                                    <input type="password" id="password" class="form-control" v-model="password" placeholder="••••••••" autocomplete="current-password" required />
                                </div>
                            </div>
                            <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                                <span v-if="loading">
                                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Logging in...
                                </span>
                                <span v-else>Login</span>
                            </button>
                        </form>
                        <div class="mt-3 fs-09">
                            <div class="d-flex align-items-center justify-content-center gap-1">
                                Belum punya akun?
                                <router-link :to="{ name: 'signup' }">Daftar</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
/* Styles */
</style>
