## 手写代码题目

### 前言

作为一名程序员，很多同学都听过这样一句话 Talk is cheap, Show me the code. 有人觉得这句话不对，但这就是行业的法则。作为一个程序员，如果不能产出高质量的代码，这的确有失本分。

本章节的内容比较多，但是在很多公司尤其是大厂，手写代码的题目更是必考的。那么屁话少说，放码过来吧。

### 手写节流函数:star2:

节流函数：在指定的事件间隔内只执行一次函数。节流函数是一种常用的，高频触发优化方式，对性能有很大提升。

应用：适合大量事件按时间平均触发。（如DOM 元素拖拽、滚动事件等）

```javascript
function throttle (fn, delay = 500) {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
      timer = null
    }, delay)
  }
}
```

### 手写防抖函数:star2:

防抖函数：在函数频繁被触发时，只有函数触发的事件超过指定的时间间隔，函数才会被执行。也是一种高频触发优化方式。

应用：适合多次事件一次响应的情况。（如防止表单重复提交、输入内容联想功能等）

```javascript
function debounce (fn, delay = 500) {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fm.apply(that, args);
    }, delay)
  }
}
```

### 手动实现数组展平:star2:

我们知道利用 [].concat(arr) 可以实现展平一层，那么数组展平可能有多种情况：展平一层、完全展平、指定展平层数。接下来我们看下使用这种方法如何实现我们的需求。

```javascript
// 展平一层
Array.prototype.flatOne = function () {
  return [].concat(...this)
}

// 完全展平
Array.prototype.flatComolete = function () {
  const isDep = this.some(function (item) {
    return Object.prototype.toString.call(item) === '[object Array]'
  })
  if (!isDep) {
    return this
  }
  const res = [].concat(...this);
  return res.flatComolete();
}

// 指定展平层数
Array.prototype.flat = function (depth) {
  const isDep = this.some(function (item) {
    return Object.prototype.toString.call(item) === '[object Array]'
  })
  if (!isDep || depth <= 0) {
    return this
  }
  const res = [].concat(...this);
  return res.flat(--depth);
}

// 测试用例
let arr = [1, 2, [3, 4], [5, [6, [7]]]];
console.log(arr.flatOne());
console.log(arr.flatComplete());
console.log(arr.flat(2));
```

### 手写实现深拷贝:star2:

深拷贝：深拷贝是将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

实现方式：因为深拷贝的对象我们不清楚它的深度，如果我们不考虑深度可能很容易写成浅拷贝，所以我们需要使用递归来解决深度这个问题。

```javascript
function deepClone (obj = {}) {
  // 判断数据类型
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    result = []
  } else {
    result = {}
  }

  // 遍历所有属性，只对自有属性进行深拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归遍历自由属性
      result[key] = deepClone(obj[key]);
    }
  }

  return result
}
```

### 手写实现深度比较:star2:

深度比较：对象（包括数组不考虑函数）的比较实际是指针的比较，而深度比较指的是不对指针进行比较，而是对对象每个属性的值进行比较。

实现方式：这个和深拷贝类似，我们不清楚对象以及数组对深度，所以需要使用递归的方式，直到最后比较的内容不是对象而是值类型。

```javascript
function isDeepEqual (obj1, obj2) {
  // 定义一个函数用于判断是否是合理的类型
  function isObject (obj) {
    return typeof obj === 'object' && obj !== null
  }

  // 如果不是对象或数组，直接进行值类型的比较
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 如果是浅拷贝直接返回true
  if (obj1 === obj2) {
    return true
  }
  // 开始进行深度比较
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  // 循环调用 key 判断值
  for (let key in obj1) {
    const res = isDeepEqual(obj1[key], obj2[key]);
    if (!res) {
      return false
    }
  }
  return true
}

// 测试用例 
const obj1 = {
  a: 100,
  b: {
    b1: 200,
    c1: 200
  }
};
const obj2 = {
  a: 100,
  b: {
    b1: 200,
    c1: 200
  }
};
console.log(obj1 === obj2); // false 因为是对指针的比较，所以 obj1 !== obj2
console.log(isDeepEqual(obj1, obj2)); // true key-value 相同即可。
```

### 实现 apply 函数:star2:

apply：用于在特定作用域中调用函数，接收两个参数，一个参数是函数的运行环境，另一个参数是被调用函数接收的参数。

```javascript
Function.prototype.myApply = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params[1];
  that.fn = this; // 绑定作用域
  return that.fn(...args); // 执行函数
}

// 测试用例
window.x = 1;
let a = {
  x: 2
};

function fn1 (num1, num2) {
  console.log(this.x);
  console.log(num1);
  console.log(num2);
}

fn1(1.1, 1.2); // 1、1.1、1.2
fn1.myApply(a, [2.1, 2.2]); // 2、2.1、2.2
```

### 实现 call 函数:star2:

call：它的作用和 apply 相同，只是接收参数的方式不同，接收不定数目参数，一个参数是函数的运行环境，其余参数全都是被调用函数接收的参数。

```javascript
Function.prototype.myCall = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params.slice(1); // 获取要指定的参数数组
  that.fn = this;
  return that.fn(...args);
}

// 测试用例
window.x = 1;
let a = {
  x: 2
};

function fn1 (num1, num2) {
  console.log(this.x);
  console.log(num1);
  console.log(num2);
}

fn1(1.1, 1.2); // 1、1.1、1.2
fn1.myCall(a, 2.1, 2.2); // 2、2.1、2.2
```

### 实现 bind 函数:star2:

bind：它的作用和 apply、call 类似，但是不是自己执行函数。它创建一个函数，接收不定数目的参数，一个参数是函数的运行环境，其余参数全都是被调用函数接收的参数。

```javascript
Function.prototype.myBind = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params.splice(1);
  that.fn = this;
  // 返回一个函数
  return function () {
    that.fn(...args);
  }
}

window.x = 1;
let a = {
  x: 2
};

function fn1 (num1, num2) {
  console.log(this.x);
  console.log(num1);
  console.log(num2);
}

fn1(1.1, 1.2); // 1、1.1、1.2
const fn2 = fn1.myBind(a, 2.1, 2.2);
fn2(); // 2、2.1、2.2
```

### 实现 new:star2:

### 实现 Object.create

### 实现 instanceof:star2: