let employees = [
    {full_name: "jack bauer", salary: 100_000, department: "IT", full_time: true},
    {full_name: "kate austen", salary: 200_000, department: "SALES", full_time: false},
    {full_name: "jack shephard", salary: 300_000, department: "FINANCE", full_time: true},
    {full_name: "ben linus", salary: 150_000, department: "IT", full_time: false},
    {full_name: "james sawyer", salary: 250_000, department: "IT", full_time: true},
    {full_name: "hurley", salary: 175_000, department: "HR", full_time: false},
    {full_name: "donald trump", salary: 220_000, department: "SALES", full_time: true},
]
// imperative programming
let totalFullTimeSalary = 0;
for (let employee of employees){
    if (employee.full_time){
        let salary = employee.salary;
        totalFullTimeSalary += salary;
    }
}
console.log(totalFullTimeSalary);
totalFullTimeSalary = // functional programming, immutability, lazy evaluation
employees.filter(employee => employee.full_time) // HoF
         .map( employee => employee.salary)      // HoF
         .reduce((totalSalary,salary) => totalSalary + salary, 0); // HoF
console.log(totalFullTimeSalary);
