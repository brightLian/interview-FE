# DOM 相关知识点

### DOM 的本质是什么？

DOM 的本质是根据 HTML 来解析创建的一棵树。

### DOM 获取节点操作有哪些？

- 获取节点的方式：
  - getElementById：通过 id 来获取（单个元素）
  - getElementsByTagName：通过标签获取（HTML 元素集合）
  - getElementsByClassName：通过 className 获取（元素集合）
  - querySelectorAll：通过标签获取（Node 节点的元素集合）

```html
<!--获取节点操作-->
<div class="div1">
  <p class="p1" id="p1">1</p>
  <p class="p2">2</p>
  <p class="p3">3</p>
</div>
```

```javascript
console.log(document.getElementById('p1'));
console.log(document.getElementsByTagName('p'));
console.log(document.getElementsByClassName('div1'));
console.log(document.querySelectorAll('p'));
console.log(document.getElementsByTagName('p') === document.querySelectorAll('p')) // false
console.log(document.getElementsByTagName('p')[0] === document.querySelectorAll('p')[0]) // true
```

### attribute 和 property 的区别？

attribute：作用于 DOM 结构，修改的是 HTML 的属性，会改变 HTML 结构。

property：修改 JS 对象属性，不会体现到 HTML 结构中。 两者都会引起 DOM 重新渲染，但是尽量使用 property，多次操作可能会合并。

```html
<!--attribute 和 property 的区别-->
<div class="div1">
  <p class="p1" id="p1">1</p>
</div>
```

```javascript
let p1 = document.querySelectorAll('p')[0];

// attribute 相关操作
p1.setAttribute('data-name', 'brightLian'); // 设置 data-name
console.log(p1.getAttribute('data-name')); // 获取 data-name
p1.setAttribute('style', 'font-size: 30px'); // 设置 CSS 属性
console.log(p1.getAttribute('style')); // 获取 CSS 属性

// property 相关操作
p1.style.color = 'red'; // 页面上 p1字体为红色
console.log(p1.className); // p1、获取 p1的 class
console.log(p1.nodeName); // P 获取节点名称
console.log(p1.nodeType); // 1 获取节点类型
```

### DOM 结构操作有哪些？

新增节点：使用 createElement

插入/移动节点：使用 appendChild 对现有节点执行 appendChild 操作会出现移动节点。

获取子元素列表：使用 childNodes 或出现文本元素（text），可以通过 nodeType 进行判断（text 的 nodeType 为3）

获取父元素：使用 parentNode

删除子元素：使用 removeChild

```html
<!--DOM 结构操作-->
<div id="div1">
  <p id="p1"></p>
</div>
<div id="div2"></div>
```

```javascript
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const p1 = document.getElementById('p1');

// 新建节点
const newP = document.createElement('p');
// 节点赋值
newP.innerHTML = 'newP';

// 插入节点
div1.appendChild(newP);
// 移动节点
div2.appendChild(p1);

// 获取子元素列表
const div1Child = div1.childNodes;
// 获取过滤后的子元素列表
const div1FilterChild = Array.prototype.slice.call(div1Child).filter(children => {
  if (children.nodeType === 1) {
    return true
  } else {
    return false
  }
});

// 获取父元素
const p1Parent = p1.parentNode;

// 删除子元素
div1.removeChild(div1FilterChild[0]);
```

### DOM 的性能问题（一次插入多个 DOM 如何解决）:star2:

DOM 操作非常昂贵，避免频繁的操作 DOM。（常见的做法有对 DOM 查询进行缓存、将频繁操作改为一次操作）

一次新插入多个 DOM 节点如何解决？（核心是利用 createDocumentFragment 创建虚拟节点）

```html
<!--createDocumentFragment-->
<ul id="list"></ul>
```

```javascript
const listNode = document.getElementById('list');
// 创建一个虚拟节点，整个是存储在 JS 中对，不会影响 DOM。
const frag = document.createDocumentFragment();
// 执行插入
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = 'list item' + i;
  frag.appendChild(li);
}
// 完成后插入到 DOM 中
listNode.appendChild(frag);
```

### 什么是 DOM 的事件模型？(如何绑定事件)

DOM之事件模型分脚本模型、内联模型(同类一个，后者覆盖)、动态绑定(同类多个)

```html
<!--行内绑定：脚本模型-->
<button onclick="javascrpt:alert('Hello')">Hello1</button>
<!--内联模型-->
<button onclick="showHello()">Hello2</button>
<!--动态绑定-->
<button id="btn3">Hello3</button>
```

```javascript
function showHello () {
  alert("Hello");
}

const btn3 = document.getElementById("btn3");
// DOM0级事件，只有最后一个生效
btn3.onclick = function () {
  alert("Hello1");
};
btn3.onclick = function () {
  alert("Hello2");
};
// DOM2:可以给同一个元素添加多个同类事件
btn3.addEventListener("click", function () {
  alert("hello3");
});
btn3.addEventListener("click", function () {
  alert("hello4");
});
if (btn3.attachEvent) {
  /*IE*/
  btn3.attachEvent("onclick", function () {
    alert("IE Hello");
  })
} else {
  /*W3C*/
  btn3.addEventListener("click", function () {
    alert("W3C Hello");
  })
}
```

### 什么是 DOM 的事件流？:star2:

事件流又称为事件传播，DOM2级事件规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

- 捕获阶段：document 对象首先接收到某些事件，然后事件沿 DOM 树依次向下，一直传播到事件的实际目标。
- 目标阶段：实际目标元素接收到事件。
- 冒泡阶段：事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上传播到较为不具体的节点。（阻止事件冒泡：e.stopPropagation）

```html
<!--DOM 的事件流-->
<div id="div1">
  <p id="p1">激活</p>
  <p id="p2">取消</p>
  <p id="p3">取消</p>
  <p id="p4">取消</p>
</div>
<div id="div2">
  <p id="p5">取消</p>
  <p id="p6">取消</p>
</div>
```

```javascript
const p1 = document.getElementById('p1');
const body = document.body;
p1.addEventListener("click", (e) => {
  e.stopPropagation(); // 阻止事件冒泡到 body 上
  console.log('激活')
});
body.addEventListener("click", () => {
  console.log('取消');
})
```

### 如何实现事件先冒泡后捕获?

addEventListener 的第三个参数可以设置捕获和冒泡的顺序，设置为 false 时就是先冒泡后捕获。

### 什么是事件委托（代理）？:star2:

定义：利用事件冒泡实现，指定一个事件处理程序，就可以管理某一类型的所有事件。（在绑定大量事件时往往使用事件委托）

- 优点：
  - 节省内存占用，减少事件注册
  - 自增子对象时无法在对其绑定事件，适合动态绑定。
- 局限性：
  - focus、blur 之类的事件本身没有冒泡机制，所以无法使用事件委托。
  - mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能损耗高，不适合。

### 阻止事件的默认行为？

使用 e.preventDefault()

### 无限下拉的列表，如何监听每个元素的点击？:star2:

```html
<!--事件代理-->
<ul id="parent-ul">
  <li><a href="#">a1</a></li>
  <li><a href="#">a2</a></li>
  <li><a href="#">a3</a></li>
  <li><a href="#">a4</a></li>
  <li><a href="#">a5</a></li>
</ul>
```

```javascript
const parentUl = document.getElementById('parent-ul');
parentUl.addEventListener('click', (e) => {
  e.preventDefault(); // 阻止默认事件
  console.log(e.target.innerHTML); // e.target 获取实际被触发的元素
})
```

### 手动实现事件委托？

```javascript
function delegate (element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (el === element) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el)
  }, true);
  return element
}
```

注：element.matches(selectorString) 参数 selectorString 为选择器名称，返回值为 true or false。

