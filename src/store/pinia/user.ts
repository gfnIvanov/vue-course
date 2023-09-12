import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { empty } from '@/services/utils';
import type { StateUserData } from '@/types';


type User = StateUserData | null | undefined;

export const useUserStore = defineStore('user', () => {
    const user = ref<User>();

    const user_id = computed(() => {
        return user.value?.id;
    });
    const login = computed(() => {
        return user.value?.login;
    });
    const admin = computed(() => {
        return user.value?.admin;
    });

    function setUser(userData: User = undefined) {
        const fromStorage = localStorage.getItem('auth');
        if (empty(fromStorage) && !empty(userData)) {
            localStorage.setItem('auth', JSON.stringify({
                id: userData?.id,
                login: userData?.login,
                admin: userData?.admin
            }));
            user.value = userData;
        } else {
            user.value = JSON.parse(fromStorage as string);
        }
    };
    function $reset() {
        localStorage.removeItem('auth');
        user.value = null;
    };

    return { user, user_id, login, admin, setUser, $reset }
});