# BOM 相关知识点

### 如何识别浏览器各个类型？

通过 navigator.userAgent 来获取

### navigator 相关？

navigator 功能是用于获取浏览器相关信息。

- 常用操作：
  - navigator.userAgent：获取浏览器类型
  - navigator.onLine：获取浏览器是否联网

### screen 相关？

screen 功能是用于获取屏幕相关信息。

- 常用操作：
  - screen.width：获取屏幕宽度
  - screen.height：获取屏幕高度

### location 相关？:star2:

location 功能是用于获取地址相关信息。

- 常用操作：
  - location.href：获取整个页面链接
  - location.protocol：获取协议
  - location.hostname：获取主机名
  - location.origin：获取协议+主机名
  - location.pathname：获取路径
  - location.search：获取 query 参数，链接中 ? 后面的
  - location.hash：获取 hash 参数，链接中 # 后面的

### history 相关？

history 功能是用于获取浏览器浏览历史。

- 常用操作：
  - history.length：获取浏览器页面访问层级
  - history.back()：返回上一层页面
  - history.forward()：前进下一层页面
  - history.go()：正数前进，负数后退，0刷新页面
  - history.pushState()：添加历史条目（Vue-router 就是基于此实现）
  - history.replaceState()：修改历条目（Vue-router 就是基于此实现）

### 使用 JS 改变 URL 且页面不刷新？:star2:

1. 改变 hash：改变 hash 不会刷新页面，也会改变 URL，也能监听 hashchange 事件进行页面的渲染。
2. 利用 history：通过 history.pushState() 或者 history.replaceState()。
