<script setup>
import { useAdmin } from '../../composables/useAdmin';
import { useRouter } from 'vue-router';

const { logout } = useAdmin();
const router = useRouter();

const navItems = [
    { name: '文章列表', path: '/admin/posts' },
    { name: '新建文章', path: '/admin/posts/new' },
];
</script>

<template>
    <div class="min-h-screen bg-brand-black flex flex-col">
        <!-- Admin Navbar -->
        <nav class="h-16 border-b border-white/10 bg-brand-gray/50 flex items-center justify-between px-6">
            <div class="flex items-center gap-8">
                <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
                    <img src="https://assets.hcaor.org/wiki-icon-v1.svg" class="w-8 h-8">
                    <span class="font-bold text-white hidden md:block">HCAoR Admin</span>
                </div>
                
                <div class="flex gap-4">
                    <router-link 
                        v-for="item in navItems" 
                        :key="item.path"
                        :to="item.path"
                        class="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        active-class="text-brand-blue"
                    >
                        {{ item.name }}
                    </router-link>
                </div>
            </div>

            <button @click="logout" class="text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
                <i class="ph-bold ph-sign-out"></i> 注销
            </button>
        </nav>

        <!-- Main Content -->
        <main class="flex-grow p-6">
            <router-view></router-view>
        </main>
    </div>
</template>
