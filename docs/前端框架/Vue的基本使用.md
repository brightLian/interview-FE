# Vue 的基本使用

本章节主要介绍 Vue 的基本使用，主要包括 Vue 的生命周期、组件之间的通信方式、以及一些我们平时在工作中经常会使用到的一些 API。

### Vue 的生命周期有哪些、各周期作用？:star2:

生命周期分为几个大的阶段：创建、挂载、更新、销毁。

- beforeCreate：在实例初始化之后，数据观测（data observer）和 event/watcher 事件配置之前被调用。
- created：在实例创建完成后被立即调用。数据、方法、属性等已经绑定，但是真实的 DOM 还没创建。
- beforeMount：在挂载之前被调用，相关的 render 函数首次被调用。
- mounted：页面已经渲染完成，DOM 已经创建完成。
- beforeUpdate：组件数据更新之前调用，发生在虚拟 DOM 的 patch 过程之前。
- updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：实例销毁后调用。
  ![生命周期](/image/前端框架/lifeCycle.png)

### Vue 页面第一次加载会触发哪几个生命周期？

会触发 beforeCreate、created、beforeMounted、Mounted。因为这个时候还没有数据变化和实例销毁，不会触发 update 和 destroy 相关的生命周期。

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 种：

1. 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父
   mounted
2. 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

3. 父组件更新过程：父 beforeUpdate -> 父 updated

4. 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 在 beforeDestroy 我们应该做什么？

解除自定义事件 event.$off

销毁定时任务 setTimeout、setInterval 等

解绑自定义的 DOM 事件，如 window.scroll 等

### v-show 与 v-if 有什么区别？:star2:

- **相同点：** 两者的作用效果和使用方式是相同的，都能控制页面上的元素是否显示。
- **不同点：**
  1. **控制方式上：** v-show 隐藏则是为该元素添加 display:none，DOM 元素依旧还在。v-if 显示隐藏是将 DOM 元素整个添加或删除。
  2. **编译过程上：** v-show 只是通过 CSS 的 display 控制显示和隐藏；v-if 是真正的条件渲染，切换过程中涉及到了组件的销毁和渲染。
  3. **生命周期上：** v-show 变化的时候不会触发组件的生命周期；v-if 由 false 变为 true 的时候会触发组件的 beforeCreate、create、beforeMount、mounted 钩子，由 true
     变为 false 的时候触发组件的 beforeDestroy、destroyed 方法。
  4. **性能消耗上：** v-show 有更高的初始渲染消耗；v-if 有更高的切换消耗。

总结：v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于频繁切换条件的场景。

注： v-if 如果频繁切换，要配合 keep-alive 一起使用。

### v-for 与 v-if 为什么不能一起使用？

原因：v-for 比 v-if 优先级高，所以使用的话，每次 v-for 都会执行 v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候。

如果避免出现这种情况，则在外层嵌套 template（页面渲染不生成 DOM 节点），在这一层进行 v-if 判断，然后在内部进行 v-for 循环。    
如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项。

### 为什么组件的 data 必须是一个函数？

Vue 根实例的时候定义 data 属性既可以是对象也可以是函数，但组件中定义 data 属性只能是函数。

根实例的 data 可以是对象也可以是函数，因为根实例是单例不会产生数据污染情况。

而组件实际是一个类。如果 data 不是函数，那么我们在实例化多个组件时，组件中的 data 就会被公用；如果 data 是函数时，初始化时组件中的 data 就是一个闭包，不会相互影响。

因此 Vue 组件可能会有很多个实例，组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data，产生数据污染。采用函数的形式，initData 时会将其作为工厂函数都会返回全新 data 对象。

### 为什么给data中对象添加新属性界面不会刷新？

Vue2 版本中使用 Object.defineProperty 来实现数据的响应式，通过 getter 和 setter 进行拦截，这个拦截操作是在数据初始化的时候已经完成。当我们访问或者设置已经属性时都能触发 getter 和
setter，但是我们给 data 中对象添加新属性时并没有通过 Object.defineProperty 设置成响应式数据。

我们可以通过 Vue.set() 将新添加的属性设置为响应式，这样当这个数据再次变化时界面就会更新。

### Vue 中组件通信的方式？:star2:

- **组件通信的分类：**
  - 父子组件之间的通信
  - 兄弟组件之间的通信
  - 祖孙与后代组件之间的通信
  - 非关系组件间之间的通信
- **组件通信的方式：**
  - 使用 props 传递数据：用于父组件传递数据给子组件
  - 使用 $emit 触发自定义事件：用于子组件传递数据给父组件
  - EventBus：用于兄弟组件传值，兄弟组件通过 $emit 触发自定义事件，其中 $emit 第二个参数为传递的数值，另一个兄弟组件通过 $on 监听自定义事件。
  - VueX：用于复杂关系的组件数据传递，作用相当于一个用来存储共享变量的容器。

### Vue 为什么是单向数据流？

实际就是在 Vue 中，子组件为什么不可以修改父组件传递的 props？

有人认为单向数据流与双向绑定冲突。实际单向数据流与 Vue 中的双向数据绑定并不冲突。    
单双向绑定：指的是 View 层和 Model 层之间的映射关系。     
数据流：指的是组件之间的数据流动

- **Vue 单向数据流的原因：**
  - 单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
  - 一个父组件不只有一个子组件，使用这份 props 数据的也不只有你一个子组件。如果每个子组件都能修改 props 的话，将会导致修改数据的源头不止一处。

### computed 和 watch 的区别和运用的场景？:star2:

computed：是计算属性，依赖其它属性值，并且 computed 的值有**缓存**，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。

watch：更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作。

- 运用场景：
  - computed：当我们需要进行数值计算，并且依赖于其它数据时，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
  - watch：当我们需要在数据变化时执行异步或开销较大的操作时，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### watch 如何深度监听？

为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。

### 事件/表单修饰符

- 事件修饰符：
  - .stop：组织事件冒泡，相当于 event.stopPropagation()。
  - .prevent：阻止事件默认行为，相当于 event.preventDefault()。
  - .capture：使用事件捕获机制，不使用冒泡机制。（从顶层向下触发）
  - .self：只有当前元素触发事件。
  - .once：事件只会触发一次。
  - .passive：滚动事件的默认行为将会立即触发，而不会等待 onScroll 完成。
- 表单修饰符：
  - .lazy：在内容做改变时而非输入时更新
  - .number：自动将用户的输入值转为数值类型
  - .trim：自动过滤用户输入的首尾空白字符

### Vue 常用性能优化方式？:star2:

- 合理使用 v-show 和 v-if。
- 合理使用 computed。
- v-for 中增加 key，同时避免和 v-if 同时使用。
- 自定义事件和 DOM 事件及时销毁避免内存泄露。
- 合理使用异步组件。
- 合理使用 keep-alive。
- data 层级不要太深。（深度监听需要深度遍历）

### 列表组件中写 key，其作用是什么？:star2:

key 在列表渲染中的作用是：在复杂的列表渲染中快速准确的找到与 newVnode 相对应的 oldVnode， 从而提升 diff 效率。

如果不用 key，Vue 会采用就地复地原则：最小化 element 的移动，并且会尝试尽最大程度在同适当的地方对相同类型的 element，做 patch 或者 reuse。

如果使用 key，Vue 会根据 keys 的顺序记录 element，曾经拥有了 key 的 element 如果不再出现的话，会被直接 remove 或者 destroyed。


