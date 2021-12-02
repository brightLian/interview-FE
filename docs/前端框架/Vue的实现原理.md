# Vue 的实现原理

目前粗略写下，即将更新

### 如何理解 MVVM 模型？:star2:

- MVVM 模型分为了三层：视图层(V-View 层)、数据层（M-Model 层）、数据视图层（VM-ViewModel 层）
  - 数据层：泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。
  - 视图层：也就是用户界面。前端主要由 HTML 和 CSS 来构建。
  - 数据视图层：前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。
- 其中最重要的是数据视图层，其中的核心概念就是数据驱动视图。
  - MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层。
  - 我们再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了。
  - 我们只需要处理和维护 ViewModel，当组件数据变化时，视图就会得到相应更新。
  - 这样 View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层。
  - 这个解耦是至关重要的，它是前后端分离方案实施的重要一环。   	
    ![MVVM](/image/前端框架/mvvm.png)

### 为什么说 Vue 是渐进式框架？

- 所谓渐进式框架，就是把框架分层。
- 最核心的部分就是视图层渲染、然后往外组件机制，早加入路由机制，再加入状态管理，最外层则是构建工具。
- 所谓分层就是你可以只用最核心的视图层渲染功能来快速开发一些需求，也可以使用一整套全家桶来开发大型应用。

### Vue 响应式的实现原理？:star2:

- 响应式系统：响应式系统是 Vue 最重要的特性之一，数据模型仅仅是普通的 JS 对象，而当你修改它们时，视图会进行更新。
- 响应式系统赋予框架重新渲染的能力，其重要的组成部分就是变化侦测，变化侦测的作用就是当数据变化时，会通知视图进行相应的更新。
- 变化侦测的分类：
  - 拉：当状态发生变化时，不知道哪个状态发生改变，只知道状态变了，框架内部收到信号后进行对比找出哪个 DOM 需要重新渲染。（React 就是）
  - 推：当状态发生变化时，框架内部立刻就知道哪些状态改变了，Vue 中当状态变化后会通知到组件，组件内部再使用虚拟 DOM 比对。
- 进行变化侦测的方式：
  - vue3.0 之前的版本采用 defineProperty：
    - 原理：
      - Object 通过 Object.defineProperty 将属性转化为 getter/setter 的形式来追踪变化（通过 Observer 这类进行深度递归）。
      - 读取数据时会触发 getter，修改数据时会触发 setter。
      - Vue 在 getter 中收集有哪些依赖使用了数据，当 setter 触发时，去通知 getter 中收集的依赖数据发送了变化。
      - 收集依赖需要为依赖找一个存储的地方，为此创建了 Dep，他用来收集依赖、删除依赖和向依赖发送消息。
      - 所谓依赖就是 Watcher、只有 Watcher 触发的 getter 才会收集依赖，哪个 watcher 出发了 getter 就把哪个 Watcher 收集到 Dep 中。
      - Watcher 的原理实现把自己设置到全局唯一的指定位置，然后读取数据，因为读取数据会触发这个数据的 getter。
      - 在 getter 中就会从全局唯一的那个位置读取当前正在读取数据的 Watcher，并把这个 Watcher 收集到 Dep 中去。
      - 此外 Vue 还创建了 Observer 类，它的作用是把一个 object 中的所有数据都转换为响应式的，也就是会侦测 object 中所有数据的变化。
    - 优点：
      - 兼容性好，支持 IE9 版本浏览器。
    - 缺点：
      - 深度监听时需要递归到底，一次性计算量大。
      - 无法监听对象新增、删除属性。（给 data 赋值时需使用 vm.$set 和 vm.$delete）
      - 无法原生监听数组，需要特殊处理。（重新定义数组原型，重写 push、pop 等方法后，通过拦截原型实现）
      - 无法监听数组的部分方法（this.list.length = 0、this.list\[0\] = 1等方法）
  - vue3.0 之后的版本：
    - 原理：通过 proxy 和 reflect 实现。
    - 优点：
      - 深度监听时不需要递归到底，而在使用时才会递归。
      - 可以直接深度监听对象和数组。
      - 拦截方式多，可以直接监听 data 属性的新增、删除。
    - 缺点：
      - 兼容性不好，且无法 polyfill。
- 总结：
  - Data 通过 Observer 转化为 getter/setter 的形式追踪变化。
  - 当外界通过 Watcher 读取数据时，会触发 getter 从而将 Watcher 添加到依赖中。
  - 当数据发生了变化时，会触发 setter，从而向 Dep 中的依赖（Watcher）发送通知。
  - Watcher 接收到通知后，会向外界发送通知，变化通知到外界后触发视图更新或者触发用户的某些回调函数。

<img src="/image/前端框架/reactive.png" width = "600" height = "300" />

### 双向数据绑定原理？

- input 元素的 value = this.name；
- 绑定 input 事件 this.name = $event.target.value；
- data 触发重新渲染

### nextTick 的实现原理？

- 实际是利用微任务的执行时间，先于 DOM 的渲染，先于宏任务的执行时间。
- 只需要将 nextTick 里的代码放在 DOM 渲染之后执行，就可以访问到新的 DOM 了。
- 通俗一点就是可以把 nextTick 想像成一个特殊的宏任务，放在了本次事件循环的末尾调用。

### virtual dom 实现原理？:star2:

- 虚拟 DOM 原理：用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象。在渲染之前，会使用新生成的虚拟节点树和上一次的虚拟节点树进行对比，只渲染不同的部分。
- Vue 中的虚拟 DOM：虚拟 DOM 在 Vue 中所做的事就是提供虚拟节点 vnode 和对新旧两个 vnode 进行比对，并根据比对结果进行 DOM 操作来更新视图。
- diff 算法： 比较两棵虚拟 DOM 树的差异。
- patch 算法：将两个虚拟 DOM 对象的差异应用到真正的 DOM 树上。
- 优势：
  - 虚拟 DOM 不会立马进行重排与重绘操作
  - 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗
  - 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

### 如何用 JS 模拟 DOM 结构？

```html

<div id="id1" class="container">
  <p>vdom</p>
  <ul class="ul" style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

```json
{
  "tag": "div",
  "props": {
    "id": "id1",
    "className": "container"
  },
  "children": [
    {
      "tag": "p",
      "children": "vdom"
    },
    {
      "tag": "ul",
      "props": {
        "className": "ul",
        "style": "font-size: 20px"
      },
      "children": {
        "tag": "li",
        "children": "a"
      }
    }
  ]
}
```

### diff 算法是什么？:star2:

diff 算法实际是对两个 DOM 树进行比较，如果完全比较时间复杂度为 O(n^3)。 但是在前端中，很少出现越级移动 DOM 元素，所以虚拟 DOM 的 diff 算法只会对同一个层级进行对比，时间复杂度为 O(n)。

- 核心：
  - 同层比较，不跨级比较。
  - tagName 不相同，则直接删掉重建，不再深度比较
  - tagName 和 key 两者都相同，则认为节点相同，不再深度比较。

### patch 算法是什么？:star2:

patch 算法实际是通过对新老 VNode 树进行对比，根据比较结果进行最小单位的修改视图。

- 核心： updateChildren：这个也是 diff-patch 算法的核心。主要通过 while 循环去对比2棵树的子节点来更新 DOM，通过对比新的来改变旧的，以达到新旧统一的目的。

### 列表组件中写 key，其作用是什么？:star2:

diff 算法中通过 tagName 和 key 来判断 DOM 节点是否相同。减少组件的渲染次数，提升渲染性能。

- 更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
- 更快：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。

### 模板编译是什么？

Vue 是通过 vue-template-compiler 进行模版编译的。

- 定义：模板转换为 JS 代码，叫做模板编译。
- 过程：
  - 模板编译为 render 函数，执行 render 函数返回 vnode。
  - 基于 vnode 再执行 patch 和 diff。
  - 使用 webpack 和 vue-loader，在开发环境进行编译。

### Vue 组件是如何渲染和更新的？

- 初次渲染过程：
  - 解析模板为 render 函数
  - 触发响应式，监听 data 属性
  - 执行 render 函数，生成 vnode，patch 创建新节点
- 更新过程：
  - 修改 data，触发 setter
  - 重新执行 render 函数，生成 newVnode
  - 重新 patch(vnode, newVnode)

### Vue 组件是异步渲染还是同步渲染？

是异步渲染的，Vue 的组件会汇总 data 的修改，一次性修改视图，减少 DOM 操作提升性能。

### Vue3.0 的特性有哪些？:star2:

- 全部用 TS 重写。
- 性能提升，打包后代码量却减少了。
- 使用 proxy 代替了 definePrototype 进行数据监听。
  - 避免了深度递归造成的计算量大
  - 避免了无法监听对象新增、删除属性时，无法侦测对象的改变
  - 避免了监听数组使用部分方法时，无法侦测数组的改变

```javascript
// proxy 实现数据监听
const data = {
  name: 'lml',
  age: '24'
};
// const data = ['a', 'b', 'c'];
const proxyData = new Proxy(data, {
  get (target, p, receiver) {
    const onwKeys = Reflect.ownKeys(target);
    if (onwKeys.includes(keys)) {
      console.log('get', p);
    }
    const result = Reflect.get(target, p, receiver);
    return result // 在这里做深度监听。
  },
  set (target, p, value, receiver) {
    const result = Reflect.set(target, p, value, receiver);
    console.log('set', p, value, result);
    return result
  },
  deleteProperty (target, p) {
    const result = Reflect.deleteProperty(target, p);
    console.log('delete', p, result);
    return result
  }
});
console.log(proxyData.name);
proxyData.age = 25;
proxyData.job = 'tec';
delete proxyData.job;
// console.log(proxyData[0]);
// proxyData[3] = 'd';
// delete proxyData[2];
```
