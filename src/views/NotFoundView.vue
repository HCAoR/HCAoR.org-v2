<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="min-h-screen bg-brand-black relative overflow-hidden flex flex-col items-center justify-center">
        <!-- 背景装饰 (复用 HomeView 风格) -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div class="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-brand-blue rounded-full opacity-10 blur-[120px] animate-pulse"></div>
            <div class="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-purple-900 rounded-full opacity-10 blur-[120px]"></div>
            <!-- 网格线 -->
            <div class="absolute inset-0 background-grid"></div>
        </div>

        <!-- 内容区域 -->
        <div class="relative z-10 max-w-2xl px-4 text-center">
            <!-- Glitch 风格的 404 -->
            <h1 class="text-9xl md:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none mb-4 text-center mx-auto">
                404
            </h1>
            
            <div class="flex items-center justify-center gap-3 text-red-500 mb-8">
                <i class="ph-bold ph-warning-octagon text-2xl"></i>
                <span class="text-lg font-bold tracking-widest uppercase border-b border-red-500/30 pb-1">
                    Signal Lost
                </span>
            </div>

            <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
                无法检索到该档案
            </h2>
            
            <p class="text-gray-400 text-lg mb-12 leading-relaxed">
                您正在尝试访问的页面不存在，或者已被删除。<br>
                请检查您输入的网址是否正确。
                如您通过点击其他网站上的链接来到此页面，请考虑联系对应网站的管理员。
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button @click="goHome" class="bg-white text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <i class="ph-bold ph-house"></i> 返回首页
                </button>
                <button @click="goBack" class="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center gap-2">
                    <i class="ph-bold ph-arrow-u-up-left"></i> 返回上一页
                </button>
            </div>
        </div>
        
        <!-- 底部装饰字 -->
        <div class="absolute bottom-8 text-white/10 text-xs font-mono tracking-[0.5em]">
            SYSTEM_ERROR // RESOURCE_NOT_FOUND
        </div>
    </div>
</template>
