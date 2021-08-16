let canvas = document.getElementById("myCanvas");
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let context = canvas.getContext("2d");
context.translate(450, 400);

const colors = ['red','blue','yellow','green','pink','orange']

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor(){

    const randomIndex = getRandomInt(0, colors.length)
    color = colors[randomIndex]
    return color;
}

function trisection(p1,p2, r){
    return {
        x: (p1.x+r*p2.x)/(1+r),
        y: (p1.y+r*p2.y)/(1+r)
    }
}

function rotate(p, center, angle){
    const translation = {
        x: p.x - center.x,
        y: p.y - center.y
    }
    const theta = Math.atan2(translation.y, translation.x)
    const r = Math.sqrt((translation.x * translation.x + translation.y * translation.y ))
    return {
        x: r * Math.cos(theta + angle) + center.x,
        y: r * Math.sin(theta + angle) + center.y
    }
}


function drawLine(p0, p1, color="black") {
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
}

function recursiveKock(p0,p4, level){
    if(level<=0){
        drawLine(p0,p4, randomColor())
    } 
    else{
        const p1 = trisection(p0,p4,1/2)
        const p3 = trisection(p0,p4,2)
        const p2 = rotate(p3,p1,Math.PI/3)
        let points = [p0, p1, p2, p3, p4] 
        for(let i=0; i<4;i++){
            recursiveKock(points[i],points[i+1], level-1)
        }
    }
}

function main(){
    
    let canvas = document.getElementById("myCanvas");
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    let context = canvas.getContext("2d");
    context.translate(450, 400);

    const levelInput = document.getElementById('level-input')
    const level = parseInt(levelInput.value)

    const p1 = { x:0, y:0 }
    const p2 = { x:450, y:0 }
    const p3 = rotate(p2, p1, -Math. PI/3)

    recursiveKock( p1, p2, level)
    recursiveKock( p2, p3, level)
    recursiveKock( p3, p1, level)
}



