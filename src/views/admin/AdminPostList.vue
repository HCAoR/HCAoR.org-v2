<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdmin } from '../../composables/useAdmin';

const router = useRouter();
const { authFetch } = useAdmin();

const posts = ref([]);
const loading = ref(true);
const error = ref('');
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.hcaor.org';

const fetchPosts = async () => {
    try {
        const res = await authFetch(`${API_BASE}/api/posts`);
        posts.value = await res.json();
    } catch (e) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
};

const deletePost = async (id) => {
    if (!confirm('确定要删除这篇文章吗？此操作不可逆。')) return;
    
    try {
        const res = await authFetch(`${API_BASE}/api/posts/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            posts.value = posts.value.filter(p => p.id !== id);
        } else {
            alert('删除失败');
        }
    } catch (e) {
        alert(e.message);
    }
};

onMounted(() => {
    fetchPosts();
});
</script>

<template>
    <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-2xl font-bold text-white">文章管理</h1>
            <button @click="router.push('/admin/posts/new')" class="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <i class="ph-bold ph-plus"></i> 新建文章
            </button>
        </div>

        <div v-if="loading" class="text-center py-12">
            <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
        </div>

        <div v-else-if="error" class="bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
            {{ error }}
        </div>

        <div v-else class="glass-panel border border-white/10 rounded-xl overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-white/5 text-gray-400 text-xs uppercase">
                    <tr>
                        <th class="px-6 py-4">ID</th>
                        <th class="px-6 py-4">标题</th>
                        <th class="px-6 py-4">分类</th>
                        <th class="px-6 py-4">日期</th>
                        <th class="px-6 py-4 text-right">操作</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    <tr v-for="post in posts" :key="post.id" class="hover:bg-white/5 transition-colors">
                        <td class="px-6 py-4 font-mono text-sm text-gray-500">#{{ post.id }}</td>
                        <td class="px-6 py-4 font-medium text-white">{{ post.title }}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 rounded text-xs bg-white/10">{{ post.category }}</span>
                        </td>
                        <td class="px-6 py-4 text-sm">{{ post.date }}</td>
                        <td class="px-6 py-4 text-right flex justify-end gap-3">
                            <button @click="router.push(`/admin/posts/${post.id}/edit`)" class="text-brand-blue hover:text-white" title="编辑">
                                <i class="ph-bold ph-pencil-simple"></i>
                            </button>
                            <button @click="deletePost(post.id)" class="text-red-500 hover:text-red-400" title="删除">
                                <i class="ph-bold ph-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
