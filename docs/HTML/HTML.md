# HTML 基础知识

### 前言

HTML 部分相对比较简单，能在实际中出现的面试题也比较少。    
但是它又是前端构建页面的一个基石，接下来我们进行这部分的学习。      
如果你时间紧迫，可以直接看标有:star2:的题目。

### DOCTYPE 的作用是什么？

**定义：** DOCTYPE 是 html5标准网页声明，且必须声明在文档的第一行。   
**作用：** 用来告诉浏览器的解析器以何种方式来解析文档，不同的解析方式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析。    
**类型：** 怪异类型和标准类型。

### 有哪些常见的 meta 标签？

- charset：用于定义 HTML 文档的编码格式
- http-equiv：相当于 http 的头文件，用于定义过期日期等
- viewport：用于控制视口相关属性
- description：SEO 相关，用于定义文档的描述
- keywords：SEO 相关，用于定义文档的关键字
- robots：SEO 相关，定义蜘蛛在文档中的爬取路径

后面上个较为重要，主要涉及到 SEO 3要素 TDK 中的 DK 以及 robots。

### src 和 href 的区别？

- src：指外部资源文件，浏览器解析到该元素时，会暂停对其他资源的下载和处理直到该资源加载、编译、执行完成。(script 需要放在最下面的原因)
- href：指文档与引用资源的关系，浏览器解析到该元素时，会并行下载资源，不会停止对当前文档的处理。

### script 标签中的 defer 和 async 的区别？:star2:

两者都会立即下载脚本，但是注意脚本的执行时机不同

- defer：立即下载脚本，在文档解析完毕后执行
- async：立即下载脚本，在文档下载完毕后立即执行（注意文档对脚本文件有依赖时不要使用）
  <img src="/image/HTML/scriptDeferAndAsync.png" width = "900" height = "170" />

### 什么是 data- 属性？

是 HTML 的数据属性，用来将数据存储于标准的 HTML 中作为额外的信息，我们可以通过 js 来访问它。

### HTML5 的特性有哪些？:star2:

- 标签相关：新增了一些更加语义化的标签，废除了一些表现型的标签（i、u、tt 等）
- 存储相关：丰富了前端的存储方式，包括 sessionStorage、localStorage、indexedDB 等
- 新增 API：丰富了一些前端功能，比如 canvas、音视频相关、地图、websocket 等

### 常见块级元素和行内元素有哪些？

- 块级元素：div、p、h1-h6、header、footer、article、section 等
- 行内元素：span、a、img、input、textarea、select、sub、sup 等

### 谈谈你对 HTML 语义化的理解

- 定义：是指使用恰当的 HTML 标签，让页面具有良好的结构。
- 优点：
  - 对开发者友好：增加了代码的可读性，方便开发者阅读和维护
  - 对 SEO 友好：良好的代码结构方便搜索引擎对抓取
  - 对残障人士友好：方便读屏软件为用户提供无障碍阅读功能

### 前端的存储方式有哪些？:star2:

- cookie：存储在浏览器本地，大小只有4k，需要设置过期时间也可以手动清除，会在同源的请求中自动携带。
- sessionStorage：存储在浏览器本地，大小为5M，只在本次会话中有效也可以手动清除，不会在请求中携带。
- localStorage：存储在浏览器本地，大小为5M，没有过期时间但是可以手动清楚，不会再请求中携带。

### 设计一个有过期时间的 localStorage

分为两个 key 来存储：第一个 key 用于存储过期时间、第二个 key 用来存储真实的数据。

- 第一次请求服务端获取数据时：在 localStorage 中分别存储数据和过期时间。
- 后续请求时：先判断过期时间是否过期。
- 如果没有过期：直接使用已经存储的数据。
- 如果已经过期：去服务端请求新的数据，并重复第一步的操作。

### storage 在无痕模式下被禁用，如果解决？

- 必须使用 storage 时，判断是无痕模式给用户强提示或者通过接口先暂时存储数据。
- 非必须使用 storage 时，可以暂时存储在全局或者 cookie 中，但是要及时释放。

### 如何判断浏览器时无痕模式？

在无痕模式中 storage 对象可能是存在的，但是它的 setItem 方法是不可用的，所以采用下面的方法。

```javascript
// 判断用户是否开启无痕模式
function isTraceless () {
  try {
    storage.setItem('test-key', 'test-value');
    storage.removeItem('key');
    return true;
  } catch (e) {
    return false;
  }
}
```
