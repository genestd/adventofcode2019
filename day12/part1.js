const input = require('./input')

const applyGravity = pair => {
    calculateVelocity(pair)            
}
const calculateVelocity = ([moon1, moon2]) => {
    //console.log(input[moon1], input[moon2])
    if (input[moon1].pos.x > input[moon2].pos.x) {
        input[moon1].vel.x = input[moon1].vel.x - 1
        input[moon2].vel.x = input[moon2].vel.x + 1
    } else if (input[moon1].pos.x < input[moon2].pos.x) {
        input[moon2].vel.x = input[moon2].vel.x - 1
        input[moon1].vel.x = input[moon1].vel.x + 1
    }
        
    if (input[moon1].pos.y > input[moon2].pos.y) {
        input[moon1].vel.y = input[moon1].vel.y - 1
        input[moon2].vel.y = input[moon2].vel.y + 1
    } else if (input[moon1].pos.y < input[moon2].pos.y) {
        input[moon2].vel.y = input[moon2].vel.y - 1
        input[moon1].vel.y = input[moon1].vel.y + 1
    }
    
    if (input[moon1].pos.z > input[moon2].pos.z) {
        input[moon1].vel.z = input[moon1].vel.z - 1
        input[moon2].vel.z = input[moon2].vel.z + 1
    } else if (input[moon1].pos.z < input[moon2].pos.z) {
        input[moon2].vel.z = input[moon2].vel.z - 1
        input[moon1].vel.z = input[moon1].vel.z + 1
    }
    //console.log(input)
}

const updateVelocity = moon => {
    //console.log(moon)
    input[moon].pos.x = input[moon].pos.x + input[moon].vel.x
    input[moon].pos.y = input[moon].pos.y + input[moon].vel.y
    input[moon].pos.z = input[moon].pos.z + input[moon].vel.z
}

const potentialEnergy = moon => {
    return Math.abs(input[moon].pos.x) + Math.abs(input[moon].pos.y) + Math.abs(input[moon].pos.z)
}

const kineticEnergy = moon => {
    return Math.abs(input[moon].vel.x) + Math.abs(input[moon].vel.y) + Math.abs(input[moon].vel.z)
}

const calculateEnergy = () => {
    const moons = Object.keys(input)
    moons.forEach(moon => {
        input[moon].potentialEnergy = potentialEnergy([moon])
        input[moon].kineticEnergy = kineticEnergy([moon])
    })    
}

const getMoonPairs = () => {
    const moons = Object.keys(input)
    const pairs = []
    for (let x = 0; x < moons.length; x++ ) {
        for (let y = 0; y < moons.length; y++) {
            if (y < x)
                pairs.push([moons[x], moons[y]])
        }
    }
    return pairs
}

const checkPositions = (originalPositions, moon, axis) => {
    return originalPositions[moon].pos[axis] === input[moon].pos[axis] &&
        originalPositions[moon].vel[axis] === input[moon].vel[axis]
}

const main = () => {
    const moons = Object.keys(input)
    const originalPositions = JSON.parse(JSON.stringify(input))
    const moonPairs = getMoonPairs()
    
    let counter = 1;
    let backToStart = false
    while (true) {
        moonPairs.forEach(pair => {
            applyGravity(pair)
        }) 

        moons.forEach(moon => {
            updateVelocity(moon)
            calculateEnergy(moon)
        })
        counter++

        backToStart = checkPositions(originalPositions, 'io', 'x')
        if (backToStart) {
            console.log(counter)
            counter = 0
        }
    }
    //console.log(input)
    let systemEnergy = 0
    moons.forEach(moon => {
        systemEnergy = systemEnergy + (input[moon].potentialEnergy * input[moon].kineticEnergy)
    })

    console.log(counter, systemEnergy)
}


main()