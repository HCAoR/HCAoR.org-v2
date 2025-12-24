<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePosts } from '../composables/usePosts';

const router = useRouter();
const { posts, loading, error, fetchPosts } = usePosts();

onMounted(() => {
    fetchPosts();
});

const openPost = (post) => {
    router.push({ name: 'post-detail', params: { id: post.id } });
};
</script>

<template>
    <div class="pt-12 pb-24 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 py-12">
            <button @click="router.push('/')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
                <i class="ph-bold ph-arrow-left"></i> 返回首页
            </button>
            <h1 class="text-4xl font-bold mb-8">所有文章</h1>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-12">
                <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="flex flex-col items-center justify-center py-12 text-center">
                <i class="ph-bold ph-warning-circle text-5xl text-red-500 mb-4"></i>
                <p class="text-xl text-gray-300">{{ error }}</p>
                <button @click="fetchPosts" class="mt-6 px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
                    重试
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="posts.length === 0" class="flex justify-center py-12">
                <p class="text-gray-400">暂无文章。</p>
            </div>

            <!-- Data State -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article v-for="post in posts" :key="post.id"
                         @click="openPost(post)"
                         class="bg-brand-gray/30 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-blue/50 transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full group">
                    <div class="aspect-video overflow-hidden relative">
                        <img :src="post.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="">
                        <div class="absolute top-4 left-4 z-10">
                            <span class="px-2 py-1 text-xs font-bold rounded bg-black/60 text-white border border-white/10 backdrop-blur">{{ post.category }}</span>
                        </div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                        <div class="text-gray-500 text-xs mb-3">{{ post.date }}</div>
                        <h3 class="text-lg font-bold mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">{{ post.title }}</h3>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{{ post.excerpt }}</p>
                        <div class="flex items-center gap-2 text-sm text-gray-300 mt-auto">
                            <i class="ph-fill ph-user-circle"></i> {{ post.author }}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>