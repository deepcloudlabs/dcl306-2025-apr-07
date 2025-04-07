class Employee {
    constructor(firstName, lastName, salary, iban) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.iban = iban;
        this.sayHello = this.sayHello.bind(this);
    }
    sayHello(/*this*/) {
        console.log(this)
        console.log(`Hello ${this.lastName}, ${this.firstName}!`);
    }
}

let kate = new Employee("Kate", "Austen", 200_000, "tr2");
console.log(kate)
kate.sayHello();
setInterval(kate.sayHello, 3000);