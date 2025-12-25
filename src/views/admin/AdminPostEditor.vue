<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdmin } from '../../composables/useAdmin';
import { useCodeHighlight } from '../../composables/useCodeHighlight';

const route = useRoute();
const router = useRouter();
const { authFetch } = useAdmin();
const { enhanceCodeBlocks } = useCodeHighlight();

const isEdit = computed(() => route.params.id !== undefined);
const loading = ref(false);
const saving = ref(false);
const textareaRef = ref(null);
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.hcaor.org';

const form = ref({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: '公告',
    author: 'Admin',
    image: 'https://assets.hcaor.org/blog/blog-a.svg'
});

const tools = [
    { icon: 'ph-text-b', label: 'Bold', start: '<b>', end: '</b>' },
    { icon: 'ph-text-italic', label: 'Italic', start: '<i>', end: '</i>' },
    { icon: 'ph-text-h-two', label: 'H2', start: '<h2>', end: '</h2>' },
    { icon: 'ph-paragraph', label: 'P', start: '<p>', end: '</p>' },
    { icon: 'ph-text-align-center', label: 'Center', start: '<div class="text-center">', end: '</div>' },
    { icon: 'ph-quotes', label: 'Quote', start: '<blockquote>', end: '</blockquote>' },
    { icon: 'ph-list-bullets', label: 'List', start: '<ul>\n  <li>', end: '</li>\n</ul>' },
    { icon: 'ph-link', label: 'Link', start: '<a href="#">', end: '</a>' },
    { icon: 'ph-code', label: 'Code', start: '<code>', end: '</code>' },
    { icon: 'ph-code-block', label: 'Pre', start: '<pre><code class="language-js">', end: '</code></pre>' },
    { icon: 'ph-terminal-window', label: 'Block', start: '<code lang="bash" size="block">', end: '</code>' },
];

const insertTag = (tool) => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.value.content || ''; // Ensure text is string
    const selection = text.substring(start, end);

    const replacement = tool.start + selection + tool.end;
    
    form.value.content = text.substring(0, start) + replacement + text.substring(end);
    
    nextTick(() => {
        textarea.focus();
        // 如果有选中内容，光标放在替换后的末尾；如果没有，放在标签中间
        const newCursorPos = selection ? (start + replacement.length) : (start + tool.start.length);
        textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
};

// 加载文章数据
const fetchPost = async (id) => {
    loading.value = true;
    try {
        const res = await fetch(`${API_BASE}/api/posts/${id}`);
        if (res.ok) {
            const data = await res.json();
            form.value = { ...data };
        }
    } catch (e) {
        alert('加载失败');
    } finally {
        loading.value = false;
    }
};

const savePost = async () => {
    saving.value = true;
    try {
        const url = isEdit.value 
            ? `${API_BASE}/api/posts/${route.params.id}`
            : `${API_BASE}/api/posts`;
        
        const method = isEdit.value ? 'PUT' : 'POST';
        
        const res = await authFetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        if (res.ok) {
            router.push('/admin/posts');
        } else {
            const err = await res.json();
            alert(`保存失败: ${err.error}`);
        }
    } catch (e) {
        alert(`保存失败: ${e.message}`);
    } finally {
        saving.value = false;
    }
};

// 监听内容变化以更新高亮
watch(() => form.value.content, () => {
    enhanceCodeBlocks();
});

onMounted(() => {
    if (isEdit.value) {
        fetchPost(route.params.id);
    }
});
</script>

<template>
    <div class="h-[calc(100vh-6rem)] flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-bold text-white">{{ isEdit ? '编辑文章' : '新建文章' }}</h1>
            <div class="flex gap-4">
                <button @click="router.back()" class="text-gray-400 hover:text-white">取消</button>
                <button @click="savePost" :disabled="saving" class="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
                    {{ saving ? '保存中...' : '保存' }}
                </button>
            </div>
        </div>

        <div v-if="loading" class="flex-grow flex items-center justify-center">
            <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
        </div>

        <div v-else class="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            <!-- Left: Editor Form -->
            <div class="glass-panel border border-white/10 rounded-xl p-6 overflow-y-auto flex flex-col gap-4">
                <div>
                    <label class="block text-xs uppercase text-gray-500 font-bold mb-1">标题</label>
                    <input v-model="form.title" class="w-full bg-black/30 border border-white/10 rounded p-2 text-white" placeholder="文章标题">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs uppercase text-gray-500 font-bold mb-1">日期</label>
                        <input v-model="form.date" type="date" class="w-full bg-black/30 border border-white/10 rounded p-2 text-white">
                    </div>
                    <div>
                        <label class="block text-xs uppercase text-gray-500 font-bold mb-1">分类</label>
                        <input v-model="form.category" class="w-full bg-black/30 border border-white/10 rounded p-2 text-white">
                    </div>
                </div>

                <div>
                    <label class="block text-xs uppercase text-gray-500 font-bold mb-1">摘要</label>
                    <textarea v-model="form.excerpt" rows="2" class="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                </div>

                <div>
                    <label class="block text-xs uppercase text-gray-500 font-bold mb-1">封面图 URL</label>
                    <input v-model="form.image" class="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm">
                </div>

                <div class="flex-grow flex flex-col">
                    <label class="block text-xs uppercase text-gray-500 font-bold mb-2">正文 (HTML)</label>
                    
                    <!-- Toolbar -->
                    <div class="flex flex-wrap gap-2 mb-2 bg-black/20 p-2 rounded border border-white/5">
                        <button 
                            v-for="tool in tools" 
                            :key="tool.label" 
                            @click="insertTag(tool)"
                            class="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                            :title="tool.label"
                        >
                            <i class="ph-bold" :class="tool.icon"></i>
                        </button>
                    </div>

                    <textarea 
                        ref="textareaRef"
                        v-model="form.content" 
                        class="flex-grow w-full bg-black/30 border border-white/10 rounded p-4 text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-brand-blue resize-none"
                        placeholder="<p>开始编写...</p>"
                    ></textarea>
                </div>
            </div>

            <!-- Right: Preview -->
            <div class="glass-panel border border-white/10 rounded-xl p-8 overflow-y-auto">
                <div class="prose prose-invert prose-lg max-w-none">
                    <h1>{{ form.title || 'Untitled' }}</h1>
                    <div class="text-sm text-gray-500 mb-8">{{ form.date }} · {{ form.category }}</div>
                    <img v-if="form.image" :src="form.image" class="w-full h-48 object-cover rounded-lg mb-8 border border-white/10">
                    
                    <div v-html="form.content" class="preview-content"></div>
                </div>
            </div>
        </div>
    </div>
</template>