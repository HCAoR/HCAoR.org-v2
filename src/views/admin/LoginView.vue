<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdmin } from '../../composables/useAdmin';

const router = useRouter();
const { login } = useAdmin();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const recaptchaVerified = ref(false);
const captchaToken = ref('');

// 使用环境变量，回退到 Google 测试 Key
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

onMounted(() => {
    if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.recaptcha.net/recaptcha/api.js?render=explicit`;
        script.async = true;
        script.defer = true;
        script.onload = initCaptcha;
        document.head.appendChild(script);
    } else {
        initCaptcha();
    }
});

const initCaptcha = () => {
    if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
            window.grecaptcha.render('recaptcha-container', {
                'sitekey': SITE_KEY,
                'callback': verifyCallback,
                'theme': 'dark'
            });
        });
    }
};

const verifyCallback = (response) => {
    if (response) {
        recaptchaVerified.value = true;
        captchaToken.value = response; // 保存 token
        error.value = '';
    }
};

const handleLogin = async () => {
    if (!username.value || !password.value) {
        error.value = '请输入用户名和密码';
        return;
    }
    if (!recaptchaVerified.value) {
        error.value = '请完成人机验证';
        return;
    }

    loading.value = true;
    error.value = '';
    
    try {
        // 调用异步登录，传递 token
        await login(username.value, password.value, captchaToken.value);
        router.push('/admin/posts');
    } catch (e) {
        error.value = e.message;
        // 登录失败通常需要重置验证码
        if (window.grecaptcha) {
            window.grecaptcha.reset();
            recaptchaVerified.value = false;
            captchaToken.value = '';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen bg-brand-black flex items-center justify-center relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div class="absolute top-[-10%] right-[30%] w-[500px] h-[500px] bg-brand-blue rounded-full opacity-10 blur-[100px] animate-pulse"></div>
            <div class="absolute inset-0 background-grid"></div>
        </div>

        <div class="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10 shadow-2xl">
            <div class="text-center mb-8">
                <img src="https://assets.hcaor.org/wiki-logo-v1.svg" alt="Logo" class="h-12 mx-auto mb-4 img-invert">
                <h1 class="text-2xl font-bold text-white">管理员登录</h1>
                <p class="text-gray-400 text-sm mt-2">Restricted Access</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Username</label>
                    <input v-model="username" type="text" class="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="admin">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Password</label>
                    <input v-model="password" type="password" class="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="••••••••">
                </div>

                <!-- Recaptcha Container -->
                <div class="flex justify-center">
                    <div id="recaptcha-container"></div>
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
                    {{ error }}
                </div>

                <button type="submit" :disabled="loading" class="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <i v-if="loading" class="ph-bold ph-spinner animate-spin"></i>
                    {{ loading ? 'Verifying...' : 'Login' }}
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <button @click="router.push('/')" class="text-sm text-gray-500 hover:text-brand-blue transition-colors">
                    <i class="ph-bold ph-arrow-left"></i> 返回首页
                </button>
            </div>
        </div>
    </div>
</template>