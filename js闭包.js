function f(params){
  var n = function(){
    return params
  }
  params++
  return n
}

var test = f(456)
console.log(test())