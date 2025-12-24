import { ref } from 'vue';

const posts = ref([]);
const loading = ref(false);
const error = ref(null);

export function usePosts() {
    const fetchPosts = async () => {
        // 如果已经有数据，且没有报错，暂时不重复请求（可选，或者每次强制刷新）
        // 这里选择：如果是空数据且无错误，才请求。或者为了确保实时性，每次onMounted都请求？
        // 考虑到用户体验，我们允许重新请求。
        
        loading.value = true;
        error.value = null;
        try {
            const res = await fetch('https://api.hcaor.org/api/posts');
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
