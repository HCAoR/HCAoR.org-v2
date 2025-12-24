<script setup>
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '../composables/usePosts';
import { useCodeHighlight } from '../composables/useCodeHighlight';

const route = useRoute();
const router = useRouter();
const { posts, loading, error, fetchPosts } = usePosts();
const { enhanceCodeBlocks } = useCodeHighlight();
const showShareMenu = ref(false);
const copySuccess = ref(false);

const currentPost = computed(() => {
    const id = route.params.id;
    return posts.value.find(p => String(p.id) === String(id));
});

onMounted(() => {
    fetchPosts();
});

// 监听 content 变化，一旦渲染了新内容，就重新高亮
watch(currentPost, (newPost) => {
    if (newPost) {
        enhanceCodeBlocks();
    }
}, { immediate: true });

const toggleShareMenu = () => {
    showShareMenu.value = !showShareMenu.value;
    if (!showShareMenu.value) {
        copySuccess.value = false;
    }
};

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        copySuccess.value = true;
        setTimeout(() => {
            showShareMenu.value = false;
            copySuccess.value = false;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
};

const printPage = () => {
    showShareMenu.value = false;
    window.print();
};
</script>

<template>
    <div class="pt-12 pb-24">
        <div v-if="loading && !currentPost" class="flex justify-center py-24">
            <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
        </div>

        <article v-else-if="currentPost" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <button @click="router.back()" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors print:hidden">
                <i class="ph-bold ph-arrow-left"></i> 返回
            </button>

            <header class="mb-12 text-center">
                <div class="flex items-center justify-center gap-4 mb-6">
                    <span class="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold">{{ currentPost.category }}</span>
                    <span class="text-gray-500 text-sm">{{ currentPost.date }}</span>
                </div>
                <h1 class="text-3xl md:text-5xl font-bold mb-8 leading-tight">{{ currentPost.title }}</h1>
                <div class="flex flex-col items-center gap-6">
                    <div class="flex items-center justify-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center print:hidden">
                            <i class="ph-fill ph-user text-xl"></i>
                        </div>
                        <div class="text-left">
                            <div class="font-bold text-white print:text-black">{{ currentPost.author }}</div>
                            <div class="text-xs text-gray-500 print:text-gray-500">管理员</div>
                        </div>
                    </div>

                    <!-- 分享按钮区域 -->
                    <div class="relative print:hidden">
                        <button @click.stop="toggleShareMenu" class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300">
                            <i class="ph-bold ph-share-network"></i> 分享
                        </button>
                        
                        <!-- Dropdown -->
                        <transition 
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <div v-if="showShareMenu" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-[#1e1e1e] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
                                <button @click="copyLink" class="flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors text-gray-300 hover:text-white text-sm w-full">
                                    <i class="ph-bold" :class="copySuccess ? 'ph-check text-green-500' : 'ph-link'"></i>
                                    <span>{{ copySuccess ? '已复制' : '复制链接' }}</span>
                                </button>
                                <button @click="printPage" class="flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors text-gray-300 hover:text-white border-t border-white/5 text-sm w-full">
                                    <i class="ph-bold ph-printer"></i>
                                    <span>打印网页</span>
                                </button>
                            </div>
                        </transition>
                        
                        <!-- 透明遮罩，用于点击外部关闭 -->
                        <div v-if="showShareMenu" @click="showShareMenu = false" class="fixed inset-0 z-40 cursor-default"></div>
                    </div>
                </div>
            </header>

            <div class="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl print:shadow-none print:border-none">
                <img :src="currentPost.image" class="w-full h-auto" alt="Post Cover">
            </div>

            <div class="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-brand-blue print:text-black print:prose-headings:text-black">
                <p class="lead text-xl text-gray-300 mb-8 print:text-gray-700">{{ currentPost.excerpt }}</p>
                <div v-html="currentPost.content" class="space-y-6 text-gray-300 print:text-gray-800"></div>
            </div>
        </article>
        
        <div v-else class="text-center py-24">
            <p>文章未找到。</p>
            <button @click="router.push('/')" class="mt-4 text-brand-blue hover:underline">返回首页</button>
        </div>
    </div>
</template>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }
  .print\:text-black {
    color: black !important;
  }
  .print\:text-gray-500 {
    color: #6b7280 !important;
  }
  .print\:text-gray-700 {
    color: #374151 !important;
  }
  .print\:text-gray-800 {
    color: #1f2937 !important;
  }
  .print\:shadow-none {
    box-shadow: none !important;
  }
  .print\:border-none {
    border: none !important;
  }
  
  /* 强制打印背景色 */
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background-color: white !important;
    color: black !important;
  }
  
  /* 隐藏其他不必要的元素 */
  nav, footer, .background-grid {
    display: none !important;
  }
}
</style>
