# Vue 中 computed、methods 和 watch 的区别

#### 一、computed 和 methods

`computed`是计算属性，`methods`是方法，都可以实现对 data 中的数据加工后再输出。
不同的是 `computed` 计算属性是基于它们的依赖进行缓存的。计算属性 `computed` 只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 data 中的数据 message 还没有发生改变，多次访问 reversedMessage（对 message 进行加工的处理函数） 计算属性会立即返回之前的计算结果，而不必再次执行函数。而对于 method ，只要发生重新渲染，method 调用总会执行该函数。
当有一个性能开销比较大的的计算属性 A ，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于 A ，这时候，我们就需要缓存。也就是使用 `computed` 而不是 `methods`。但对于每次都需要进行重新计算的属性比如下面这个函数的返回值 `function () { return Date.now() }` ，我们最好使用 `methods`。
总之：数据量大，需要缓存的时候用 `computed` ；每次确实需要重新加载，不需要缓存时用 `methods` 。

#### 二、computed 和 watch

计算属性顾名思义就是通过其他变量计算得来的另一个属性， fullName 在它所依赖 firstName ， lastName 这两个变量变化时重新计算自己的值。
另外，计算属性具有缓存。计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 lastName 和 firstName 都没有发生改变，多次访问 fullName 计算属性会立即返回之前的计算结果，而不必再次执行函数。
而侦听器 `watch` 是侦听一个特定的值，当该值变化时执行特定的函数。例如分页组件中，我们可以监听当前页码，当页码变化时执行对应的获取数据的函数。

```html
<div id="myDiv">
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
  <input type="text" v-model="fullName" />
</div>
```

```js
// watch
new Vue({
  el: '#myDiv',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar',
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    },
  },
})
```

```js
// computed
new Vue({
  el: '#myDiv',
  data: {
    firstName: 'Den',
    lastName: 'wang',
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    },
  },
})
```

也就是说，`computed` 对于其中变量的依赖是多个的，它的函数中使用了多个 `this.xxx` ,只要其中一个发生了变化，都会触发这个函数。而 `watch` 的依赖则是单个的，它每次只可以对一个变量进行监控。
