import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogListView from '../views/BlogListView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import DemoView from '../views/DemoView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/blog',
        name: 'blog',
        component: BlogListView
    },
    {
        path: '/post/:id',
        name: 'post-detail',
        component: BlogPostView
    },
    {
        path: '/demo',
        name: 'demo',
        component: DemoView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80 // 考虑到固定导航栏的高度
            };
        }
        return { top: 0 };
    }
});

export default router;
