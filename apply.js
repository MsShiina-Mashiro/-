Function.prototype.myApply = function (context) {
  let context = context || window
  context.fn = this
  let res
  if(arguments[1]){
    let args = arguments[1]
    res = context.fn(...args)
  }else{
    res = context.fn()
  }
  delete context.fn
  return res
}
