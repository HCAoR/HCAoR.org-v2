import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogListView from '../views/BlogListView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import DemoView from '../views/DemoView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import LoginView from '../views/admin/LoginView.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';
import AdminPostList from '../views/admin/AdminPostList.vue';
import AdminPostEditor from '../views/admin/AdminPostEditor.vue';

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
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', redirect: '/admin/posts' },
            { path: 'posts', component: AdminPostList },
            { path: 'posts/new', component: AdminPostEditor },
            { path: 'posts/:id/edit', component: AdminPostEditor }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView
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
                top: 80 
            };
        }
        return { top: 0 };
    }
});

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const auth = localStorage.getItem('hcaor_auth');
        if (!auth) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
