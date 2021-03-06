# HTTP 协议

### HTTP 方法的具体作用？

常用的方法有以下几种：GET、POST、PATCH、PUT、DELETE。

GET：获取数据

POST：新建提交数据

PATCH / PUT：更新数据

DELETE：删除数据

### GET 和 POST 的区别？:star2:

- 从缓存的角度：
  - GET 请求会被浏览器主动缓存，留下历史记录。
  - POST 请求不会主动缓存。
- 从编码的角度：
  - GET 只能进行 URL 编码，只能接收 ASCII 字符。
  - POST 不受编码限制。
- 从参数的角度：
  - GET 一般放在 URL 中，因此不安全，同时长度会受到各方面限制。
  - POST 是放在请求体中，更适合传输敏感信息，同时理论上长度不受限制。
- 从幂等性的角度：
  - GET 请求是幂等的（幂等表示相同操作，结果也是相同的）
  - POST 请求不是幂等的。
- 从 TCP 的角度：
  - GET 请求会把请求报文一次发送过去。
  - POST 请求会分为两个 TCP 包，首先发送 header 部分，如果服务器有响应，再发送 body 部分。

### PUT 和 POST 都是新增资源，有什么区别？

POST 请求非幂等、PUT 请求具有幂等性。

### 幂等与非幂等的区别？

幂等：对于同一种行为，它不会对资源本身产生影响，无论执行多少次，结果都是相同的。

非幂等：对于同一种行为，它会对资源本身产生影响，最终的结果与执行的次数有关，每次执行后结果都不相同。

### get 请求是否可以传图片

图片的传输方式一般为两种，一种是通过 base64 进行传输，一种是通过 file 对象传输。我们简单分析下这两种方式是否可以。

第一种使用 base64 进行传输：GET 请求的 url 长度是有限制的，不同浏览器的长度限制不一样，最长为10k 左右。我们通过 base64 将图片转为字符串后，只能传递一些非常小的的图片。 其实这个长度限制是浏览器给的，而不是
GET 请求本身的限制，理论上如果浏览器不限制长度，就可以传任意大小的图片。

第二种使用 file 对象进行传输：正常情况下通过 POST 上传时，file 对象是放在请求体中，并且是 form-data 编码。GET 同样是有请求体的，那么服务端就可以拿到图片的信息。所以使用 file 对象的方式，我们可以使用
GET 请求传递任意大小的图片。

综上所述，GET 请求甚至是 PUT 都是可以传图片的，但是 GET 和 POST 的规范还是要遵守的。

### PUT 和 PATCH 都是修改资源，有什么区别？

- PATCH 请求非幂等、PUT 请求具有幂等性。
- PATCH 是局部更新资源，PUT 请求需要提供完整的资源对象。

### HTTP 请求报文格式？

请求行、请求头、空行、请求体。

### HTTP 响应报文格式？

响应行、响应头、空行、响应体。

### HTTP header（首部） 有哪些？:star2:

- 常见的 Request Headers：
  - Accept：浏览器可接收的数据格式。
  - Accept-Encoding：浏览器可接收的压缩算法，如 gzip。
  - Accept-Language：浏览器可接收的语言。
  - Connection：keep-alive 一次 TCP 连接重复使用。
  - Cookie：浏览器会自己带。
  - Host：请求的域名。
  - User-Agent：浏览器信息。
  - Content-type：发送的数据格式，如 application/json。
- 常见的 Response Headers：
  - Content-type：返回的数据格式，如 text/html。
  - Content-length：返回的数据大小。
  - Content-Encoding：返回数据的压缩算法，如 gzip。
  - Set-Cookie：服务端设置 Cookie。
- 缓存相关的 headers：
  - Cache-Control：服务器对资源进行强制缓存，控制缓存过期，属于 Response Header。
    - max-age：过期时间，单位为秒。
    - no-cache：不使用本地的强制缓存。
    - no-store：不使用本地的强制缓存，同时不使用服务端的其它缓存措施。
  - Expires：根据绝对时间控制缓存过期，但因为客户端和服务端存在时间偏差，所以已经被代替了，属于 Response Header。
  - Last-Modified：资源的最后修改时间，协商缓存是服务器返回给客户端的资源标识，属于 Response Header。
  - If-Modified-Since：资源的最后修改时间，协商缓存是客户端请求带给服务端的资源标识，属于 Request Header。
  - Etag：资源的唯一标识，协商缓存是服务器返回给客户端的资源标识，属于 Response Header。
  - If-None-Match：资源的唯一标识，协商缓存是客户端请求带给服务端的资源标识，属于 Request Header。

### HTTP 状态码有哪些？:star2:

- 1XX：服务器收到请求
- 2XX：请求成功
  - 200：OK 成功
  - 204：No Content 与200一致，但响应头后没有 body 数据。
  - 206：Partial Content 表示请求部分内容，多用于分快下载或者断点续传。
- 3XX：重定向
  - 301：永久重定向（域名到期可以使用，浏览器会记住，下次访问本域名是直接重定向到返回的 location 的地址）
  - 302：临时重定向（只是本次会重定向）
  - 304：资源未被修改，协商缓存触发（资源在本地还有效，可以使用缓存）
- 4XX：客户端错误
  - 400：请求存在语法错误或缺少参数。
  - 403：服务器禁止访问，没有权限。
  - 404：资源未找到。
- 5XX：服务端错误
  - 500：服务器错误，宕机或者有 bug
  - 504：网关超时

### 同样是重定向，301、302、303、307的区别？

301：永久重定向（域名到期可以使用，浏览器会记住，下次访问本域名是直接重定向到返回的 location 的地址）

302：临时重定向（只是本次会重定向）

303：查看其它位置，请求者应该对不同的位置使用单独的请求来获取响应。

307：临时重定向，实际效果同302。

### HTTP 请求的特点？

灵活可扩展：语意上自由，传输形式多样。

可靠传输：基于 TCP/IP，继承了其特性。

请求-应答形式：一发一收，有来有回。

无状态：通信过程的上下文信息是独立、无关的。

### HTTP 的缺点？

无状态：长连接时，HTTP 不会保存大量的上下文信息，造成传输大量重复信息。

明文传输：请求/响应头不使用二进制数据，而是文本形式。

队头阻塞：长连接时，共用一个 TCP 连接，同时刻只能处理一个请求，当前请求耗时过长时，其它请求会造成阻塞。

### 为什么有了 HTTP 还要 HTTPS？:star2:

- HTTP 协议存在的问题：
  - 通信内容使用明文没有加密
  - 无法保证报文的完整性，内容可能被篡改
  - 不验证通信方之间的身份，有可能遭遇伪装
- HTTPS 的优势就是解决了上述三个问题：
  - 数据隐私：通信内容经过加密
  - 数据完整：内容传输经过完整性校验
  - 身份认证：第三方无法伪造身份

### HTTPS 如何保证安全、原理？:star2:

- HTTPS 只是 HTTP 通信接口部分用 SSL 和 TLS 协议代替。
- SSL 和 TLS 的功能主要依赖于三类基本算法：
  - 非对称加密：实现身份验证和密钥协商。
  - 对称加密：采用协商密钥对通信内容进行加密。
  - 散列函数：验证信息完整性。

### HTTP2、HTTP1.X 有什么功能？:star2:

- 1.1功能：
  - 长链接：使用 keep-alive 进行复用
  - 断点续传功能
  - 新增缓存方式：强缓存新增 Cache-Control、协商缓存新增 Etag
- 2功能：只能用在 HTTPS 的基础上。
  - 多路复用：只会创建一个 TCP 连接，减少 TCP 握手带来的损耗，同时不需要等待上一个请求的响应。
  - 二进制分帧：应用层和传输层之间。
  - 头部压缩：使用 HPACK 算法来压缩头部。
  - 服务端推送：当客户端请求某个资源时，服务器知道它可能需要另外的资源，提前推送过去。

### HTTP 的 keep-alive（持久连接）是干什么的？

- HTTP协议采用“请求-应答”模式，当使用非 Keep-Alive 模式时，每次发送请求时，客户端和服务器都要新建一个连接，完成之后就断开连接。
- 当使用 Keep-Alive 模式时，Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接。

### HTTP 的 pipeline（管道化）是干什么的？

HTTP1.1 允许在持久连接上可选择使用请求管道。这是相对于 keep-alive
连接的又一性能优化。在响应到达之前，可以将多条请求放入队列，当第一条请求发往服务器的时候，第二第三条请求也可以开始发送了。在高延时网络条件下，这样做可以降低网络的环回时间，提高性能。

### 多路复用与 keep-alive 的区别？

HTTP1.x 虽然引入了 keep-alive 长连接，但它每次请求必须等待上一次响应之后才能发起，

HTTP2 它引入了帧（frame）和流（stream），因为 HTTP1.x 是基于文本的，因为是文本，就导致了它必须是个整体，在传输是不可切割的，只能整体去传。HTTP2 是基于二进制流的，它就可以把 HTTP
消息分解为独立的帧，交错发送，然后在另一端通过帧中的标识重新组装，这就是多路复用。这就实现了在同一个TCP连接中，同一时刻可以发送多个请求和响应，且不用按照顺序一一对应，即使某个请求任务耗时严重，也不会影响到其它连接的正常执行。

- 区别：
  - HTTP1.x 是基于文本的，只能整体去传；HTTP2 是基于二进制流的，可以分解为独立的帧，交错发送。
  - HTTP1.x keep-alive 必须按照请求发送的顺序返回响应；HTTP2 多路复用不按序响应。
  - HTTP1.x keep-alive 为了解决队头阻塞，需要将同一个页面的资源分散到不同域名下，开启了多个 TCP 连接；HTTP2 同域名下所有通信都在单个连接上完成。
  - HTTP1.x keep-alive 单个 TCP 连接在同一时刻只能处理一个请求（两个请求的生命周期不能重叠）；HTTP2 单个 TCP 同一时刻可以发送多个请求和响应

### HTTP2 有没有完全解决了队头阻塞问题？:star2:

首先我们要明确，队头阻塞分 TCP 队头阻塞和 HTTP 队头阻塞两种。HTTP2 解决的是 HTTP 的队头阻塞，TCP 的队头阻塞仍然存在。

TCP 的阻塞问题是因为传输阶段可能会丢包，TCP 是一个按序传输的通道,一旦丢包就会等待重新发包，阻塞后续内容传输。

HTTP 的阻塞问题是因为当使用管道化，多个 HTTP 请求会使用同一个 TCP 连接，如果前一个请求未及时响应，后面的响应也会被阻塞。

HTTP2 解决的是 HTTP 的队头阻塞，而不能解决 TCP 的队头阻塞，所以说没有完全解决队头阻塞的问题。TCP 中的队头阻塞的产生是由 TCP 自身的实现机制决定的，无法避免。想要在应用程序当中避免 TCP
队头阻塞带来的影响，只有舍弃 TCP 协议。

