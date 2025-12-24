import { nextTick } from 'vue';
import hljs from 'highlight.js';

export function useCodeHighlight() {
    const enhanceCodeBlocks = () => {
        nextTick(() => {
            const articleContent = document.querySelector('.prose');
            if (!articleContent) return;

            // 查找所有 code 标签
            const allCodes = articleContent.querySelectorAll('code');

            allCodes.forEach((code) => {
                // 防止重复处理
                if (code.closest('.code-block-wrapper') || code.dataset.enhanced) return;
                code.dataset.enhanced = 'true';

                const size = code.getAttribute('size');
                const langAttr = code.getAttribute('lang');
                
                // 获取语言：优先用 lang 属性，其次看 class
                let lang = langAttr || 'text';
                if (!langAttr) {
                    code.classList.forEach(cls => {
                        if (cls.startsWith('language-')) {
                            lang = cls.replace('language-', '');
                        }
                    });
                }

                // 如果指定了 lang，添加 class 让 hljs 识别
                if (langAttr && !code.classList.contains(`language-${langAttr}`)) {
                    code.classList.add(`language-${langAttr}`);
                }

                // 应用高亮
                hljs.highlightElement(code);

                // === BLOCK 模式 ===
                // 条件：明确指定 size="block" 或者 被 pre 包裹
                const isPreWrapped = code.parentElement && code.parentElement.tagName === 'PRE';
                
                if (size === 'block' || isPreWrapped) {
                    // 如果是 block 模式但没有被 pre 包裹，需要手动包裹 pre
                    let targetPre = code.parentElement;
                    
                    if (!isPreWrapped) {
                        const pre = document.createElement('pre');
                        // 插入 pre 到 code 之前
                        code.parentNode.insertBefore(pre, code);
                        // 移动 code 进去
                        pre.appendChild(code);
                        targetPre = pre;
                    }

                    // 映射显示语言
                    const langMap = {
                        'js': 'JavaScript', 'ts': 'TypeScript', 'py': 'Python',
                        'pwsh': 'PowerShell', 'bash': 'Bash', 'sh': 'Shell',
                        'html': 'HTML', 'css': 'CSS', 'json': 'JSON',
                        'vue': 'Vue', 'react': 'React'
                    };
                    const displayLang = langMap[lang] || lang.toUpperCase();

                    // 创建 Wrapper
                    const wrapper = document.createElement('div');
                    wrapper.className = 'code-block-wrapper';
                    
                    // 创建 Header
                    const header = document.createElement('div');
                    header.className = 'code-block-header';
                    
                    // 左侧
                    const left = document.createElement('div');
                    left.className = 'code-language-label';
                    left.innerHTML = `
                        <div class="code-dots">
                            <div class="code-dot code-dot-red"></div>
                            <div class="code-dot code-dot-yellow"></div>
                            <div class="code-dot code-dot-green"></div>
                        </div>
                        <span>${displayLang}</span>
                    `;
                    
                    // 右侧复制
                    const btn = document.createElement('button');
                    btn.className = 'code-copy-btn';
                    btn.innerHTML = '<i class="ph-bold ph-copy"></i> 复制';
                    
                    btn.onclick = async () => {
                        try {
                            await navigator.clipboard.writeText(code.textContent);
                            const originalHTML = btn.innerHTML;
                            btn.innerHTML = '<i class="ph-bold ph-check"></i> 已复制';
                            setTimeout(() => {
                                btn.innerHTML = originalHTML;
                            }, 2000);
                        } catch (err) {
                            console.error('Copy failed', err);
                            btn.innerHTML = '复制失败';
                        }
                    };
                    
                    header.appendChild(left);
                    header.appendChild(btn);
                    
                    // 组装
                    targetPre.parentNode.insertBefore(wrapper, targetPre);
                    wrapper.appendChild(header);
                    wrapper.appendChild(targetPre);
                } else {
                    // Thin / Inline 模式
                    if (size === 'thin') {
                        // 已经通过 CSS 处理样式，这里无需额外 JS
                    }
                }
            });
        });
    };

    return {
        enhanceCodeBlocks
    };
}
