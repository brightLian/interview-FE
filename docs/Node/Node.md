# Node 相关知识

### node 事件循环？

- timers 阶段：执行 setTimeout() 和 setInterval() 的回调函数。
- I/O callbacks 阶段：执行延迟到下一个循环的 I/O 回调。（也就是除了 setTimeout、setInterval、setImmediate、socket 的回调函数）
- idle、prepare 阶段：仅 libuv 内部系统内部调用。
- Poll 阶段即轮询的阶段：
  - 如果 poll 队列不为空，会检索并执行新的 I/O 回调事件。
  - 如果为空：
    - 若调用了 setImmediate() 就结束 poll 阶段，直接进入 check 阶段。
    - 如果没有调用setImmediate()，就会等待，等待新的回调I/O事件的到来，然后立即执行
    - 如果脚本没有调用了setImmediate()，并且poll队列为空的时候，事件循环将检查哪些计时器 timer 已经到时间。 如果一个或多个计时器 timer
      准备就绪，则事件循环将返回到计时器阶段，以执行这些计时器的回调，这也相当于开启了新一次的循环（tick）
- check 阶段：执行 setImmediate() 的回调函数。
- close callbacks 阶段：执行关闭请求的回调函数，比如 socket.on('close', ...)

### 什么是线程，什么是进程？

- 进程：计算机中运行的程序。
- 线程：包含在进程中，是进程中实际运作的单位。

### Node 与 V8 的线程？

- Node 是单线程的，但是启动后线程不是1，是因为 Node 启动后会创建 V8 实例，V8 实例是多线程的。
- V8 中的线程有：
  - 主线程：负责编译、执行代码
  - 编译/优化线程：在主线程执行时，负责优化代码
  - 分析器线程：记录和分析代码运行时间，为优化提供依据
  - 其他线程：包括垃圾回收的多个线程

### pm2相关

### 使用 Express 主要用来做什么？:star2:

- 提供页面的路由
- 充当 controller 进行数据聚合
- 前端报警监控，sentry 中间件
- 写一些拦截器 interceptor

### cluster 模块使用

### child_process 模块使用

### npm 模块安装原理

- 发出 npm install 命令
- 查询 node_modules 目录之中是否已经存在指定模块
  - 若存在，不再重新安装
  - 若不存在
    - npm 向 registry 查询模块压缩包的网址
    - 下载压缩包，存放在根目录下的.npm目录里
    - 解压压缩包到当前项目的node_modules目录