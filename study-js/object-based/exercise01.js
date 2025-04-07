circle1 = {
    x: 100,
    y: 200,
    radius: 50,
    drawing: {
        color: 'red',
        thickness: 5
    },
    area: function(){
        return Math.PI * this.radius ** 2;
    }
}
console.log(circle1)
console.log(circle1.drawing)
console.log(circle1.area)
console.log(circle1.area())