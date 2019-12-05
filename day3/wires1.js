const input = require('./input')
let wire1 = {}
let wire2 = {}
const recordPoint = (id, point, steps) => {
    if (id ===1) {
        if (wire1[`x${point.x}`]) {
            if (!wire1[`x${point.x}`][`y${point.y}`])
                wire1[`x${point.x}`][`y${point.y}`] = steps
        } else {
            wire1[`x${point.x}`] = { [`y${point.y}`]: steps }
        }
    } else {
        if (wire2[`x${point.x}`]) {
            if(!wire2[`x${point.x}`][`y${point.y}`])
                wire2[`x${point.x}`][`y${point.y}`] = steps
        } else {
            wire2[`x${point.x}`] = { [`y${point.y}`]: steps }
        }
    }
}

const getNextPoint = (start, steps, x, y, id) => { 
    for (let moveX=1; moveX <= Math.abs(x); moveX++) {
        const dir = x < 0 ? -1 : 1
        steps = steps + 1
        recordPoint(id, { x: start[0] + (moveX * dir), y: start[1]}, steps)
    }
    for (let moveY=1; moveY <= Math.abs(y); moveY++) {
        const dir = y < 0 ? -1 : 1
        steps = steps + 1
        recordPoint(id, { x: start[0], y: start[1] + (moveY * dir)}, steps)
    }
    //console.log(id, [start[0]+x, start[1]+y], steps)
    return { point: [start[0]+x, start[1]+y], steps }
}

const doInstruction = (id, instruction, inputs) => {
    const [direction, ...remaining] =  instruction
    const distance = parseInt(remaining.join(''), 10)
    
    switch (direction) {
        case 'R': 
            return getNextPoint(inputs.point, inputs.steps, distance, 0, id)
        case 'L': 
            return getNextPoint(inputs.point, inputs.steps, distance * -1, 0, id)
        case 'U': 
            return getNextPoint(inputs.point, inputs.steps, 0, distance, id)
        case 'D': 
            return getNextPoint(inputs.point, inputs.steps, 0, distance * -1, id)
        default: 
            console.log("ERROR")
    }
}

const saveData = () => {
    input.forEach((wire, index) => {
        let result = {
            point: [0,0],
            steps: 0
        }
        console.log(`wire${index+1}`)
        wire.forEach(instruction => {
            result = doInstruction(index+1, instruction, result)
        })
    })
}

const main = () => {
    saveData()
    //console.log(wire1, wire2)
    let closestMatch = -1
    Object.keys(wire1).forEach(xValue => {
        if (wire2[xValue]) {
            Object.keys(wire1[xValue]).forEach(yValue => {
                if (wire2[xValue][yValue]) {
                    const wire1Steps = wire1[xValue][yValue]
                    const wire2Steps = wire2[xValue][yValue]
                    if (closestMatch < 0){
                        closestMatch = wire1Steps + wire2Steps
                    } else {
                        closestMatch = Math.min(closestMatch, (wire1Steps + wire2Steps))
                    }
                }
            })
        }
    })
    console.log(`Manhattan distance: ${closestMatch}`)
}
main()