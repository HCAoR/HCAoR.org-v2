<script setup>
import { ref, computed, onMounted } from 'vue';

const currentView = ref('home'); // 'home', 'post-detail', 'blog', 'projects'
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);
const loading = ref(false);
const currentPost = ref(null);

// 导航项改为指向 Section ID
// 修复：将“联系与捐赠”添加至此，并移除原HTML中的单独按钮
const navItems = [
    { id: 1, name: '组织简介', target: 'about' },
    { id: 2, name: '旗下项目', target: 'projects' },
    { id: 3, name: '博客动态', target: 'blog' },
    { id: 4, name: '捐赠说明', target: 'donate' }
];

const features = [
    { title: '', desc: '', icon: 'ph-trophy' },
    { title: '', desc: '', icon: 'ph-users-three' },
    { title: '', desc: '', icon: 'ph-computer-tower' },
];

const stats = [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
];

const posts = ref([
    {
        id: 1,
        title: '字幕文件发布说明',
        excerpt: '我们制作的字幕文件将在 GitHub 上发布',
        content: '<p>您可以通过以下链接访问该存储库：</p><a href="https://github.com/HCAoR/something" target="_blank" rel="noopener noreferrer">https://github.com/HCAoR/something</a>',
        date: '2025-10-01',
        category: '公告',
        author: 'u202f',
        image: 'https://assets.hcaor.org/blog/blog-a.svg'
    },
    {
        id: 2,
        title: '测试1',
        excerpt: '梗概文本',
        content: '<p>test</p><p>这是一段用于展示常规段落样式的占位文字。它遵循了页面的整体设计语言，确保在深色背景下依然拥有良好的可读性。行高和字体大小都经过调整，以适应长时间的屏幕阅读。</p><h2>二级标题测试</h2><p>这是二级标题下的段落内容。二级标题可用于组织文章结构，使其层次分明。每个标题下方都有一条细线作为视觉分隔，引导读者的目光。</p><blockquote>这是一段引用的测试文字。它通过独特的背景色和左侧边框来突出显示，适合引用资料、名言或者需要特别强调的内容。</blockquote><p>以下是一个无序列表的示例：</p><ul><li>列表项目一：用于分条列举信息。</li><li>列表项目二：每个项目都有合适的间距。</li><li>列表项目三：继承了全局的链接 <a href="#">样式测试</a>。</li></ul><p>文章正文的测试内容到此结束。通过这些预设的样式，您可以轻松地撰写格式丰富的博客文章，而无需担心排版问题。</p>',
        date: '2025-11-02',
        category: '测试',
        author: 'u202f',
        image: 'https://assets.hcaor.org/blog/blog-b.svg'
    },
    {
        id: 3,
        title: '1',
        excerpt: '2',
        content: '3',
        date: '2025-11-23',
        category: '公告',
        author: '1',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000'
    }
]);

const featuredPosts = computed(() => posts.value.slice(0, 3));

const setView = (view, sectionId = null) => {
    currentView.value = view;
    if (sectionId && view === 'home') {
        // 如果切换回首页并指定了板块，稍微延迟以等待DOM渲染
        setTimeout(() => scrollToSection(sectionId), 100);
    } else {
        window.scrollTo(0, 0);
    }
};

const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
        // 如果已经在首页且点击Home，回到顶部
        if (currentView.value === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setView('home');
        }
        return;
    }

    // 确保在首页
    if (currentView.value !== 'home') {
        currentView.value = 'home';
        // 等待 Vue 渲染出首页 DOM
        setTimeout(() => {
            const el = document.getElementById(sectionId + '-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const el = document.getElementById(sectionId + '-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
};

const openPost = (post) => {
    currentPost.value = post;
    setView('post-detail');
};

const fetchPosts = async () => {
    loading.value = true;
    try {
        // 修复：去掉了这里的 Markdown 链接格式，使用纯字符串
        const res = await fetch('https://api.hcaor.org/api/posts');

        if (res.ok) {
            posts.value = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch posts", e);
    } finally {
        loading.value = false;
    }
};


const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    fetchPosts();
});

// Projects data seems missing in the original script but used in template (projectsList)
// Wait, looking at the HTML: <div v-for="project in projectsList" ...>
// But projectsList is NOT defined in the setup return object in the original HTML!
// Ah, wait. Let me check the read_files output again.
// Line 348: <div v-for="project in projectsList" ...
// Line 551: return { ..., projectsList (MISSING?), ... }
// Line 537-550: currentView, navItems, mobileMenuOpen, isScrolled, setView, scrollToSection, features, stats, posts, featuredPosts, loading, openPost, currentPost.
// `projectsList` is NOT returned!
// This means the original code might have a bug or I missed something?
// Let's check line 406...
// Ah, I see `features` and `stats` defined but not `projectsList`.
// Wait, looking at the template again...
// Line 348 uses `projectsList`.
// I suspect `projectsList` was forgotten in the original code or I need to define it.
// Since I want to make it work, I should probably define it or check if it was `projects`?
// No, `projects` usually refers to the section ID or something.
// Let's look at the template for projects section:
// Line 154: <!-- 2. 旗下项目 -->
// Line 164: <div class="grid grid-cols-1 lg:grid-cols-2 gap-12"> ... hardcoded content ... </div>
// Line 340: <div v-else-if="currentView === 'projects'" ...>
// Line 348: <div v-for="project in projectsList" ...>
// So the "All Projects" view relies on `projectsList`, which is missing.
// I should probably define `projectsList` with some dummy data or empty array to prevent errors.
// Or maybe it was intended to be `projects` but `posts` is for blog.
// I'll define a dummy projectsList to fix the bug.

const projectsList = [
    { title: '综合数据库', desc: '由我们运营、玩家社区驱动的《明日方舟》剧情向 Wiki。' },
    { title: '更多项目', desc: '敬请期待...' }
];

</script>

<template>
    <div id="app" class="flex flex-col min-h-screen">

        <!-- 导航栏 -->
        <nav class="fixed w-full z-50 transition-all duration-300 border-b border-white/5"
             :class="{'glass-panel': isScrolled, 'bg-transparent py-4': !isScrolled, 'py-2': isScrolled}">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0 cursor-pointer" @click="scrollToSection('home')">
                        <div class="flex items-center gap-2">
                            <!-- Placeholder Logo -->
                            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                <img src="https://assets.hcaor.org/wiki-icon-v1.svg" alt="Wiki Icon" class="w-8 h-8">
                            </div>
                            <img src="https://assets.hcaor.org/wordmark.svg" alt="HCAoR Wordmark" class="invert w-auto h-10">
                        </div>
                    </div>

                    <!-- Desktop Menu -->
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-8">
                            <a v-for="item in navItems"
                               :key="item.id"
                               @click="scrollToSection(item.target)"
                               class="cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-brand-blue text-gray-300 hover:text-white relative group">
                                {{ item.name }}
                                <!-- 简单的下划线 hover 效果 (可选) -->
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="-mr-2 flex md:hidden">
                        <button @click="mobileMenuOpen = !mobileMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none" title="Toggle menu">
                            <i class="ph-bold text-2xl" :class="mobileMenuOpen ? 'ph-x' : 'ph-list'"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Dropdown -->
            <div v-if="mobileMenuOpen" class="md:hidden glass-panel border-t border-gray-700">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a v-for="item in navItems"
                       :key="item.id"
                       @click="scrollToSection(item.target); mobileMenuOpen = false"
                       class="cursor-pointer text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        {{ item.name }}
                    </a>
                </div>
            </div>
        </nav>

        <!-- 主内容区域 -->
        <main class="flex-grow pt-16">
            <transition name="fade" mode="out-in">

                <!-- 首页: 包含所有核心板块 -->
                <div v-if="currentView === 'home'" key="home">

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
                                <!-- 修复：删除了多余的 </span> -->
                                <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                                    罗德岛历史与文化办公室
                                </h1>
                                <p class="mt-4 max-w-2xl text-xl text-gray-400">
                                    <em>"Research and Preserve"</em>
                                </p>
                                <div class="mt-10 flex gap-4">
                                    <button @click="scrollToSection('projects')" class="bg-white text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                        查看项目
                                    </button>
                                    <button @click="scrollToSection('about')" class="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:border-brand-blue hover:text-brand-blue transition-all">
                                        了解我们
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- About / Features -->
                        <div id="about-section" class="py-24 bg-brand-dark border-t border-white/5">
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
                    <section id="projects-section" class="py-24 bg-brand-dark border-t border-white/5">
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
                                        <!-- 封面待更新：wiki-cover.png -->
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
                    <section id="blog-section" class="py-24 bg-brand-black border-t border-white/5">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="flex justify-between items-end mb-12">
                                <div>
                                    <h2 class="text-3xl font-bold mb-2">博客</h2>
                                </div>
                                <button @click="setView('blog')" class="text-brand-blue hover:text-white flex items-center gap-2 transition-colors">
                                    全部文章 <i class="ph-bold ph-arrow-right"></i>
                                </button>
                            </div>

                            <div v-if="loading" class="flex justify-center py-12">
                                <i class="ph-bold ph-spinner animate-spin text-4xl text-brand-blue"></i>
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

                    <!-- 4. 捐赠信息 -->
                    <section id="donate-section" class="py-24 bg-brand-dark border-t border-white/5">
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

                <!-- 独立视图：详情页 -->
                <div v-else-if="currentView === 'post-detail'" key="post-detail" class="pt-12 pb-24">
                    <article v-if="currentPost" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button @click="setView('home', 'blog')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
                            <i class="ph-bold ph-arrow-left"></i> 返回
                        </button>

                        <header class="mb-12 text-center">
                            <div class="flex items-center justify-center gap-4 mb-6">
                                <span class="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold">{{ currentPost.category }}</span>
                                <span class="text-gray-500 text-sm">{{ currentPost.date }}</span>
                            </div>
                            <h1 class="text-3xl md:text-5xl font-bold mb-8 leading-tight">{{ currentPost.title }}</h1>
                            <div class="flex items-center justify-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                                    <i class="ph-fill ph-user text-xl"></i>
                                </div>
                                <div class="text-left">
                                    <div class="font-bold text-white">{{ currentPost.author }}</div>
                                    <div class="text-xs text-gray-500">管理员</div>
                                </div>
                            </div>
                        </header>

                        <div class="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                            <img :src="currentPost.image" class="w-full h-auto" alt="Post Cover">
                        </div>

                        <!-- 添加了 prose 类，确保 styles.css 中的样式生效 -->
                        <div class="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-brand-blue">
                            <p class="lead text-xl text-gray-300 mb-8">{{ currentPost.excerpt }}</p>
                            <div v-html="currentPost.content" class="space-y-6 text-gray-300"></div>
                        </div>
                    </article>
                </div>

                <!-- 独立视图：完整博客列表 (如果需要) -->
                <div v-else-if="currentView === 'blog'" key="blog" class="pt-12 pb-24 min-h-screen">
                    <div class="max-w-7xl mx-auto px-4 py-12">
                        <button @click="setView('home', 'blog')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
                            <i class="ph-bold ph-arrow-left"></i> 返回首页
                        </button>
                        <h1 class="text-4xl font-bold mb-8">所有文章</h1>
                        <!-- 复用文章列表组件代码... -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <article v-for="post in posts" :key="post.id" @click="openPost(post)" class="cursor-pointer group">
                                <!-- ... 简化版列表 ... -->
                                <div class="bg-brand-gray p-4 rounded-lg border border-white/5 hover:border-brand-blue">
                                    <h3 class="font-bold text-lg">{{ post.title }}</h3>
                                    <p class="text-gray-400 text-sm mt-2">{{ post.excerpt }}</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

                <!-- 独立视图：完整项目列表 (如果需要) -->
                <div v-else-if="currentView === 'projects'" key="projects" class="pt-12 pb-24 min-h-screen">
                    <div class="max-w-7xl mx-auto px-4 py-12">
                        <button @click="setView('home', 'projects')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
                            <i class="ph-bold ph-arrow-left"></i> 返回首页
                        </button>
                        <h1 class="text-4xl font-bold mb-8">所有项目</h1>
                        <!-- 复用项目列表组件代码... -->
                        <div class="grid grid-cols-1 gap-8">
                            <div v-for="project in projectsList" :key="project.title" class="bg-brand-gray p-6 rounded-xl border border-white/5">
                                <h3 class="font-bold text-xl">{{ project.title }}</h3>
                                <p class="text-gray-400 mt-2">{{ project.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </transition>
        </main>

        <!-- Footer -->
        <footer class="bg-brand-black border-t border-white/10 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <!-- 1. Logo区域 (修改: 改为只占1列) -->
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <img src="https://assets.hcaor.org/wiki-logo-v1.svg" alt="History and Culture Administration of Rhodes Island" width="150" class="img-invert">
                        </div>
                    </div>

                    <!-- 2. 网站导航 -->
                    <div>
                        <h3 class="text-white font-bold mb-4">网站导航</h3>
                        <ul class="space-y-2 text-sm text-gray-500">
                            <li><a href="#" @click.prevent="scrollToSection('home')" class="text-gray-500 hover:text-white">组织简介</a></li>
                            <li><a href="#" @click.prevent="scrollToSection('projects')" class="text-gray-500 hover:text-white">旗下项目</a></li>
                            <li><a href="#" @click.prevent="scrollToSection('blog')" class="text-gray-500 hover:text-white">博客</a></li>
                            <li><a href="#" @click.prevent="scrollToSection('donate')" class="text-gray-500 hover:text-white">捐赠信息</a></li>
                        </ul>
                    </div>

                    <!-- 3. 快捷链接 -->
                    <div>
                        <h3 class="text-white font-bold mb-4">快捷链接</h3>
                        <ul class="space-y-2 text-sm text-gray-500">
                            <li><a href="https://wiki.hcaor.org" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white">综合数据库</a></li>
                            <li><a href="https://asr.hcaor.org" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white">ASR Platform</a></li>
                            <li class="flex items-center gap-2"><a href="https://prts.wiki" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white">PRTS <i class="ph-bold ph-arrow-square-out"></i></a></li>
                        </ul>
                    </div>                    

                    <!-- 4. 联系 -->
                    <div>
                        <h3 class="text-white font-bold mb-4">联系</h3>
                        <ul class="space-y-2 text-sm text-gray-500">
                            <li class="flex items-center gap-2"><i class="ph-fill ph-envelope"></i><a href="mailto:staff@hcaor.org" class="text-gray-500 hover:text-white">staff@hcaor.org</a></li>
                            <li class="flex items-center gap-2"><i class="ph-fill ph-github-logo"></i><a href="https://github.com/HCAoR/something" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white">GitHub 主页</a></li>
                        </ul>
                    </div>
                </div>
                <!-- 版权声明区域：修改为居中显示并允许自然换行 -->
                <div class="border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-600">
                    <p>Unless otherwise stated, all text content in blog posts is licensed under the CC BY-SA 4.0 license.</p>
                    <br><p>This website operates for non-commercial purposes and may have redistributed or adapted derivative works of Intellectual Property (IP) belonging to Shanghai Hypergryph Network Technology Co., Ltd. and its affiliated entities (Hypergryph) for purposes of fair use. However, the copyright of these IPs remains the property of Hypergryph.</p>
                    <br><p>For more infomation of our copyright policy, please visit <a href="https://wiki.hcaor.org/w/HCAoR:著作权">https://wiki.hcaor.org/w/HCAoR:著作权</a> . To report abuse, please contact <a href="mailto:abuse@hcaor.org">abuse@hcaor.org</a>.</p>
                    <br><p>&copy; 2025 History and Culture Administration of Rhodes Island. Some rights reserved.</p>
                </div>
            </div>
        </footer>

    </div>
</template>
