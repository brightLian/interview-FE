# Vue 的高级特性

### 自定义 v-model 是什么？

- 定义：允许一个自定义组件在使用 v-model 时定制 prop 和 event。
- 规则：（参考下边事例）
  - 子组件中 input 使用 :value 而不是 v-model。
  - 子组件中 change 方法和 model.event 要对应。
  - num 在 props、model.prop 一一对应。

```vue
<!-- 父组件 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js home" :name="name" v-model="num"/>
    {{ num }}
    <button @click="addNum">add1</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      name: 'brightLian',
      num: 1
    }
  },
  methods: {
    addNum () {
      this.num++
    }
  }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div class="hello">
    <h1>{{ msg }} {{ name }}</h1>
    <input type="text" :value="num" @input="change($event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    name: String,
    num: [Number, String]
  },
  model: {
    prop: 'num',
    event: 'change'
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>
```

### nextTick 是什么？:star2:

定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

我们可以理解成，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。

使用：我们经常在数据更新后会对 DOM 进行一些操作，但这时候我们获取不到更新后的 DOM，因为还没有重新渲染，这个时候我们就需要 nextTick 方法

```vue
<!-- nextTick 使用 -->
<template>
  <div id="hello">
    <ul ref="ul">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <button @click="addItem">添加</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: ['a', 'b', 'c']
    }
  },
  methods: {
    addItem () {
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      // 不使用 $nextTick 获取节点长度时第一次为3，第二次为6
      // const ulEle = this.$refs.ul
      // console.log(ulEle.childNodes.length)
      // 使用 nextTick 调用符合我们的预期：
      // Vue 是异步渲染的、$nextTick 待 DOM 渲染完再回调
      // 同时页面渲染会将 data 的修改整合，多次 data 只会渲染一次
      this.$nextTick(() => {
        // 使用 $nextTick 获取节点长度时第一次为6，第二次为9
        const ulEle = this.$refs.ul
        console.log(ulEle.childNodes.length)
      })
    }
  }
}
</script>

```

### $refs 是什么？

定义：用于获取当前页面中的子组件或者某个 DOM 节点。

```vue
<!-- $refs 的使用 -->
<template>
  <div id="app">
    <div ref="div1">1111</div>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.$refs.div1)
  }
}
</script>
```

### slot 是什么？

定义：slot 又称插槽，它是对组件的扩展，通过 slot 父组件可以向子组件内部指定位置传递内容。

分类：默认插槽、具名插槽、作用域插槽。

使用场景：

- 默认插槽：子组件用 \<slot\> 标签来确定渲染的位置，标签里面可以放 DOM 结构，当父组件使用的时候没有往插槽传入内容，标签内 DOM 结构就会显示在页面，父组件在使用的时候，直接在子组件的标签内写入内容即可。
- 具名插槽：子组件用 name 属性来表示插槽的名字，不传为默认插槽，父组件中在使用时在默认插槽的基础上加上 v-slot 属性，值为子组件插槽 name 属性值。
- 作用域插槽：子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件 v-slot 接受的对象上，父组件中在使用时通过 v-slot 获取子组件的信息，在内容中使用。

```vue
<!--子组件-->
<template>
  <div class="test">
    <slot>
      <p>默认插槽默认内容</p>
    </slot>
    <slot name="content2">
      <p>具名插槽默认内容2</p>
    </slot>
    <slot name="content3" v-bind:content3="replaceContent3">
      <p>{{ content3 }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content3: '作用域插槽默认内容3',
      replaceContent3: 'ccccc'
    }
  }
}
</script>
```

```vue
<!--父组件-->
<template>
  <div id="app">
    <A>
      <!-- 默认插槽 -->
      <template>
        <div>aaaaa</div>
      </template>
      <!-- 具名插槽，指定插槽名称 -->
      <template v-slot:content2>
        <div>bbbbb</div>
      </template>
      <!-- 作用域插槽，可以获取子组件的内容 -->
      <template v-slot:content3="content3">
        <div>{{ content3.content3 }}</div>
      </template>
    </A>
  </div>
</template>

<script>
import A from '@/components/A'

export default {
  name: 'app',
  components: {
    A
  }
}
</script>
```

### 动态组件是什么？:star2:

定义：让多个组件使用同一个挂载点，并动态切换。

使用场景：需要根据数据，动态渲染的场景。即组件类型不确定（比如一个文章中既有文字、图片、视频等）

用法：:is='component-name'

```vue
<!--动态组件-->
<template>
  <div id="home">
    <div v-for="val of pageData" :key="val.id">
      <component :is="val.type"></component>
    </div>
  </div>
</template>

<script>
import Text1 from '@/components/text.vue'
import Image1 from '@/components/image.vue'
import Video1 from '@/components/video.vue'

export default {
  name: 'Home',
  components: {
    Text1,
    Image1,
    Video1
  },
  data () {
    return {
      pageData: [
        { id: 1, type: 'Text1' },
        { id: 2, type: 'Image1' },
        { id: 3, type: 'Text1' },
        { id: 4, type: 'Video1' }
      ]
    }
  }
}
</script>
```

### 异步组件是什么？:star2:

定义：异步组件是指用到该组件时，异步通过请求去拉取对应组件的 js。

使用场景：提高页面的渲染性能，将首次访问不必要渲染的组件，设置为异步组件实现，组件的按需异步加载和使用。

看下面的例子，text.vue 就被设置为了异步组件。只有当我们我们点击按钮时才会加载组件。

```vue
<!--异步组件-->
<template>
  <div id="home">
    <Text1 v-if="isShowComponent"></Text1>
    <button @click="showComponent">展示异步组件</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Text1: () => import('@/components/text.vue')
  },
  data () {
    return {
      isShowComponent: false
    }
  },
  methods: {
    showComponent () {
      this.isShowComponent = true
    }
  }
}
</script>
```

### keep-alive 缓存组件？

定义：是 Vue 中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。

使用场景：组件展示隐藏会被频繁切换，但不需要重复渲染。

用法：将想要缓存的组件使用 \<keep-alive\>\<\/keep-alive\> 包裹即可。

内置钩子函数：activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### mixin 是什么？:star2:

定义：mixin 又称混入，是指当多个组件有相同的逻辑，使用 mixin 可以抽离组件中的可复用功能。

分类：分为全局混入和局部混入。（全局混入会影响每一个组件实例）

使用场景：在开发中我们经常会遇到在不同的组件中，需要用到一些相同或者相似的代码，这些代码的功能相对独立。这时可以通过 Vue 的 mixin 功能将相同或者相似的代码提出来。

- 使用 mixin 会出现当问题：
  - 变量、方法来源不明确，不好维护。
  - 多个 mixin 可能造成命名冲突。（变量、方法名称相同会相互覆盖）
  - mixin 和组件会出现多对多的情况，复杂度高。

### 自定义指令是什么？

定义：对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

分类：全局注册指令和局部注册指令。

- 钩子函数：
  - bind：只调用一次，指令第一次绑定到元素时调用。
  - inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  - update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
  - componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
  - unbind：只调用一次，指令与元素解绑时调用。

使用场景：输入框防抖、图片懒加载、一键 Copy 的功能等。

举个例子

```js
// 1.设置v-throttle自定义指令
Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) { // 用户若不设置防抖时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
```

```vue
<!--使用自定义指令-->
<button @click="submit" v-throttle>提交</button>
```
