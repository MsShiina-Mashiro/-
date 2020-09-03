// 我有一个json
var json = {
  body: {
    data: {
      data: [1, 2, 3],
      pagenation: { page: 1, pageSize: 10 },
    },
  },
};

// 我想通过这种方式方便的获取到对象的属性值或类型
var res = getField(json, "body.data.data"); // res === [1,2,3]
var value = getField(json, "body.request.data"); // value === undefined
var resType = getField(json, "body.data.data", true); // resType==='Array'
var isType = getField(json, "body.data.data", "Array"); // isType===true

// 这里是实现方法，采用递归读取对象的属性值
function getField(data, fields, pattern) {
  var arr = fields.split(".");
  var key = arr.shift();
  var value = data[key];

  if (value == null) {
    return value;
  } else if (arr.length == 0) {
    if (!pattern) return value;
    var type = Object.prototype.toString
      .call(value)
      .replace("[object ", "")
      .replace("]", "");
    if (pattern === true) {
      return type;
    } else if (!pattern) {
      return value;
    } else {
      return type == pattern;
    }
  }

  var result = getField(value, arr.join("."), pattern);
  return result;
}
