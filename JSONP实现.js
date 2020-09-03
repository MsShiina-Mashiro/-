const myJSONP = (url, params, callback) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = (data) => {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback }
    let arrs = []
    for (const key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    script.type = 'text/javascript'
    document.appendChild('script')
    script.onerror = () => {
      reject(new Error(`fetch ${url} failed`))
      document.body.removeChild(script)
    }
  })
}
