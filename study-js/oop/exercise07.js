class Circle {
    constructor(x=0, y=0, radius=1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    area = () => {
        return Math.PI * this.radius ** 2;
    }
}

const circle1 = new Circle(1,1,100);

for (let attr in circle1) { //reflection
    if (typeof circle1[attr] === 'function') continue;
    console.log(`The value of the attribute ${attr} is ${circle1[attr]}`);
}

circle1.color = "red";
const circle2 = new Circle(1,1,100);
console.log(circle1);
console.log(circle2);
Circle.prototype.thickness = 3;
console.log(circle1.thickness);
console.log(circle2.thickness);
circle1.thickness = 2;
console.log(circle1.hasOwnProperty("thickness")); // true
console.log(circle2.hasOwnProperty("thickness")); // false
delete Circle.prototype.thickness;
console.log(circle1.thickness); // 2
console.log(circle2.thickness);
