/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let args, timer, context
  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数如果执行完毕，清空定时器
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)

  return function (...params) {
    // 如果没有 timer，创造一个
    if (!timer) {
      timer = later()
      // 如果是立即执行的，调用函数
      // 不是的话，缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
