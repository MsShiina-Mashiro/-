// es6继承
class Animal {
  //构造函数，里面写上对象的属性
  constructor(props) {
    this.name = props.name || 'Unknown'
  }
  //方法写在后面
  eat() {
    //父类共有的方法
    console.log(this.name + ' will eat pests.')
  }
}

//class继承
class Bird extends Animal {
  //构造函数
  constructor(props, myAttribute) {
    //props是继承过来的属性，myAttribute是自己的属性
    //调用实现父类的构造函数
    super(props) //相当于获得父类的this指向
    this.type = props.type || 'Unknown' //父类的属性，也可写在父类中
    this.attr = myAttribute //自己的私有属性
  }

  fly() {
    //自己私有的方法
    console.log(this.name + ' are friendly to people.')
  }
  myattr() {
    //自己私有的方法
    console.log(this.type + '---' + this.attr)
  }
}

//通过new实例化
var myBird = new Bird(
  {
    name: '小燕子',
    type: 'Egg animal', //卵生动物
  },
  'Bird class'
)
myBird.eat()
myBird.fly()
myBird.myattr()
