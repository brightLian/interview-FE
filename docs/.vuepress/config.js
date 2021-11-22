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
        text: '其他链接',
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
        children: [
          {
            text: '简历准备',
            link: '/prepare/resume.md'
          },
          {
            text: 'JD 分析',
            link: '/prepare/JDAnalysis.md'
          },
          {
            text: '面试流程',
            link: '/prepare/process.md'
          },
          {
            text: '公司汇总',
            link: '/prepare/company.md'
          }
        ]
      },
      {
        text: 'HTML 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          {
            text: 'HTML 基础知识面试题',
            link: '/HTML/HTML.md'
          }
        ]
      },
      {
        text: 'CSS 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          {
            text: 'CSS 基础知识面试题',
            link: '/CSS/CSS.md'
          },
          {
            text: 'CSS 手写面试题',
            link: '/CSS/CSS手写代码.md'
          }
        ]
      },
      {
        text: 'JS 相关',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          {
            text: 'JS 数据类型',
            link: '/JS/数据类型.md'
          },
          {
            text: 'JS 执行机制',
            link: '/JS/执行机制.md'
          },
          {
            text: 'JS 原型与原型链',
            link: '/JS/原型与原型链.md'
          },
          {
            text: 'JS 作用域与闭包',
            link: '/JS/作用域与闭包.md'
          },
          {
            text: 'JS 同步异步',
            link: '/JS/同步异步.md'
          },
          {
            text: 'JS 其他杂乱知识点',
            link: '/JS/其他杂乱知识点.md'
          },
          {
            text: 'JS 手写代码',
            link: '/JS/JS手写代码.md'
          }
        ]
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
