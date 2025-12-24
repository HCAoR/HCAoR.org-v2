<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue';
import { injectSpeedInsights } from '@vercel/speed-insights';

const router = useRouter();
const route = useRoute();
const isScrolled = ref(false);

const navItems = [
    { id: 1, name: '组织简介', target: 'about' },
    { id: 2, name: '旗下项目', target: 'projects' },
    { id: 3, name: '博客动态', target: 'blog' },
    { id: 4, name: '捐赠说明', target: 'donate' }
];

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

const handleNavigate = (target) => {
    if (target === 'home') {
        if (route.name === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.push('/');
        }
        return;
    }

    const targetId = `${target}-section`;
    const hash = `#${targetId}`;
    
    if (route.name === 'home') {
        const el = document.getElementById(targetId);
        if (el) {
            const offset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            history.pushState(null, null, hash);
        }
    } else {
        router.push({ path: '/', hash: hash });
    }
};

onMounted(() => {
    injectSpeedInsights();
    window.addEventListener('scroll', handleScroll);
});
</script>

<template>
    <div id="app" class="flex flex-col min-h-screen">
        <TheNavbar :navItems="navItems" :isScrolled="isScrolled" @navigate="handleNavigate" />
        
        <main class="flex-grow pt-16">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <TheFooter @navigate="handleNavigate" />
    </div>
</template>
