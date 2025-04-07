class Employee {
    #salary;
    constructor(firstName, lastName, salary, iban) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#salary = salary;
        this.iban = iban;
        // this.sayHello = this.sayHello.bind(this);
    }
    sayHello = () => {
        console.log(`Hello ${this.lastName}, ${this.firstName}!`);
    }

    get salary() {
        return this.#salary;
    }

    set salary(value) {
        if (value < 25_000)
            throw new Error(`Salary ${value} is less than 25_000`);
        this.#salary = value;
    }

}

const kate = new Employee("Kate", "Austen", 200_000, "tr2");
console.log(kate)
kate.sayHello();
setInterval(kate.sayHello, 3000);
console.log(kate.salary)
kate.salary -= 180_000 // salary: property
console.log(kate.salary)
