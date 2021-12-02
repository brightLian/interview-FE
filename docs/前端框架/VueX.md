# VueX 相关

## VueX 的核心模块有哪些？:star2:

- state：状态中心，保存着所有的数据源
- getters：筛选后的状态中心，保存着筛选后的数据源
- mutations：更改状态，做原子操作，接收 state 做第一个参数
- actions：异步更改状态，可以整合多个原子操作
- modules：将state分成多个modules，便于管理

### 用于 Vue 组件的辅助函数

- commit：调用 mutation 更改状态（数据）
- dispatch：调用 action 更改状态（数据）
- mapState：获取状态（数据）时使用 —— 将组件的 data 映射为 store.state 调用
- mapGetter：获取筛选后的状态（数据）时使用 —— 将组件的 data 映射为 store.getter 调用
- mapMutations：获取更改状态的方法 —— 将组件的 methods 映射为 store.commit 调用
- mapActions：获取异步更改状态的方法 —— 将组件的 methods 映射为 store.dispatch 调用

### VueX 的使用流程？:star2:

- 注意：异步操作只能在 actions 中做。
- 同步操作：view -> commit -> mutations -> state 变化 -> view 变化
- 异步操作：view -> dispatch -> actions -> mutations -> state 变化 -> view 变化

![VueX 图解](/image/前端框架/vueX.png)

### VueX 的原理

- 原理：每个组件（也就是Vue实例）在 beforeCreate 的生命周期中都混入（Vue.mixin）同一个 Store 实例，作为属性 $store， 这也就是为啥可以通过 this.$store.dispatch
  等调用方法的原因。
- 简言之：Vuex 是通过全局注入 store 对象，来实现组件间的状态共享。

## 谈谈 Vuex 、Redux 的设计思想？

都是将数据存放在全局 store 对象中，再将 store 挂载在每一个组件的实例上实现组件间的状态共享。