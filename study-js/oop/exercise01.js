const Employee = function (firstName,lastName,salary,iban) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    this.iban = iban;
    this.sayHello = function () {
        console.log(`Hello ${this.lastName}, ${this.firstName}!`);
    }
}
let jack = new Employee("Jack","Bauer",100_000,"tr1");
let kate = new Employee("Kate","Austen",200_000,"tr2");
console.log(jack)
console.log(kate)
jack.sayHello(); // sayHello(jack)
kate.sayHello();