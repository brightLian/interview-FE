module.exports = {
  title: 'BrightLian 前端面试',
  themeConfig: {
    logo: '/image/logo.jpg',
    head: [
      ['link', { rel: 'icon', href: '/image/logo.jpg' }]
    ],
    navbar: [
      { text: '首页', link: '/' },
      { text: '进入', link: '/introduction' },
      {
        text: '其它链接',
        children: [
          {
            text: '前端算法',
            link: 'https://github.com/brightLian/leetcode-FE'
          },
          {
            text: '前端杂谈',
            link: 'https://github.com/brightLian/talk-FE'
          }
        ]
      },
      { text: 'github', link: 'https://github.com/brightLian/interview-FE' }
    ],
    sidebar: [
      '/introduction.md',
      {
        text: '面试前准备工作',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/准备工作/简历准备.md', '/准备工作/JD分析.md', '/准备工作/面试流程.md', '/准备工作/公司选择.md']
      },
      {
        text: 'HTML 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/HTML/HTML.md']
      },
      {
        text: 'CSS 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/CSS/CSS.md', '/CSS/CSS手写代码.md']
      },
      {
        text: 'JS 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/JS/数据类型.md', '/JS/执行机制.md', '/JS/原型与原型链.md', '/JS/作用域与闭包.md', '/JS/同步异步.md', '/JS/其它杂乱知识点.md', '/JS/JS手写代码.md']
      },
      {
        text: '浏览器',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/浏览器相关/浏览器相关知识点.md']
      },
      {
        text: 'DOM',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/DOM/DOM相关知识点.md']
      },
      {
        text: 'BOM',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/BOM/BOM相关知识点.md']
      },
      {
        text: '计算机基础',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/计算机基础/HTTP.md', '/计算机基础/TCP.md', '/计算机基础/缓存.md', '/计算机基础/计算机基础其它知识点.md']
      },
      {
        text: '算法',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/算法/前端算法.md']
      },
      {
        text: '前端框架',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/前端框架/Vue的基本使用.md', '/前端框架/Vue的高级特性.md', '/前端框架/Vue的实现原理.md', '/前端框架/VueRouter.md', '/前端框架/VueX.md', '/前端框架/react.md', '/前端框架/前端框架原理.md']
      },
      {
        text: '性能优化',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/性能优化/性能优化.md']
      },
      {
        text: '前端工程化',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/前端工程化/git.md', '/前端工程化/webpack.md', '/前端工程化/vite.md', '/前端工程化/前端工程化零散知识.md']
      },
      {
        text: '前端安全',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/前端安全/前端安全.md']
      },
      {
        text: 'Node 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/Node/Node.md']
      },
      {
        text: '开放性问题',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/开放性问题/开放性问题.md']
      }
    ],
    sidebarDepth: 2,
  },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ]
};
