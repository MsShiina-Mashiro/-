function Fish(name, color) {
  this.name = name;
  this.color = color;
}
Fish.prototype.livesIn = "water";
Fish.prototype.price = 20;
var fish = new Fish("mackarel", "gray");

console.log(fish.name + "," + fish.color + "," + fish.livesIn + "," + fish.price);

console.log(typeof fish)
console.log(fish)

console.log(typeof fish.__proto__)
console.log(fish.__proto__)

console.log(typeof fish.__proto__.__proto__)
console.log(fish.__proto__.__proto__)

console.log(typeof fish.__proto__.__proto__.__proto__)
console.log(fish.__proto__.__proto__.__proto__)

console.log(Fish.prototype === fish.__proto__)
console.log(Fish.prototype.constructor === Fish)
console.log(Fish === fish.__proto__.constructor)