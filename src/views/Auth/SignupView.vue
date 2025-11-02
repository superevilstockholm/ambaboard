<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

// Tabler Icons
import { IconAt, IconLock, IconAlertCircle } from '@tabler/icons-vue';

const { signup } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleSignup = async () => {
    errorMessage.value = '';
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match!';
        return;
    }

    loading.value = true;
    try {
        await signup(email.value, password.value);
        router.push({ name: 'boards' });
    } catch (err) {
        errorMessage.value = err.message;
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-sm p-4" style="width: 400px">
            <h3 class="mb-4 text-center">Sign Up</h3>

            <div v-if="errorMessage" class="alert alert-danger"><IconAlertCircle class="me-2" /> {{ errorMessage }}</div>

            <form @submit.prevent="handleSignup">
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
                <router-link to="/log-in">Already have an account? Login</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Styles */
</style>
