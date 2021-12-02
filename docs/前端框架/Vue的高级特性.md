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
      name: 'lml',
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

使用：放在 Vue.nextTick()回调函数中的执行的应该是会对 DOM 进行操作的 js 代码

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

用于获取组件中子组件或者某个 DOM 节点。

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

slot 即插槽：让父组件可以在子组件内添加内容的空间。

当子组件有多个插槽时怎么办？使用具名插槽。

当插槽内容想要用子组件中的内容，而不是父组件内容怎么了？使用作用域插槽。

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

定义：缓存组件是指保留组件状态或避免重新渲染。

使用场景：频繁切换，但不需要重复渲染。（Vue 常见性能优化方式之一）

用法：将想要缓存的组件使用 \<keep-alive\>\<\/keep-alive\> 包裹即可。

内置钩子函数：activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### mixin 是什么？:star2:

定义：mixin 是指多个组件有相同的逻辑，需要抽离出来。

使用场景：多个组件中存在相同的逻辑，我们将相同的逻辑抽离出来，通过 mixins 组件可以将自身所需要的逻辑引入进来。

- 问题：
  - 变量、方法来源不明确。
  - 多个 mixin 可能造成命名冲突。（变量、方法名称相同会相互覆盖）
  - mixin 和组件会出现多对多的情况，复杂度高。
	
