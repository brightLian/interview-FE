# Vue-Router 相关

### 如何禁掉 a 标签默认事件，禁掉之后如何实现跳转。

可以通过 Vue-Router 提供的编程式导航来实现跳转。

- router.push：跳转，实际就是模拟 history.pushState 实现的。
- router.replace：重定向，实际就是模拟 history.replaceState 实现的。
- router.go：前进/后退多少步，实际就是模拟 history.go 实现的。

### 前端路由模式有哪些？:star2:

- 前端的路由模式一共有两种：history 模式和 hash 模式。
- h5 history 模式需要 server 端支持；hash 模式不需要。
- hash：
  - 特点：
    - hash 变化会触发网页跳转，即浏览器的前进后退
    - hash 变化不会刷新页面，SPA 必须的特点
    - hash 永远不会提交到服务端
  - 实现：
    - window.onhashchange：监听 hash 的改变
  - 使用场景：
    - toB 系统推荐使用，对 url 规范不敏感。
- h5 history：
  - 特点：
    - url 规范的路由，但跳转时不能刷新页面
    - 需要服务端配合，所有都返回首页路由，前端自己判断
  - 实现：
    - history.pushState：路由切换
    - window.onpopstate：监听浏览器的前进后退
  - 使用场景：
    - toC 系统考虑使用，需要服务端支持。
    - 涉及 SEO 时使用。

### 路由懒加载

Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

```javascript
const Xxx = () => import('./views/Xxx.vue');
```

### 前端路由原理

- hash 原理：基于 location.hash 来实现。
- history 原理：基于 History API 来实现。
