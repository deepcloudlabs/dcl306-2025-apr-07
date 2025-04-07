async function sun(n){ // synchronous function
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

console.log("Application is just started...");
Promise.all(
    [
            sun(17),
            sun(13),
            sun(73)
        ]
    ).then( results => {
        console.log(results)
    })
    .catch( err => console.log(err))
    .finally(()=>console.log("done."));
console.log("Application is done...");
