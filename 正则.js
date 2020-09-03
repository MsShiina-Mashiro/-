// 匹配后缀名

var theHttp = 'http://www.asdaf/dgfs.dg/asdf/a.jpg'

var reg = /(?<=\.)([^\.]+)$/gi;

console.log(theHttp.match(reg));

