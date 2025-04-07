let numbers = [42, 23, 8, 4, 16, 15];
console.log(numbers)
numbers.sort((x, y) => x - y) // HoF
console.log(numbers)
numbers.sort((x, y) => y - x) // HoF
console.log(numbers)