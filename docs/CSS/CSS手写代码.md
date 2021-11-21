## CSS 手写面试题

本章节不是特别重要，相对比较简单。能考的内容较少，如果有一定的 CSS 基础可以忽略。

### 手写清除浮动

```css
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1; /* 兼容IE */
}
```

### 圣杯布局

- 定义：圣杯布局为左中右三列布局，渲染顺序中间列书写在前保证提前渲染，左右两列定宽，中间列自适应剩余宽度。
- 特点：圣杯布局与双飞翼布局的不同之处，圣杯布局的的左中右三列容器没有多余子容器存在，通过控制父元素的 padding 空出左右两列的宽度。

```html

<header id="header">header</header>
<section id="container">
  <div id="center">center</div>
  <div id="left">left</div>
  <div id="right">right</div>
</section>
<footer id="footer">footer</footer>
```

```css
#header {
  height: 100px;
  background-color: #cc0000;
}

#container {
  height: calc(100vh - 200px);
  margin-left: 200px;
  margin-right: 150px;
}

#container > div {
  float: left;
  position: relative;
  height: calc(100vh - 200px);
}

#center {
  background-color: green;
  width: 100%;
}

#left {
  background-color: yellow;
  width: 200px;
  margin-left: -100%;
  left: -200px;
}

#right {
  background-color: pink;
  width: 150px;
  margin-left: -150px;
  right: -150px;
}

#footer {
  clear: both;
  height: 100px;
  background-color: #0000cc;
}
```

### 双飞翼布局

- 定义：双飞翼布局为左中右三列布局，渲染顺序中间列书写在前保证提前渲染，左右两列定宽，中间列自适应剩余宽度。
- 特点：双飞翼布局与圣杯布局的不同之处，圣杯布局的的左中右三列容器，中间 middle 多了一个子容器存在，通过控制 middle 的子容器的 margin 或者 padding 空出左右两列的宽度。

```html

<header id="header">header</header>
<section id="container">
  <div id="center">
    <div id="center-inner">center</div>
  </div>
  <div id="left">left</div>
  <div id="right">right</div>
</section>
<footer id="footer">footer</footer>
```

```css
#header {
  height: 100px;
  background-color: #cc0000;
}

#container > div {
  float: left;
  height: calc(100vh - 200px);
}

#center {
  background-color: green;
  width: 100%;
}

#center-inner {
  margin-left: 200px;
  margin-right: 150px;
}

#left {
  background-color: yellow;
  width: 200px;
  margin-left: -100%;
}

#right {
  background-color: pink;
  width: 150px;
  margin-left: -150px;
}

#footer {
  clear: both;
  height: 100px;
  background-color: #0000cc;
}
```

### CSS 实现三角形

利用 border 实现

```html

<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #000;
}
```

### CSS 实现扇形

利用 border + border-radius 实现

```html

<div class="sector"></div>
```

```css
.sector {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top: 10px solid #000;
  border-radius: 10px;
}
```

### CSS 实现箭头

利用 border + rotate 实现

```html

<div class="arrow"></div>
```

```css
.arrow {
  width: 10px;
  height: 10px;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  transform: rotate(45deg);

}
```

### 1像素问题解决方案:star2:

- 使用伪类 + transform 的形式：以前一些老版本的机型会出现粗细不均的情况，不过这些机型已经基本不在了。

```html

<div class="border-shadow">法一：使用 box-shadow 的形式：颜色会变浅</div>
<div class="border-scale">法二：使用缩放实现，对 1px 高度线条进行0.5倍缩放</div>
<div class="border-base64">法三：base64 编码实现</div>
<div class="border-svg">法四：base64 编码嵌入SVG实现</div>
```

```css
.border-shadow {
  box-shadow: inset 0 -1px 1px -1px #000;
}

.border_scale {
  position: relative;
  padding-top: 1px;
  border-top: 0 none;
}

.border_scale:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  border-top: 1px solid #999;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}

.border_base64 {
  padding-top: 1px;
  border-top: 0 none;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY5g5c+Z/BhAAABRcAsvqBShzAAAAAElFTkSuQmCC);
  background-position: 0 0;
  background-repeat: repeat-x;
  background-size: 1px 1px;
}

.border_svg {
  border-top: 0 none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1'><rect fill='#999' x='0' y='0.5' width='100%' height='0.5' /></svg>");
  background-position: 0 0;
  background-repeat: no-repeat;
}
```

### 实现九宫格布局:star2:

```html
<!--可以任意删除元素试一试-->
<div class="box">
  <div class="row">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>
  <div class="row">
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </div>
  <div class="row">
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.row {
  flex-basis: 100%;
  display: flex;
  justify-content: space-around;
}
```

### 已知如下代码，如何才能让图片宽度为 300px？

```html
<img src="xxx.jpg" style="width:480px!important;”>
```

- max-width: 300px
- transform: scale(0.625,0.625)
