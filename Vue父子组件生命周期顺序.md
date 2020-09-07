父组件 beforeCreate
父组件 created
父组件 beforeMount
子组件 beforeCreate
子组件 created
子组件 beforeMount
子组件 mounted
父组件 mounted

加载渲染过程

　　父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

子组件更新过程
　　父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程
　　父beforeUpdate->父updated

销毁过程
　　父beforeDestroy->子beforeDestroy->子destroyed->父destroyed