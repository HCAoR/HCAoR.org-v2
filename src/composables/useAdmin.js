import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const authHeader = ref(null);
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.hcaor.org';

// 初始化：检查本地存储
const storedAuth = localStorage.getItem('hcaor_auth');
if (storedAuth) {
    authHeader.value = storedAuth;
    isAuthenticated.value = true;
}

export function useAdmin() {
    const router = useRouter();

    const login = async (username, password, captchaToken) => {
        // 1. 调用后端验证接口
        const res = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, token: captchaToken })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
        }

        // 2. 验证通过，保存凭据
        const token = btoa(`${username}:${password}`);
        const header = `Basic ${token}`;
        
        authHeader.value = header;
        isAuthenticated.value = true;
        localStorage.setItem('hcaor_auth', header);
    };

    const logout = () => {
        authHeader.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('hcaor_auth');
        if (router) router.push('/login');
    };

    const authFetch = async (url, options = {}) => {
        if (!authHeader.value) {
            throw new Error('Unauthorized');
        }

        const headers = {
            ...options.headers,
            'Authorization': authHeader.value
        };

        const res = await fetch(url, { ...options, headers });
        
        if (res.status === 401) {
            logout();
            throw new Error('Invalid Credentials');
        }
        
        return res;
    };

    return {
        isAuthenticated,
        login,
        logout,
        authFetch
    };
}