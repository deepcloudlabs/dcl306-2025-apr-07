function fun(n){ // synchronous function
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

let result = fun(17);
console.log(result);
