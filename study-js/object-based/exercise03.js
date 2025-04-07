let circle1 = {
    x: 100,
    y: 200,
    radius: 50,
    drawing: {
        color: 'red',
        thickness: 5
    }
}

console.log(circle1.x)
console.log(circle1['x'])
let attr = "x";
console.log(circle1.attr)
console.log(circle1[attr])
/*
let x = circle1.x;
let y = circle1.y;
let radius = circle1.radius;
*/
let {x,y,...rest} = circle1;
console.log(x)
console.log(y)
console.log(rest)