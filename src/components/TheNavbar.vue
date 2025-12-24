<script setup>
import { ref } from 'vue';

const props = defineProps({
    navItems: {
        type: Array,
        required: true
    },
    isScrolled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['navigate']);

const mobileMenuOpen = ref(false);

const handleNavigate = (target) => {
    emit('navigate', target);
    mobileMenuOpen.value = false;
};
</script>

<template>
    <nav class="fixed w-full z-50 transition-all duration-300 border-b border-white/5"
         :class="{'glass-panel': isScrolled, 'bg-transparent py-4': !isScrolled, 'py-2': isScrolled}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 cursor-pointer" @click="handleNavigate('home')">
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
                           @click="handleNavigate(item.target)"
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
                   @click="handleNavigate(item.target)"
                   class="cursor-pointer text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    {{ item.name }}
                </a>
            </div>
        </div>
    </nav>
</template>