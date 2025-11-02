import { ref } from 'vue';
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
        await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            username: username,
            email: email,
            createdAt: new Date().toISOString()
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
