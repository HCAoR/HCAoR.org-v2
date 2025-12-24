<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCodeHighlight } from '../composables/useCodeHighlight';

const router = useRouter();
const { enhanceCodeBlocks } = useCodeHighlight();

onMounted(() => {
    enhanceCodeBlocks();
});
</script>

<template>
    <div class="pt-12 pb-24 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 py-12 prose prose-invert">
            <button @click="router.push('/')" class="no-underline mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
                <i class="ph-bold ph-arrow-left"></i> 返回首页
            </button>
            
            <h1>Code Highlight Demo</h1>
            <p>This page demonstrates the various code block styles.</p>

            <h2>1. Inline Code (Thin Mode)</h2>
            <p>You can use standard <code>inline code</code> or specify <code size="thin">size="thin"</code> explicitly.</p>
            <p>Example: Run <code lang="bash">npm install</code> to install dependencies.</p>

            <h2>2. Standard Block Code (Markdown Style)</h2>
            <p>Standard <code>&lt;pre&gt;&lt;code&gt;</code> blocks:</p>
            <pre><code class="language-js">// JavaScript Example
const greet = (name) => {
    console.log(`Hello, ${name}!`);
};
greet('World');</code></pre>

            <h2>3. Custom Block Code (HTML Attribute Style)</h2>
            <p>Using <code>&lt;code lang="..." size="block"&gt;</code> without pre:</p>
            
            <h3>Bash</h3>
            <code lang="bash" size="block"># This is a bash script
git clone https://github.com/example/repo.git
cd repo
npm install</code>

            <h3>Python</h3>
            <code lang="py" size="block">def hello():
    print("Hello from Python")

if __name__ == "__main__":
    hello()</code>

            <h3>JSON</h3>
            <code lang="json" size="block">{
  "name": "hcaor-frontend",
  "version": "1.0.0",
  "private": true
}</code>

            <h3>HTML</h3>
            <code lang="html" size="block">&lt;div class="container"&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
    &lt;p&gt;Content&lt;/p&gt;
&lt;/div&gt;</code>
        </div>
    </div>
</template>
