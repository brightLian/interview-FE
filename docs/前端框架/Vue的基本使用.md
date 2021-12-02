# Vue 的基本使用

### Vue 的生命周期有哪些、各周期作用？:star2:

生命周期分为几个大的阶段：创建、挂载、更新、销毁。

- beforeCreate：在实例初始化之后，数据观测（data observer）和 event/watcher 事件配置之前被调用。
- created：在实例创建完成后被立即调用。数据、方法、属性等已经绑定，但是真实的 DOM 还没创建。
- beforeMount：在挂载之前被调用，相关的 render 函数首次被调用。
- mounted：页面已经渲染完成。
- beforeUpdate：组件数据更新之前调用，发生在虚拟 DOM 的 patch 过程之前。
- updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：实例销毁后调用。
  ![生命周期](/image/前端框架/lifeCycle.png)

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 种：

1. 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父
   mounted
2. 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

3. 父组件更新过程：父 beforeUpdate -> 父 updated

4. 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 何时使用 beforeDestroy 生命周期？

解除自定义事件 event.$off

清除定时器

解绑自定义的 DOM 事件，如 window.scroll 等

### Vue 中组件通信的方式？:star2:

常用的大概就以下几种，还有一些不常用的不做赘述。

- 父传子：props
- 子传父：$emit
- 组件之间的通信：自定义事件、VueX
  - 自定义事件：event.$on、event.$emit、event.$off（event 是 Vue 的实例）
  - VueX：详见后续章节

### 在 Vue 中，子组件为何不可以修改父组件传递的 Prop？

实际就是 Vue 为什么是单向数据流。

- 原因：
  - 单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
  - 一个父组件不只有一个子组件，使用这份 prop 数据的也不只有你一个子组件。如果每个子组件都能修改 prop 的话，将会导致修改数据的源头不止一处。

### v-show 与 v-if 有什么区别？

v-if：是真正的条件渲染，切换过程中涉及到了组件的销毁和渲染。v-for 和 v-if 不能一起使用。

v-show：只是通过 CSS 的 display 控制显示和隐藏。

总结：v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于频繁切换条件的场景。

注：keep-alive 要配合 v-if 一起使用。

### computed 和 watch 的区别和运用的场景？:star2:

computed：是计算属性，依赖其它属性值，并且 computed 的值有**缓存**，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。

watch：更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作。

- 运用场景：
  - computed：当我们需要进行数值计算，并且依赖于其它数据时，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
  - watch：当我们需要在数据变化时执行异步或开销较大的操作时，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### watch 如何深度监听？

为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。

### 事件修饰符

- .stop：组织事件冒泡，相当于 event.stopPropagation()。
- .prevent：阻止事件默认行为，相当于 event.preventDefault()。
- .capture：使用事件捕获机制，不使用冒泡机制。（从顶层向下触发）
- .self：只有当前元素触发事件。
- .once：事件只会触发一次。
- .passive：滚动事件的默认行为将会立即触发，而不会等待 onScroll 完成。

### 为什么组件的 data 必须是一个函数？

组件实际是一个类，如果 data 不是函数，那么我们在实例化多个组件时，组件中的 data 就会被公用。 data 是函数时，初始化时组件中的 data 就是一个闭包，不会相互影响。

### Vue 常用性能优化方式？:star2:

- 合理使用 v-show 和 v-if。
- 合理使用 computed。
- v-for 中增加 key，同时避免和 v-if 同时使用。
- 自定义事件和 DOM 事件及时销毁避免内存泄露。
- 合理使用异步组件。
- 合理使用 keep-alive。
- data 层级不要太深。（深度监听需要深度遍历）
