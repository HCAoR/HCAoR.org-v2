<script setup>
const emit = defineEmits(['navigate']);

const onNavigate = (section) => {
    emit('navigate', section);
};
</script>

<template>
    <footer class="bg-brand-black border-t border-white/10 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- 1. Logo区域 -->
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <img src="https://assets.hcaor.org/wiki-logo-v1.svg" alt="History and Culture Administration of Rhodes Island" width="150" class="img-invert">
                    </div>
                </div>

                <!-- 2. 网站导航 -->
                <div>
                    <h3 class="text-white font-bold mb-4">网站导航</h3>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" @click.prevent="onNavigate('home')" class="text-gray-500 hover:text-white">组织简介</a></li>
                        <li><a href="#" @click.prevent="onNavigate('projects')" class="text-gray-500 hover:text-white">旗下项目</a></li>
                        <li><a href="#" @click.prevent="onNavigate('blog')" class="text-gray-500 hover:text-white">博客</a></li>
                        <li><a href="#" @click.prevent="onNavigate('donate')" class="text-gray-500 hover:text-white">捐赠信息</a></li>
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
            <!-- 版权声明区域 -->
            <div class="border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-600">
                <p>Unless otherwise stated, all text content in blog posts is licensed under the CC BY-SA 4.0 license.</p>
                <br><p>This website operates for non-commercial purposes and may have redistributed or adapted derivative works of Intellectual Property (IP) belonging to Shanghai Hypergryph Network Technology Co., Ltd. and its affiliated entities (Hypergryph) for purposes of fair use. However, the copyright of these IPs remains the property of Hypergryph.</p>
                <br><p>For more infomation of our copyright policy, please visit <a href="https://wiki.hcaor.org/w/HCAoR:著作权">https://wiki.hcaor.org/w/HCAoR:著作权</a> . To report abuse, please contact <a href="mailto:abuse@hcaor.org">abuse@hcaor.org</a>.</p>
                <br><p>&copy; 2025 History and Culture Administration of Rhodes Island. Some rights reserved.</p>
            </div>
        </div>
    </footer>
</template>