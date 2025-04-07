let circle1 = {};

circle1.x = 100;
circle1.y = 200;
circle1.radius = 50;
circle1.drawing = {
    color: 'red',
    thickness: 5
};
circle1.area = function () {
    return Math.PI * this.radius ** 2;
};

console.log(circle1)
console.log(circle1.drawing)
delete circle1.drawing
console.log(circle1)