let numbers = [42, 23, 8, 4, 16, 15];
console.log(numbers[0])
console.log(numbers[1])
console.log(numbers[2])
// external loop #1
for (let i=0; i<numbers.length; i++) {
    const number = numbers[i];
    console.log(`number: ${number}, i: ${i}`)
}
// external loop #2
for (let i in numbers) {
    const number = numbers[i];
    console.log(`number: ${number}, i: ${i}`)
}
// external loop #3
for (let number of numbers) {
    console.log(`number: ${number}`)
}
// internal loop #4
// forEach -> HoF
numbers.forEach(function(number,index) {
    console.log(`number: ${number}, index: ${index}`)
})
// functional programming:
// 1. Higher-Order Function (HoF)
// 2. Pure Function: stateless/no side effect