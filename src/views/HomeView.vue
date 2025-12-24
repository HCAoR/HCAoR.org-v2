<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePosts } from '../composables/usePosts';

const router = useRouter();
const { posts, loading, error, fetchPosts } = usePosts();

const featuredPosts = computed(() => posts.value.slice(0, 3));

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const offset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

onMounted(() => {
    fetchPosts();
});

const navigateTo = (path) => {
    router.push(path);
};

const openPost = (post) => {
    router.push({ name: 'post-detail', params: { id: post.id } });
};
</script>

<template>
    <div class="home-view">
        <!-- 1. 组织简介 (Hero + Mission + Stats) -->
        <section id="home-section">
            <!-- Hero Section -->
            <div class="relative overflow-hidden bg-brand-black">
                <!-- 背景装饰 -->
                <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue rounded-full opacity-10 blur-[100px] animate-pulse"></div>
                    <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full opacity-10 blur-[100px]"></div>
                    <!-- 网格线 -->
                    <div class="absolute inset-0 background-grid"></div>
                </div>

                <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
                    <span class="inline-block py-1 px-3 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-bold tracking-wider mb-6 uppercase">
                        History and culture administration of Rhodes Island
                    </span>
                    <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        罗德岛历史与文化办公室
                    </h1>
                    <p class="mt-4 max-w-2xl text-xl text-gray-400">
                        <em>"Research and Preserve"</em>
                    </p>
                    <div class="mt-10 flex gap-4">
                        <!-- 修改为路由跳转或锚点 -->
                        <button @click="scrollTo('projects-section')" class="bg-white text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center">
                            查看项目
                        </button>
                        <button @click="scrollTo('about-section')" class="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center">
                            了解我们
                        </button>
                    </div>
                </div>
            </div>

            <!-- About / Features -->
            <div id="about-section" class="py-24 bg-brand-dark border-t border-white/5 scroll-mt-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-3xl font-bold mb-4">我们是什么</h2>
                        <p class="text-gray-400 max-w-2xl mx-auto">我们是一个由《明日方舟》玩家自发创立的组织，目前致力于对《明日方舟》及其衍生作品进行考据研究。</p>
                        <br>
                        <p class="text-gray-400 max-w-2xl mx-auto">我们与鹰角网络及其关联实体没有资金及组织上的联系。</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. 旗下项目 -->
        <section id="projects-section" class="py-24 bg-brand-dark border-t border-white/5 scroll-mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">旗下项目</h2>
                        <p class="text-gray-400">我们正在推行的公益计划与社区项目。</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div class="bg-brand-gray rounded-2xl overflow-hidden border border-white/5 group hover:border-brand-blue/50 transition-all">
                        <div class="h-64 overflow-hidden relative">
                            <img src="https://assets.hcaor.org/wiki-cover.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="HCAoR General Database Cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-brand-gray to-transparent"></div>
                        </div>
                        <div class="p-8">
                            <h3 class="text-xl font-bold mb-3">
                                <img src="https://assets.hcaor.org/wiki-icon-v1.svg" alt="Wiki Icon" class="img-medium img-invert">综合数据库
                            </h3>
                            <p class="text-gray-400 leading-relaxed">由我们运营、玩家社区驱动的《明日方舟》剧情向 Wiki。<br>*目前仍在筹备中，即将上线，敬请期待 S∞n™</p>
                            <br>
                            <div class="flex flex-col gap-4">
                                <button onclick="window.location.href='https://wiki.hcaor.org'" class="bg-white text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                    查看 Wiki
                                </button>
                                <button onclick="window.location.href='https://github.com/HCAoR/General-Database'" class="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center gap-2">
                                    <img src="https://assets.hcaor.org/github-mark-white.svg" alt="GitHub Icon" class="img-small"> 访问项目 GitHub 门户
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- 3. Blog / Latest News -->
        <section id="blog-section" class="py-24 bg-brand-black border-t border-white/5 scroll-mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">博客</h2>
                    </div>
                    <button @click="navigateTo('/blog')" class="text-brand-blue hover:text-white flex items-center gap-2 transition-colors">
                        全部文章 <i class="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                <div v-if="loading" class="flex justify-center py-12">
                    <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
                </div>

                <!-- Error State for Home Page -->
                <div v-else-if="error" class="flex flex-col items-center justify-center py-8 text-center border border-dashed border-red-500/30 rounded-xl bg-red-500/5">
                    <i class="ph-bold ph-warning-circle text-3xl text-red-500 mb-2"></i>
                    <p class="text-gray-400">{{ error }}</p>
                    <button @click="fetchPosts" class="mt-4 text-sm text-brand-blue hover:text-white underline">重试</button>
                </div>

                <div v-else-if="featuredPosts.length === 0" class="text-center py-12 text-gray-500">
                    暂无最新动态
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <article v-for="post in featuredPosts" :key="post.id"
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
        </section>

        <!-- 4. 捐赠信息 (Keep on Home Page) -->
        <section id="donate-section" class="py-24 bg-brand-dark border-t border-white/5 scroll-mt-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold mb-4">支持我们</h2>
                    <p class="text-gray-400 max-w-2xl mx-auto">您的每一笔捐赠都将直接用于综合数据库及本组织旗下其他项目的建设与运营。</p>
                    <p class="text-gray-400 max-w-2xl mx-auto">提请注意：根据相关法律规定，若要向我们进行捐赠，您必须是中华人民共和国居民或注册在中国的组织。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-brand-gray p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center gap-3 mb-6">
                                <i class="ph-bold ph-currency-cny text-3xl text-brand-blue"></i>
                                <h3 class="text-2xl font-bold">国内渠道</h3>
                            </div>
                            <p class="text-gray-400 mb-6">我们支持通过以下平台进行一次性或月度订阅捐赠。</p>
                            <div class="grid grid-cols-1 gap-4">
                                <button onclick="window.location.href='https://space.bilibili.com/571500824'" class="flex items-center justify-between p-4 rounded-xl bg-[#FB7299] text-white hover:opacity-90 transition-opacity font-bold">
                                    <span><i class="ph-bold ph-lightning mr-2"></i> Bilibili 充电（不推荐）</span>
                                    <i class="ph-bold ph-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Fiat / Methods -->
                    <div class="bg-brand-gray p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center gap-3 mb-6">
                                <i class="ph-bold ph-credit-card text-3xl text-brand-blue"></i>
                                <h3 class="text-2xl font-bold">国际渠道</h3>
                            </div>
                            <p class="text-gray-400 mb-6">我们支持通过以下平台进行一次性或月度订阅捐赠。</p>
                            <div class="grid grid-cols-1 gap-4">
                                <button onclick="window.location.href='https://ko-fi.com/u_0000'" class="flex items-center justify-between p-4 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold">
                                    <span><i class="ph-bold ph-coffee mr-2"></i> Ko-Fi</span>
                                    <i class="ph-bold ph-arrow-right"></i>
                                </button>
                                <button onclick="window.location.href='https://patreon.com/U_0000'" class="flex items-center justify-between p-4 rounded-xl bg-[#f96854] text-white hover:opacity-90 transition-opacity font-bold">
                                    <span><i class="ph-bold ph-coffee mr-2"></i> Patreon</span>
                                    <i class="ph-bold ph-arrow-right"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>