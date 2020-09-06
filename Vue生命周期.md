# 详解 vue 生命周期

首先，每个 Vue 实例在被**创建**之前都要经过一系列的初始化过程,这个过程就是 vue 的生命周期。首先看一张图吧~这是官方文档上的图片相信大家一定都会很熟悉：

![clipboard.png](https://segmentfault.com/img/bVVORa?w=1200&h=3039)

可以看到在 vue 一整个的生命周期中会有很多**钩子函数**提供给我们在 vue 生命周期不同的时刻进行操作, 那么先列出所有的钩子函数，然后我们再一一详解:

- **beforeCreate**
- **created**
- **beforeMount**
- **mounted**
- **beforeUpdate**
- **updated**
- **beforeDestroy**
- **destroyed**

先来一波代码，各位复制在浏览器中运行，打开 console 查看就行了：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>vue生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{message}}</h1>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Vue的生命周期'
    },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined
      console.log("%c%s", "color:red","message: " + this.message)
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message)
    }
  })
</script>
</html>
```

运行后打开 console 可以看到打印出来内容如下:

![clipboard.png](https://segmentfault.com/img/bVVT3m?w=938&h=448)

可以看到一个 vue 实例在创建过程中调用的几个生命周期钩子。

##### **1. 在 beforeCreate 和 created 钩子函数之间的生命周期**

在这个生命周期之间，进行**初始化事件，进行数据的观测**，可以看到在**created**的时候数据已经和**data 属性进行绑定**（放在 data 中的属性当值发生改变的同时，视图也会改变）。
注意看下：此时还是没有 el 选项

##### **2. created 钩子函数和 beforeMount 间的生命周期**

![clipboard.png](https://segmentfault.com/img/bVVUb9?w=571&h=509)

在这一阶段发生的事情还是比较多的。

首先会判断对象是否有**el 选项**。**如果有的话就继续向下编译，如果没有**el 选项**，则停止编译，也就意味着停止了生命周期，直到在该 vue 实例上调用 vm.\$mount(el)。**此时注释掉代码中:

```
el: '#app',
```

然后运行可以看到到 created 的时候就停止了：

![clipboard.png](https://segmentfault.com/img/bVVUB3?w=764&h=285)

如果我们在后面继续调用 vm.\$mount(el),可以发现代码继续向下执行了

```
vm.$mount(el) //这个el参数就是挂在的dom接点
```

![clipboard.png](https://segmentfault.com/img/bVVUCG?w=691&h=441)

然后，我们往下看，**template**参数选项的有无对生命周期的影响。
（1）.如果 vue 实例对象中有 template 参数选项，则将其作为模板编译成 render 函数。
（2）.如果没有 template 选项，则将外部 HTML 作为模板编译。
（3）.可以看到 template 中的模板优先级要高于 outer HTML 的优先级。
修改代码如下, 在 HTML 结构中增加了一串 html，在 vue 对象中增加了**template 选项**：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>vue生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <!--html中修改的-->
    <h1>{{message + '这是在outer HTML中的'}}</h1>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    template: "<h1>{{message +'这是在template中的'}}</h1>", //在vue配置项中修改的
    data: {
      message: 'Vue的生命周期'
    }
</script>
</html>
```

执行后的结果可以看到在页面中显示的是：

![clipboard.png](https://segmentfault.com/img/bVVUJT?w=910&h=118)

那么将 vue 对象中 template 的选项注释掉后打印如下信息：

![clipboard.png](https://segmentfault.com/img/bVVUJ3?w=717&h=97)

这下就可以想想什么**el 的判断**要在 template 之前了~是因为 vue 需要通过 el 找到对应的 outer template。

在 vue 对象中还有一个**render 函数**，它是以 createElement 作为参数，然后做渲染操作，而且我们可以直接嵌入 JSX.

```
new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement('h1', 'this is createElement')
    }
})
```

可以看到页面中渲染的是：

![clipboard.png](https://segmentfault.com/img/bVVUSo?w=477&h=76)

所以综合排名优先级：
render 函数选项 > template 选项 > outer HTML.

##### **3. beforeMount 和 mounted 钩子函数间的生命周期**

![clipboard.png](https://segmentfault.com/img/bVVUTK?w=451&h=198)

可以看到此时是给 vue 实例对象添加**\$el 成员**，并且替换掉挂在的 DOM 元素。因为在之前 console 中打印的结果可以看到**beforeMount**之前 el 上还是 undefined。

#### **4. mounted**

注意看下面截图：

![clipboard.png](https://segmentfault.com/img/bVVUYC?w=424&h=274)

在 mounted 之前 h1 中还是通过**{{message}}**进行占位的，因为此时还有挂在到页面上，还是 JavaScript 中的虚拟 DOM 形式存在的。在 mounted 之后可以看到 h1 中的内容发生了变化。

##### **5. beforeUpdate 钩子函数和 updated 钩子函数间的生命周期**

![clipboard.png](https://segmentfault.com/img/bVVU0E?w=558&h=295)

当 vue 发现 data 中的数据发生了改变，会**触发对应组件的重新渲染**，先后调用**beforeUpdate**和**updated**钩子函数。我们在 console 中输入：

```
vm.message = '触发组件更新'
```

发现触发了组件的更新：

![clipboard.png](https://segmentfault.com/img/bVVU55?w=500&h=356)

##### **6.beforeDestroy 和 destroyed 钩子函数间的生命周期**

![clipboard.png](https://segmentfault.com/img/bVVU6C?w=383&h=368)

**beforeDestroy**钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
**destroyed**钩子函数在 Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
