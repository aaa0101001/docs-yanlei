import {defineConfig} from 'vitepress'
import {set_sidebar} from "../utils/auto-gen-sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "我的文档项目",
    description: "A VitePress Site",
    themeConfig: {
        outlineTitle: "目录",
        outline: [2, 6],
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '家', items: [
                    {text: '首页', link: '/'}
                    // ,
                    //     {text: '关于我', link: '/about'},
                    //     {text: '联系我', link: '/contact'},
                    //     {text: '博客', link: '/blog'}
                ]
            },
            {
                text: '自动生成侧边栏', items: [
                    {text: '自动生成侧边栏', link: '/docs/Interview/'}
                ]
            },
            {
                text: '项目', items: [
                    {text: 'GitHub', link: 'https://github.com/aaa0101001'},
                    {text: 'VitePress', link: 'https://vitepress.dev'},
                    {text: 'Vite', link: 'https://vitejs.dev'},
                    {text: 'Vue', link: 'https://vuejs.org'},
                    {text: 'Element Plus', link: 'https://element-plus.org'},
                    {text: 'VuePress', link: 'https://vitepress.dev'}
                ]

            },
            {
                text: '文档', items: [
                    {text: '面试', link: '/docs/Interview/index'},
                    {text: '算法', link: '/docs/Algorithm/index'},
                    {text: '计算机网络', link: '/docs/ComputerNetwork/index'},
                    {text: '操作系统', link: '/docs/OperatingSystem/index'}
                ]
            },

            // {text: '实例', link: '/markdown-examples'},
            // {text: 'GitHub', link: 'https://github.com/aaa0101001'},
            // {text: '关于我', link: '/about'},


        ],

        // sidebar: [
        //     {
        //         text: 'Examples',
        //         items: [
        //             {text: 'Markdown Examples', link: '/markdown-examples'},
        //             {text: 'Runtime API Examples', link: '/api-examples'}
        //         ]
        //     }
        // ],
        sidebar: {"/docs/Interview": set_sidebar("/docs/Interview")},

        socialLinks: [
            {icon: 'github', link: 'https://github.com/aaa0101001'}
        ],

        // 设置搜索框的样式
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },

        footer: {
            copyright: 'Copyright © 2022-present YanLei'
        }
    }
})
