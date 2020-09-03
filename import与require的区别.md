# **import 与 require 的区别**

2017.12.27 10:01 12047 浏览

> **require 与 import 之间的区别**

在 es6 之前 js 一直没有自己的模块语法，为了解决这种尴尬就有了 require.js 的出现。在 es6 发布之后 js 又引入了 import 的概念使得不清楚两者之间的区别的同学在实际使用过程中造成了自己的误解，在查阅了相关资料之后在此记录下自己的小小见解。

---

- require 的基本语法

核心概念：在导出的文件中定义 module.export,导出的对象的类型不予限定（可以是任何类型，字符串，变量，对象，方法），在引入的文件中调用 require()方法引入对象即可。

```js
//a.js中
module.export = {
    a: function(){
     console.log(666)
  }
}
//b.js中
var obj = require('../a.js')
obj.a()  //666
```

【注】:本质上是将要导出的对象赋值给 module 这个的对象的 export 属性，在其他文件中通过 require 这个方法访问该属性

- import 的基本语法
  核心概念：导出的对象必须与模块中的值一一对应，换一种说法就是**导出的对象与整个模块进行结构赋值**。对的，你没有听错。抓住重点，解构赋值！！！！！

```js
//a.js中
export default{    //（最常使用的方法,加入default关键字代表在import时可以使用任意变量名并且不需要花括号{}）
     a: function(){
         console.log(666)
   }
}

export function(){  //导出函数

}

export {newA as a ,b,c}  //  解构赋值语法(as关键字在这里表示将newA作为a的数据接口暴露给外部，外部不能直接访问a)

//b.js中
import  a  from  '...'  //import常用语法（需要export中带有default关键字）可以任意指定import的名称

import {...} from '...'  // 基本方式，导入的对象需要与export对象进行解构赋值。

import a as biubiubiu from '...'  //使用as关键字，这里表示将a代表biubiubiu引入（当变量名称有冲突时可以使用这种方式解决冲突）

import {a as biubiubiu,b,c}  //as关键字的其他使用方法
```

---

**它们之间的区别**

- require 是赋值过程并且是运行时才执行， import 是解构过程并且是编译时执行。require 可以理解为一个全局方法，所以它甚至可以进行下面这样的骚操作，是一个方法就意味着可以在任何地方执行。而 import 必须写在文件的顶部。

```js
var a = require(a() + '/ab.js')
```

- require 的性能相对于 import 稍低，因为 require 是在运行时才引入模块并且还赋值给某个变量，而 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高
- 在 commom.js 中 module.export 之后 导出的值就不能再变化，但是在 es6 的 export 中是可以的。

```js
var a = 6
export default {a}
a = 7  //在es6中的export可以
var a = 6
module.export = a
a = 7   //在common.js中，这样是错误的
```
