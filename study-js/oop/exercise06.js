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

class ColorfulCircle extends Circle {
    constructor(x=0, y=0, radius=1,color="red") {
        super(x,y, radius);
        this.color = color;
    }
}

const circle1 = new Circle();
const circle2 = new Circle(1,1,100);
const circle3 = new ColorfulCircle(1,1,100,"blue");
const circle4 = new ColorfulCircle(1,1,100);
const circle5 = new ColorfulCircle();
console.log(circle1)
console.log(circle2)
console.log(circle3)
console.log(circle4)
console.log(circle5)