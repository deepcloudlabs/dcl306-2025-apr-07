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
async function run(){
 let result = await sun(17);
 return result;
}
run().then(result => console.log(result));
console.log("Application is done...");
