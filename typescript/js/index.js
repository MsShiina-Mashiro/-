"use strict";
var str = 'hello typescipt';
console.log(str);
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Unknown"] = 2] = "Unknown";
})(Gender || (Gender = {}));
var usrSex = Gender.Male;
var usrSex2 = Gender.Female;
console.log(usrSex);
console.log(usrSex2);
var tuple = [1, 's', true];
var array1 = [1, 2, 3];
var array2 = ['a', 'b', 'c'];
