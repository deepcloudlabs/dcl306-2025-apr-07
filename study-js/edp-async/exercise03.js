function gun(n){ // asynchronous function
    return new Promise((resolve, reject) => {
        if (n < 1){
            setTimeout( () => reject(`${n} cannot be less than 1!`), 1_000);
        }
        let result = [n];
        while (n > 1){
            if (n % 2 === 0){
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            result.push(n);
        }
        setTimeout(() =>resolve(result), 5_000)
    });

}

console.log("Application is just started...");
gun(-17).then( result => {console.log(`result is ready: ${result}`);})
         .catch( err => console.log(err))
         .finally(()=>console.log("done."));
console.log("Application is done...");

