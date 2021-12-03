# CSS 基础知识

### CSS 选择器的优先级？

!important > 内联样式 > id 选择器 > class 选择器 > 标签选择器 > 通配符选择器 > 继承 > 默认

### CSS 盒模型是什么？:star2:

- 定义：浏览器会将一个元素看成一个盒子，CSS 的各种属性来决定盒子的大小、颜色、位置等。
- 分类： 标准盒模型和怪异盒模型。
  - 标准盒模型：width 为内容区的宽度，整个元素的宽度为 width + 左右 padding + 左右 border + 左右 margin。
  - 怪异盒模型：width 为内容区的宽度 + 左右 padding + 左右 border，整个元素的宽度为 width + 左右 margin。
- 改变；使用 box-sizing 属性。（content-box 为标准盒模型、border-box 为怪异盒模型）

### margin 设置负值有什么影响？

- margin-top：自己向上移动
- margin-right：自动向右移动
- margin-bottom：下方相邻元素向自己靠近
- margin-left：左方元素向自己靠近
- **总结：** 上右影响自己，下左影响相邻元素。

### line-height 如何继承？

- 写具体数值，直接继承该值（如30px）
- 写比例，则继承该比例（如1.5 / 2）
- 写百分比，则子元素继承父元素计算出来的值（如父元素的 font-size 为 20px line-height 为 200%，继承时的值为 40px）

```css
.parent {
  font-size: 20px;
  line-height: 200%;
}

/* 此时子元素的 line-height 为40px 不是 36px */
.child {
  font-size: 18px;
}
```

### 伪类和伪元素分别是什么？

- 伪类：
  - 定义：以一个冒号作为前缀，被添加到一个选择器末尾的字段，当你希望样式在特定状态下才被呈现到指定元素时使用。
  - 常用：hover、focus、first-child、nth-child 等。
- 伪元素：
  - 定义：用于创建一些不存在文档树中的元素，并为其添加样式，虽然用户可以看到这些内容，但是在实际的文档中并不存在。
  - 常用：before、after、first-letter 等
- 二者区别：
  - 伪类是当前文档树真实存在的，指的是不能用普通选择器选择的假类。
  - 伪元素是当前文档树中不存在的，其核心是在原有的文档树中创建的假元素。

### 什么是雪碧图/精灵图？

- 定义：开发人员将多个小的图片合并到一起后称为雪碧图。
- 使用：通过每张小图片的 background-size、background-position 进行使用。
- 优点：减少了加载多张图片时的请求次数。
- 缺点：维护成本改，后期修改复杂。同时在使用 HTTP2.0时，因为增加了多路复用就不需要考虑 http 请求数。

### CSS 的定位方式？

CSS 的常用定位方式有两种，分别为 float 浮动定位和 position 定位。

- float 有以下属性
  - left：左浮动
  - right：右浮动
- position 有以下属性
  - static：默认属性，正常文档流定位
  - relative：相对自身原有位置进行定位
  - absolute：相对于最近的非 static 的祖先元素进行定位
  - fixed：相对于页面的视口进行定位，不会受到页面滚动的影响
  - sticky：当元素在屏幕内表现为 relative 的属性，当元素滚动到屏幕外表现为 fixed 的属性。

### 如何清除浮动？

- 使用 clear 属性
- 创建 BFC
- 给父元素设置高度

### 如何理解 z-index？

- 作用：用来控制层叠元素的垂直叠加顺序
- 表现：默认为0，设置的值越大，在垂直位置上越靠上
- 影响元素：z-index 只会影响设置了 position 不为 static 的元素

### CSS 隐藏元素的方式？

- opacity: 0 将透明度设置为0。元素不可见、占据位置、可以交互。
- visibility: hidden 将元素设置为隐藏。元素不可见、占据位置、不可交互。
- transform: scale(0) 将元素缩放为0。元素不可见、占据位置、不可交互。
- display: none 将元素设置不展示。元素不可见、不占据位置、不可交互。

### BFC 及其应用:star2:

- 定义：全称为块级格式化上下文，实际指的是一个独立渲染的区域，这个区域内的元素不会受到区域外元素的影响。
- 触发条件：
  - 根元素（HTML）
  - 浮动元素
  - position 为 absolute 或者 fixed
  - overflow 部位 hidden
  - display 为 inline-block、flex、table-cell 等
- 规则：
  - 内部的 box 会在垂直方向上一个一个排列
  - 同一个 BFC 的两个相邻元素会发生 margin 重叠，俩个 BFC 之间不会发生 margin 重叠
  - BFC 区域不会与浮动元素发生重叠
  - 计算 BFC 的高度时，浮动元素也参与计算
  - 文字层不会被浮动层覆盖，会环绕在周围
- 应用：
  - 清除浮动
  - 防止 margin 重叠
  - 防止元素被浮动元素遮挡

### 什么是响应式布局？:star2:

- 定义：在同一页面不同尺寸的屏幕下，展示特定的布局
- 优点：
  - 面对不同设备的灵活性强
  - 能够解决多设备下显示不同的问题
- 缺点：
  - 部分方案可能存在兼容性问题（flex 布局和 grid 布局）
  - 部分方案的工作量比较大（media query）
- 实现方案：
  - media query：媒体查询的方式，针对不同屏幕信息进行布局
  - flex 布局：弹性盒子布局
  - grid 布局：网格式布局
  - 百分比：通过设置百分比是元素随之变化
  - vw/vh：通过视口宽高的百分比
  - rem：结合 media query 使用，根据不同的屏幕大小设置根节点字体的大小
  - rpx：微信小程序特有的单位来实现响应式。

### 媒体查询是什么？

定义：通过查询用户的设备信息属于哪种类型，让网页能够在不同的设备下展示特定效果。

作用：通常用在解决兼容性问题上。

类型：在 web 应用开发时通常会用到 screen （屏幕）类型，有时调用打印机时会用到 print 类型。

### #px、em、rem 等单位的区别？

- px：绝对单位，精确的像素。
- em：相对单位，如果自身设置了 font-size 时，1em = font-size 的值；自身未设置时为最近祖先元素的 font-size。
- rem：相对单位，相对于根结点 html 的 font-size。
- vw/vh：相对单位，1vw = 视口宽度的1%；1vh = 视口高度的1%。
- rpx：微信小程序提供的单位，为微信小程序提供了自适应的功能。

### 对 flex 布局的理解以及常用属性？:star2:

- 理解：目前的 web 应用有不同的设备和分辨率，这时需要响应式的页面设计来满足复杂的布局要求。 flex 布局的优势在于我们只需要声明布局应该具有的行为，而不需要给出具体的实现方案，浏览器负责完成布局。
  当布局涉及到不定宽度，各种对齐等场景时，可以优先使用 flex 布局。
- 容器属性：
  - flex-direction：确定主轴方向。（row | row-reverse | column | column-reverse）
  - flex-wrap：确定换行方式。（nowrap | wrap | wrap-reverse）
  - flex-flow：上面两个属性的结合，默认值为 row nowrap。
  - justify-content：确定主轴上的对齐方式。（flex-start | flex-end | center | space-between | space-around）
  - align-items：确定交叉轴上的对齐方式。（flex-start | flex-end | center | baseline | stretch）
  - align-content：确定多个轴线的对齐方式。（flex-start | flex-end | center | space-between | space-around | stretch）
- 项目属性：
  - order：确定项目的排列顺序，数值越小排列越靠前。
  - flex-grow：确定项目的放大比例。
    - 默认为0，存在剩余空间也不会放大。
    - 如果所有项目的 flex-grow 都等于1，就等分剩余空间。
    - 如果其中一个项目为2其他项目都为1，前者占据剩余空间比其他多一倍。
  - flex-shrink：确定项目的缩小比例。
    - 默认为1，如果空间不足该项目缩小。
    - 如果所有项目的 flex-shrink 都等于1，空间不足时等比例缩小。
    - 如果其中一个项目为0其他项目都为1，空间不足时前者不会缩小。
  - flex-basis：确定在分配多余空间前，项目占据的主轴空间。
    - 浏览器根据这个属性，计算主轴是否有剩余空间，默认为auto。
    - 他可以设为跟 width 或 height 属性相同的值，项目将占据固定空间。
  - flex：是 flex-grow、flex-shrink、flex-basis 的简写。
    - 默认值为 flex: 0 1 auto，表示不放大会缩小。
    - flex:none 时，是 flex: 0 0 auto，表示不放大也不缩小。
    - flex:auto 时，是 flex: 1 1 auto，表示放大且缩小。
    - 值为一个非负数字时：flex-grow被定义，flex-shark为1，flex-basis 为0%。
    - 值为两个非负数字时：flex-grow 和 flex-shrink 依次被定义，flex-basis 为0%。
    - 值为一个长度或者百分比时：flex-basis 被定义，flex-grow 和 flex-shrink 为1。
    - 值为一个非负数字和一个长度or百分比时：flex-grow 和 flex-basis 依次被定义，flex-shrink 为1。
    - 总结，flex-grow 和 flex-shrink 不规定则为1，flex-basis 不规定则为0%。
  - align-self：允许单个项目与其他项目对齐方式不同。（auto | flex-start | flex-end | center | baseline | stretch）

### 对 grid 布局的理解以及常用属性？

[grid布局教程-阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

### 元素水平、垂直、水平垂直居中的方法？:star2:

- 水平居中：
  - 行内元素水平居中：
    - text-align: center
  - 定宽块级元素水平居中：
    - margin: 0 auto
    - position: absolute + left: 50% + margin-left: -width/2
  - 不定宽块级元素水平居中：
    - position: absolute + left: 50% + transform: translateX(-50%);
    - 父元素 display: flex + justify-content: center;
- 垂直居中：
  - 行内元素垂直居中：
    - line-height = height
  - 定宽块级元素垂直居中：
    - position: absolute + top: 50% + margin-top: -height/2
  - 不定宽块级元素垂直居中：
    - position: absolute + top: 50% + transform: translateY(-50%);
    - 父元素 display: flex + align-items: center;
- 水平垂直居中：
  - 不定宽不定高元素水平垂直居中：
    - position: absolute + top: 50%; left: 50%; transform: translate(-50%, -50%);
    - 子元素 position: absolute + top: 0 + right:0 + bottom:0 + left: 0 + margin: auto;（万能方式，兼容 IE 版本）
    - 父元素 display: flex + justify-content: center + align-items: center;

### CSS3新特性有哪些？:star2:

- 新增了一些伪类选择器：如 nth-child(n)、last-child 等。
- 新增了一些样式：
  - 背景：background-size、background-position 等
  - 边框：border-radius、border-image 等
  - 阴影：文本阴影 text-shadow、元素阴影 box-shadow
- 新增了 transition 渐变：
  - 用途：可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔。
  - 用法：transition： CSS属性（必填），花费时间（必填），效果曲线(非必填，默认ease)，延迟时间(非必填，默认0)。
  - 包含了4个属性：transition-property、transition-duration、transition-timing-function、transition-delay。
- 新增了 transform 变换：
  - 用途：允许你旋转，缩放，倾斜或平移给定元素。
  - 用法：位移使用 transform: translate；缩放使用 transform: scale；旋转使用：transform: rotate；倾斜使用 transform: skew 等。
- 新增了 animation 动画：
  - 用途：用于实现自定义动画。
  - 用法：通过 @keyframes 来定义关键帧，动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来。
- 新增了 gradient 渐变：包含了线性渐变 linear-gradient 和径向渐变 radial-gradient。
- 新增了布局方式：如 flex 布局、grid 布局。

### transition 和 animation 有什么区别？:star2:

1. transition 只是过渡，是样式的变化过程，只有开始和结束；animation 指的是动画，通过设置中帧来定义变化的过程。
2. transition 只有两帧；animation 可以结合 keyframe 设置每一帧 。
3. transition 只能通过 hover 或者 js 事件来配合触发；animation 配合 @keyframe 可以不触发事件就触发这个过程。
4. transition 只能触发一次；animation 可以设置很多的属性，比如循环次数，动画结束的状态等等。

### 介绍下 requestAnimationFrame？:star2:

功能：用来实现动画持久化。要求浏览器在下次重绘之前调用指定的回调函数更新动画。 使用方式就是将要被控制频率的代码放入 window.requestAnimationFrame 中。

- 要想动画流畅，更新频率要60帧/s，即16.67ms 更新一次视图
- setTimeout 要手动控制频率，而 RAF 浏览器会自动控制
- 后台标签或隐藏 iframe 中，RAF 会暂停，而 setTimeout 依然执行

### 1像素边框问题如何解决（750为1px，标准325为0.5px）:star2:

- 采用 transform: scale 加伪类标签
- 采用 base64 编码来实现
- 采用阴影模拟边框 box-shadow: 0 0 1px 0 #000 inset（但是颜色会变浅）
- 采用 svg 图片形式，利用 svg 描边，svg 的1像素不会受到屏幕的影响。

### 刘海屏如何适配？

通过设置安全区的方式，如 paddingBottom: calc(env(safe-area-inset-bottom) + 10px)。

### 一个页面需要同时适配 PC 端和移动端怎么做？rem 和 vw 方案有什么区别？

如果一个页面需要同时适配 PC 和移动端，这个时候需要考虑响应式布局。我们可以考虑使用 media query、rem、vw 等方式进行适配。

**rem** 属于之前较为主流的一种响应式布局方式，对于不同屏幕，我们只需要动态修改根元素 font-size 值，所有元素就会按比例放大或者缩小，从而做到页面的自动适配效果。  
**rem 的弊端：** 这种方法确实便捷，兼容性也很好，是目前非常主流的弹性布局方案。弊端之一：和根元素 font-size 值强耦合，系统字体放大或缩小时，会导致布局错乱；弊端之二：html 文件头部需插入一段 js 代码。

**vm** 属于目前推荐的一种响应式布局的方式。上面介绍的动态 rem 方案，其本质是让页面元素大小跟随屏幕宽度的变化成比例缩放。CSS Viewport units
（视口单位）正是一种相对于屏幕宽高的一种长度单位，并且兼容性越来越好。视口单位有：vw、vh 等。vw 单位表示根元素宽度的百分比，1vw 等于视口宽度的1%。   
**vw 适配方案的流程：** meta 标签设置 viewport 宽度为屏幕宽度；开发环境配置 postcss-px-to-viewport 或者类似插件；根据设计稿写样式，元素宽高直接取设计稿宽高即可，单位为 px，插件会将其转换为
vw；段落文本也按照设计稿写，单位为px，不需要转换为 vw。
