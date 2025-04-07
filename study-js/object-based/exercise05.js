let circle1 = {
    x: 100,
    y: 200,
    radius: 50,
    drawing: {
        color: 'red',
        thickness: 5
    },
    area: function(){return Math.PI * this.radius ** 2;},
}

let circle2 = JSON.parse(JSON.stringify(circle1)); // deep cloning
circle2.radius = 100;
circle2.drawing.color = "blue";
console.log(circle1)
console.log(circle2)