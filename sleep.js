function sleep(time){
  return new Promise((resolve,reject) => {
    setTimeout((resolve),time)
  })
}
sleep(3000).then(()=>console.log('hello'));

