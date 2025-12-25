import { ref } from 'vue';

const posts = ref([]);
const loading = ref(false);
const error = ref(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.hcaor.org';

export function usePosts() {
    const fetchPosts = async () => {
        // ...
        
        loading.value = true;
        error.value = null;
        try {
            const res = await fetch(`${API_BASE}/api/posts`);
            if (res.ok) {
                const data = await res.json();
                posts.value = data || [];
            } else {
                // 构造包含状态码的错误信息
                throw new Error(`无法连接到博客 Api，请检查你的网络配置或稍后再试 (HTTP ${res.status})`);
            }
        } catch (e) {
            console.error("Failed to fetch posts", e);
            // 如果是 fetch 自身的网络错误（如断网），可能没有 status
            // e.message 通常会包含 "Failed to fetch"
            if (e instanceof TypeError && e.message === 'Failed to fetch') {
                error.value = "无法连接到博客 Api，请检查你的网络配置 (Network Error)";
            } else {
                error.value = e.message;
            }
            posts.value = []; // 出错时清空数据
        } finally {
            loading.value = false;
        }
    };

    return {
        posts,
        loading,
        error,
        fetchPosts
    };
}
