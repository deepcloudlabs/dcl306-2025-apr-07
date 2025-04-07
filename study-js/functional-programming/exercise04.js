function* fun(n) {
    console.log(`fun: yielding ${n}...`);
    yield n;
    while (n > 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        console.log(`fun: yielding ${n}...`);
        yield n;
    }
}
/*
result = fun(17)
console.log("Hello Mars!");
console.log(result.next().value)
console.log(result.next().value)
*/
for (let value of fun(17)) {
    console.log(value)
}