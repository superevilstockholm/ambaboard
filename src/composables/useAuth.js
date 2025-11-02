import { ref } from 'vue';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const user = ref(auth.currentUser);

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        user.value = res.user;
        return res.user;
    } catch (err) {
        throw err;
    }
};

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {
            displayName: username,
        });
        await signOut(auth);
        user.value = null;
        return res.user;
    } catch (err) {
        throw err;
    }
};

const logout = async () => {
    await signOut(auth);
    user.value = null;
};

export const useAuth = () => ({ user, login, signup, logout });
