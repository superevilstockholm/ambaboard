import { ref } from 'vue';
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const user = ref(null);

setPersistence(auth, browserLocalPersistence);

onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
});

// Fungsi Login
const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        user.value = res.user;
        return res.user;
    } catch (err) {
        throw err;
    }
};

// Fungsi Register
const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: username });

        await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            username: username,
            email: email,
            createdAt: new Date().toISOString(),
        });

        user.value = res.user;
        return res.user;
    } catch (err) {
        throw err;
    }
};

// Fungsi Logout
const logout = async () => {
    await signOut(auth);
    user.value = null;
};

export const useAuth = () => ({
    user,
    login,
    signup,
    logout,
});
