const ajax = function(url, params, method = 'POST') {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url:url,
      data: params,
      dataType: 'json',
      success(res){
        resolve(res)
      },
      error(res){
        reject('error')
      }
    })
  })
}

