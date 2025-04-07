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
sun(17).then( result => {console.log(`result is ready: ${result}`);})
    .catch( err => console.log(err))
    .finally(()=>console.log("done."));
console.log("Application is done...");
