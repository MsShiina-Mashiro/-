# 一个完整的 HTTP 请求过程

## 整个流程

域名解析 —> 与服务器建立连接 —> 发起 HTTP 请求 —> 服务器响应 HTTP 请求，浏览器得到 html 代码 —> 浏览器解析 html 代码，并请求 html 代码中的资源（如 js、css、图片） —> 浏览器对页面进行渲染呈现给用户

### 1. 域名解析

以 Chrome 浏览器为例：

① Chrome 浏览器 会首先搜索浏览器自身的 DNS 缓存（缓存时间比较短，大概只有 1 分钟，且只能容纳 1000 条缓存），看自身的缓存中是否有[https://www.cnblogs.com](https://www.cnblogs.com/) 对应的条目，而且没有过期，如果有且没有过期则解析到此结束。

注：我们怎么查看 Chrome 自身的缓存？可以使用 chrome://net-internals/#dns 来进行查看

② 如果浏览器自身的缓存里面没有找到对应的条目，那么 Chrome 会搜索操作系统自身的 DNS 缓存,如果找到且没有过期则停止搜索解析到此结束.

注：怎么查看操作系统自身的 DNS 缓存，以 Windows 系统为例，可以在命令行下使用 ipconfig /displaydns 来进行查看

③ 如果在 Windows 系统的 DNS 缓存也没有找到，那么尝试读取 hosts 文件（位于 C:\Windows\System32\drivers\etc），看看这里面有没有该域名对应的 IP 地址，如果有则解析成功。

④ 如果在 hosts 文件中也没有找到对应的条目，浏览器就会发起一个 DNS 的系统调用，就会向本地配置的首选 DNS 服务器（一般是电信运营商提供的，也可以使用像 Google 提供的 DNS 服务器）发起域名解析请求（通过的是 UDP 协议向 DNS 的 53 端口发起请求，这个请求是递归的请求，也就是运营商的 DNS 服务器必须得提供给我们该域名的 IP 地址），运营商的 DNS 服务器首先查找自身的缓存，找到对应的条目，且没有过期，则解析成功。如果没有找到对应的条目，则有运营商的 DNS 代我们的浏览器发起迭代 DNS 解析请求，它首先是会找根域的 DNS 的 IP 地址（这个 DNS 服务器都内置 13 台根域的 DNS 的 IP 地址），找打根域的 DNS 地址，就会向其发起请求（请问www.cnblogs.com这个域名的IP地址是多少啊？），根域发现这是一个顶级域com域的一个域名，于是就告诉运营商的DNS我不知道这个域名的IP地址，但是我知道com域的IP地址，你去找它去，于是运营商的DNS就得到了com域的IP地址，又向com域的IP地址发起了请求（请问www.cnblogs.com这个域名的IP地址是多少?）,com域这台服务器告诉运营商的DNS我不知道www.cnblogs.com这个域名的IP地址，但是我知道cnblogs.com这个域的DNS地址，你去找它去，于是运营商的DNS又向cnblogs.com这个域名的DNS地址（这个一般就是由域名注册商提供的，像万网，新网等）发起请求（请问www.cnblogs.com这个域名的IP地址是多少？），这个时候cnblogs.com域的DNS服务器一查，诶，果真在我这里，于是就把找到的结果发送给运营商的DNS服务器，这个时候运营商的DNS服务器就拿到了www.cnblogs.com这个域名对应的IP地址，并返回给Windows系统内核，内核又把结果返回给浏览器，终于浏览器拿到了www.cnblogs.com 对应的 IP 地址，该进行一步的动作了。

注：一般情况下是不会进行以下步骤的

如果经过以上的 4 个步骤，还没有解析成功，那么会进行如下步骤（以下是针对 Windows 操作系统）：

⑤ 操作系统就会查找 NetBIOS name Cache（NetBIOS 名称缓存，就存在客户端电脑中的），那这个缓存有什么东西呢？凡是最近一段时间内和我成功通讯的计算机的计算机名和 Ip 地址，就都会存在这个缓存里面。什么情况下该步能解析成功呢？就是该名称正好是几分钟前和我成功通信过，那么这一步就可以成功解析。

⑥ 如果第 ⑤ 步也没有成功，那会查询 WINS 服务器（是 NETBIOS 名称和 IP 地址对应的服务器）

⑦ 如果第 ⑥ 步也没有查询成功，那么客户端就要进行广播查找

⑧ 如果第 ⑦ 步也没有成功，那么客户端就读取 LMHOSTS 文件（和 HOSTS 文件同一个目录下，写法也一样）

如果第八步还没有解析成功，那么就宣告这次解析失败，那就无法跟目标计算机进行通信。只要这八步中有一步可以解析成功，那就可以成功和目标计算机进行通信。

### 2. 与服务器建立连接

#### 2.1 TCP 连接的建立

客户端的请求到达服务器，首先就是建立 TCP 连接

![img](http://7xqlni.com1.z0.glb.clouddn.com/tcp.png)

来源于：https://blog.csdn.net/u012248450/article/details/51036329

1. Client 首先发送一个连接试探，ACK=0 表示确认号无效，SYN = 1 表示这是一个连接请求或连接接受报文，同时表示这个数据报不能携带数据，seq = x 表示 Client 自己的初始序号（seq = 0 就代表这是第 0 号包），这时候 Client 进入 syn_sent 状态，表示客户端等待服务器的回复
2. Server 监听到连接请求报文后，如同意建立连接，则向 Client 发送确认。TCP 报文首部中的 SYN 和 ACK 都置 1 ，ack = x + 1 表示期望收到对方下一个报文段的第一个数据字节序号是 x+1，同时表明 x 为止的所有数据都已正确收到（ack=1 其实是 ack=0+1,也就是期望客户端的第 1 个包），seq = y 表示 Server 自己的初始序号（seq=0 就代表这是服务器这边发出的第 0 号包）。这时服务器进入 syn_rcvd，表示服务器已经收到 Client 的连接请求，等待 client 的确认。
3. Client 收到确认后还需再次发送确认，同时携带要发送给 Server 的数据。ACK 置 1 表示确认号 ack= y + 1 有效（代表期望收到服务器的第 1 个包），Client 自己的序号 seq= x + 1（表示这就是我的第 1 个包，相对于第 0 个包来说的），一旦收到 Client 的确认之后，这个 TCP 连接就进入 Established 状态，就可以发起 http 请求了。

##### 问题 1：TCP 为什么需要 3 次握手？

2 个计算机通信是靠协议（目前流行的 TCP/IP 协议）来实现,如果 2 个计算机使用的协议不一样，那是不能进行通信的，所以这个 3 次握手就相当于试探一下对方是否遵循 TCP/IP 协议，协商完成后就可以进行通信了，当然这样理解不是那么准确。

##### 问题 2：为什么 HTTP 协议要基于 TCP 来实现？

目前在 Internet 中所有的传输都是通过 TCP/IP 进行的，HTTP 协议作为 TCP/IP 模型中应用层的协议也不例外，TCP 是一个端到端的可靠的面向连接的协议，所以 HTTP 基于传输层 TCP 协议不用担心数据的传输的各种问题。

#### 2.2 常见 TCP 连接限制

##### 2.2.1 修改用户进程可打开文件数限制

在 Linux 平台上，无论编写客户端程序还是服务端程序，在进行高并发 TCP 连接处理时，最高的并发数量都要受到系统对用户单一进程同时可打开文件数量的限制(这是因为系统为每个 TCP 连接都要创建一个 socket 句柄，每个 socket 句柄同时也是一个文件句柄)。可使用 ulimit 命令查看系统允许当前用户进程打开的文件数限制，windows 上是 256，linux 是 1024，这个博客的服务器是 65535

##### 2.2.2 修改网络内核对 TCP 连接的有关限制

在 Linux 上编写支持高并发 TCP 连接的客户端通讯处理程序时，有时会发现尽管已经解除了系统对用户同时打开文件数的限制，但仍会出现并发 TCP 连接数增加到一定数量时，再也无法成功建立新的 TCP 连接的现象。出现这种现在的原因有多种。
第一种原因可能是因为 Linux 网络内核对本地端口号范围有限制。此时，进一步分析为什么无法建立 TCP 连接，会发现问题出在 connect()调用返回失败，查看系统错误提示消息是“Can’t assign requestedaddress”。同时，如果在此时用 tcpdump 工具监视网络，会发现根本没有 TCP 连接时客户端发 SYN 包的网络流量。这些情况说明问题在于本地 Linux 系统内核中有限制。

其实，问题的根本原因在于 Linux 内核的 TCP/IP 协议实现模块对系统中所有的客户端 TCP 连接对应的本地端口号的范围进行了限制(例如，内核限制本地端口号的范围为 1024~32768 之间)。当系统中某一时刻同时存在太多的 TCP 客户端连接时，由于每个 TCP 客户端连接都要占用一个唯一的本地端口号(此端口号在系统的本地端口号范围限制中)，如果现有的 TCP 客户端连接已将所有的本地端口号占满，则此时就无法为新的 TCP 客户端连接分配一个本地端口号了，因此系统会在这种情况下在 connect()调用中返回失败，并将错误提示消息设为“Can’t assignrequested address”。

#### 2.3 TCP 四次挥手

当客户端和服务器通过三次握手建立了 TCP 连接以后，当数据传送完毕，肯定是要断开 TCP 连接的啊。那对于 TCP 的断开连接，这里就有了神秘的“四次分手”。

![img](http://upload-images.jianshu.io/upload_images/3985563-c1c59148f8b26c43.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

第一次分手：主机 1（可以使客户端，也可以是服务器端），设置 Sequence Number，向主机 2 发送一个 FIN 报文段；此时，主机 1 进入 FIN_WAIT_1 状态；这表示主机 1 没有数据要发送给主机 2 了；

第二次分手：主机 2 收到了主机 1 发送的 FIN 报文段，向主机 1 回一个 ACK 报文段，Acknowledgment Number 为 Sequence Number 加 1；主机 1 进入 FIN_WAIT_2 状态；主机 2 告诉主机 1，我“同意”你的关闭请求；

第三次分手：主机 2 向主机 1 发送 FIN 报文段，请求关闭连接，同时主机 2 进入 LAST_ACK 状态；

第四次分手：主机 1 收到主机 2 发送的 FIN 报文段，向主机 2 发送 ACK 报文段，然后主机 1 进入 TIME_WAIT 状态；主机 2 收到主机 1 的 ACK 报文段以后，就关闭连接；此时，主机 1 等待 2MSL 后依然没有收到回复，则证明 Server 端已正常关闭，那好，主机 1 也可以关闭连接了。

##### 问题 1：为什么要四次分手？

TCP 协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP 是全双工模式，这就意味着，当主机 1 发出 FIN 报文段时，只是表示主机 1 已经没有数据要发送了，主机 1 告诉主机 2，它的数据已经全部发送完毕了；但是，这个时候主机 1 还是可以接受来自主机 2 的数据；当主机 2 返回 ACK 报文段时，表示它已经知道主机 1 没有数据发送了，但是主机 2 还是可以发送数据到主机 1 的；当主机 2 也发送了 FIN 报文段时，这个时候就表示主机 2 也没有数据要发送了，就会告诉主机 1，我也没有数据要发送了，之后彼此就会愉快的中断这次 TCP 连接。

### 3. 发起 HTTP 请求

#### 3.1 HTTP 协议

HTTP 是一个客户端和服务器端请求和应答的标准（TCP）。客户端是终端用户，服务器端是网站。通过使用 Web 浏览器、网络爬虫或者其它的工具，客户端发起一个到服务器上指定端口（默认端口为 80）的 HTTP 请求。

通俗来讲，他就是计算机通过网络进行通信的规则，是一个基于请求与响应，无状态的，应用层的协议，常基于 TCP/IP 协议传输数据。目前任何终端（手机，笔记本电脑。。）之间进行任何一种通信都必须按照 Http 协议进行，否则无法连接。

##### 3.1.1 四个基于

1. **请求与响应：**客户端发送请求，服务器端响应数据
2. **无状态的：**协议对于事务处理没有记忆能力，客户端第一次与服务器建立连接发送请求时需要进行一系列的安全认证匹配等，因此增加页面等待时间，当客户端向服务器端发送请求，服务器端响应完毕后，两者断开连接，也不保存连接状态，一刀两断！恩断义绝！从此路人！下一次客户端向同样的服务器发送请求时，由于他们之前已经遗忘了彼此，所以需要重新建立连接。
3. **应用层：** Http 是属于应用层的协议，配合 TCP/IP 使用。
4. **TCP/IP：** Http 使用 TCP 作为它的支撑运输协议。HTTP 客户机发起一个与服务器的 TCP 连接，一旦连接建立，浏览器（客户机）和服务器进程就可以通过套接字接口访问 TCP。

#### 3.2 HTTP 请求报文

一个 HTTP 请求报文由请求行（request line）、请求头部（header）、空行和请求数据 4 个部分组成，下图给出了请求报文的一般格式。

![img](http://upload-images.jianshu.io/upload_images/3985563-cd59a3899ef546e1.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

##### 3.2.1 请求行

请求行分为三个部分：请求方法、请求地址和协议版本

**请求方法**

HTTP/1.1 定义的请求方法有 8 种：GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS、TRACE。

最常的两种 GET 和 POST，如果是 RESTful 接口的话一般会用到 GET、POST、DELETE、PUT。

**请求地址**

URL:统一资源定位符，是一种自愿位置的抽象唯一识别方法。

组成：<协议>：//<主机>：<端口>/<路径> **注：端口和路径有时可以省略（HTTP 默认端口号是 80）**

https://localhost:8080/index.html?key1=value1&keys2=value2

**协议版本**

协议版本的格式为：HTTP/主版本号.次版本号，常用的有 HTTP/1.0 和 HTTP/1.1

##### 3.2.2 请求头部

请求头部为请求报文添加了一些附加信息，由“名/值”对组成，每行一对，名和值之间使用冒号分隔。

常见请求头如下：

![img](http://upload-images.jianshu.io/upload_images/3985563-539378eee14fa322.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

请求头部的最后会有一个空行，表示请求头部结束，接下来为请求数据，这一行非常重要，必不可少。

##### 3.2.3 请求数据

可选部分，比如 GET 请求就没有请求数据。

下面是一个 POST 方法的请求报文：

```
POST 　/index.php　HTTP/1.1 　　 请求行
Host: localhost
User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2　　请求头
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8
Accept-Language: zh-cn,zh;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Referer: http://localhost/
Content-Length：25
Content-Type：application/x-www-form-urlencoded
　　空行
username=aa&password=1234　　请求数据
123456789101112
```

### 4. 服务器响应 HTTP 请求，浏览器得到 html 代码

#### 4.1 负载均衡

接收到 HTTP 请求之后，就轮到负载均衡登场了，它位于网站的最前端，把短时间内较高的访问量分摊到不同机器上处理。负载均衡方案有软件、硬件两种

##### 4.1.1 负载均衡硬件方案

F5 BIG-IP 是著名的硬件方案，但这里不作讨论

##### 4.1.2 负载均衡软件方案

有 LVS HAProxy Nginx 等，留作以后补充

在典型的 Rails 应用部署方案中，Nginx 的作用有两个

1. 处理静态文件请求
2. 转发请求给后端的 Rails 应用
   这是一个简单的 Nginx 配置文件

![img](http://7xqlni.com1.z0.glb.clouddn.com/nginxconfig.png)

来源于：https://blog.csdn.net/u012248450/article/details/51036329

后端的 Rails 服务器通过 unix socket 与 Nginx 通信，Nginx 伺服 public 文件夹里的静态文件给用户

待完善…

#### 4.2 Rails(应用服务器)

#### 4.3 数据库（数据库服务器）

#### 4.4 Redis、Memercache（缓存服务器）

#### 4.5 消息队列

#### 4.6 搜索

#### 4.7 HTTP 响应报文

![img](http://upload-images.jianshu.io/upload_images/3985563-c6ee8f8526f59fc0.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

HTTP 响应报文主要由状态行、响应头部、空行以及响应数据组成。

##### 4.7.1 状态行

由 3 部分组成，分别为：协议版本，状态码，状态码描述。

其中协议版本与请求报文一致，状态码描述是对状态码的简单描述，所以这里就只介绍状态码。

**状态码**

状态代码为 3 位数字。

- 1xx：指示信息–表示请求已接收，继续处理。
- 2xx：成功–表示请求已被成功接收、理解、接受。
- 3xx：重定向–要完成请求必须进行更进一步的操作。
- 4xx：客户端错误–请求有语法错误或请求无法实现。
- 5xx：服务器端错误–服务器未能实现合法的请求。

下面列举几个常见的：

![img](http://upload-images.jianshu.io/upload_images/3985563-8f3bf059bc4365e3.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

##### 4.7.2 响应头部

与请求头部类似，为响应报文添加了一些附加信息

常见响应头部如下：

![img](http://upload-images.jianshu.io/upload_images/3985563-33ed95479f541a07.png)

来源于：https://blog.csdn.net/LRH0211/article/details/72724361

##### 4.7.3 响应数据

用于存放需要返回给客户端的数据信息。

下面是一个响应报文的实例：

```
HTTP/1.1 200 OK　　状态行
Date: Sun, 17 Mar 2013 08:12:54 GMT　　响应头部
Server: Apache/2.2.8 (Win32) PHP/5.2.5
X-Powered-By: PHP/5.2.5
Set-Cookie: PHPSESSID=c0huq7pdkmm5gg6osoe3mgjmm3; path=/
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-Length: 4393
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html; charset=utf-8
　　空行
　　响应数据

HTTP响应示例


Hello HTTP!
12345678910111213141516171819
```

关于请求头部和响应头部的知识点很多，这里只是简单介绍。

### 5. 浏览器解析 html 代码，并请求 html 代码中的资源

浏览器拿到 index.html 文件后，就开始解析其中的 html 代码，遇到 js/css/image 等静态资源时，就向服务器端去请求下载（会使用多线程下载，每个浏览器的线程数不一样），这个时候就用上 keep-alive 特性了，建立一次 HTTP 连接，可以请求多个资源，下载资源的顺序就是按照代码里的顺序，但是由于每个资源大小不一样，而浏览器又多线程请求请求资源，所以从下图看出，这里显示的顺序并不一定是代码里面的顺序。

浏览器在请求静态资源时（在未过期的情况下），向服务器端发起一个 http 请求（询问自从上一次修改时间到现在有没有对资源进行修改），如果服务器端返回 304 状态码（告诉浏览器服务器端没有修改），那么浏览器会直接读取本地的该资源的缓存文件。

![图](https://img.coocaa.com/gold-manage/images/uploads/img/20180529/20180529143316.png)

详细的浏览器工作原理请看：http://kb.cnblogs.com/page/129756/

### 6. 浏览器对页面进行渲染呈现给用户

最后，浏览器利用自己内部的工作机制，把请求到的静态资源和 html 代码进行渲染，渲染之后呈现给用户。

## 参考文献

> 一次完整的 HTTP 请求与响应涉及了哪些知识？ https://blog.csdn.net/LRH0211/article/details/72724361
>
> 一次完整的 HTTP 请求过程 https://www.cnblogs.com/engeng/articles/5959335.html
>
> 后端知识体系–一次完整的 HTTP 请求 https://blog.csdn.net/u012248450/article/details/51036329
