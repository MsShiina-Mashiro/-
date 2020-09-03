var str: string = 'hello typescipt'

console.log(str)

enum Gender {
  Male,
  Female,
  Unknown
}

var usrSex: Gender = Gender.Male
var usrSex2: number = Gender.Female

console.log(usrSex)
console.log(usrSex2)

let tuple: [number, string, boolean] = [1, 's', true]

let array1: number[] = [1, 2, 3]
let array2: Array<string> = ['a', 'b', 'c']