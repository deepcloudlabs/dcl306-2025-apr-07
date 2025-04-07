let circle1 = {
    x: 100,
    y: 200,
    radius: 50,
    drawing: {
        color: 'red',
        thickness: 5
    }
}

let circle2 = {...circle1}; // shallow cloning
circle2.drawing = {...circle1.drawing};
circle2.radius = 100;
circle2.drawing.color = "blue";
console.log(circle1)
console.log(circle2)