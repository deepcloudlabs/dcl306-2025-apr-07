function fun(n){
    let result = [n];
    while (n > 1){
        if (n % 2 === 0){
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        result.push(n);
    }
    return result;
}
for (let value of fun(17)) {
    console.log(`for: ${value}`);
}
