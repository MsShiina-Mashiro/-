![DOM事件与事件委托简介](https://pic3.zhimg.com/v2-2b4f5b7895005b22dbd4f2f859eeb1c9_1440w.jpg?source=172ae18b)

# DOM事件与事件委托简介

**一、DOM事件模型**

事件的本质是程序各个组成部分之间的一种通信方式，也是javascript和HTML交互基础，任何文档或者浏览器窗口发生的交互， 都要通过绑定事件进行交互，比如click(点击)、load(加载)、mouseover(鼠标悬停)等。DOM 支持大量的事件，不同的DOM事件会有不同的触发条件和触发效果。事件流描述的是从页面中接收事件的顺序，也可理解为事件在页面中传播的顺序。DOM事件模型的事件流可分为捕获和冒泡，一个事件发生后，会在子元素和父元素之间传播（propagation）。

- 事件**捕获**阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。和事件冒泡相反，事件捕获是自上而下执行。
- 事件**冒泡**阶段：事件冒泡的流程刚好是事件捕获的逆过程，事件从事件目标(target)开始，自下而上冒泡直到页面的最上一级标签。

![img](https://pic3.zhimg.com/80/v2-f7582e94d448e4f7c3656af10d654805_720w.jpg)DOM事件捕获和冒泡的具体流程

- DOM 的事件**操作**（监听和触发），都定义在EventTarget接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，XMLHttpRequest、AudioNode、AudioContext）也部署了这个接口。EventTarget.addEventListener()用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

```js
target.addEventListener(type, listener[, useCapture]);
//type：事件名称，大小写敏感。
//listener：监听函数。事件发生时，会调用该监听函数。
//useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，该参数可选。
```

addEventListener的第三个参数为指定事件是否在捕获阶段执行，设置为true表示事件在捕获阶段执行，而设置为false表示事件在冒泡阶段执行。

**二、事件委托（事件代理）**

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个``节点上定义监听函数，以减少内存消耗，提高性能。以后再添加子节点，监听函数依然有效（**动态绑定事件**）。

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```

把 #list 下的 li 元素的事件代理委托到它的父层元素也就是 #list 上：

```js
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'li') {
    console.log('the content is: ', target.innerHTML);
  }
});
```

在上述代码中， target 元素则是在 #list 元素之下具体被点击的元素，然后通过判断 target 的一些属性（比如：nodeName，id 等等）可以更精确地匹配到某一类 #list li 元素之上。