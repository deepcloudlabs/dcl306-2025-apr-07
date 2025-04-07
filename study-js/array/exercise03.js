let numbers = [42, 23, 8, 4, 16, 15];
console.log(numbers)
numbers.sort(function (x,y){
    return x - y
}) // HoF
console.log(numbers)
numbers.sort(function (x,y){
    return y - x
}) // HoF
console.log(numbers)