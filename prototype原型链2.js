function Supermarket() {

}
Supermarket.prototype.product = 'mask'

function Shop() {

}
Shop.prototype = new Supermarket()

var person = new Shop

console.log(person)
console.log(person.__proto__)
console.log(person.__proto__.__proto__)
console.log(person.__proto__.__proto__.__proto__)
console.log(person.__proto__.__proto__.__proto__.__proto__)
console.log(person.__proto__ === Shop.prototype)
console.log(person.__proto__.__proto__ === Shop.prototype.__proto__)
console.log(Shop.prototype.__proto__.constructor === Supermarket)