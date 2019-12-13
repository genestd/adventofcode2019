const input = require('./input')
const Asteroid = require('./Asteroid')

const saveAsteroidPositions = input => {
    const arr = input.split('\n').map(row => row.trim())
    let counter = 0;
    let asteroidMap = {}
    for (let y = 0; y < arr.length; y++) {
        for ( let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] === '#') {
                counter = counter + 1
                const id = `asteroid${counter}`
                asteroidMap[id] = new Asteroid(id, x,y)
            }
        }
    }
    return asteroidMap
    
}
const main = () => {
    const spaceMap = saveAsteroidPositions(input)
    //console.log(spaceMap)
    const asteroids = Object.keys(spaceMap)
    asteroids.forEach(asteroid => {
        asteroids.forEach(target => {
            if (target !== asteroid) {
                const vector = spaceMap[asteroid].getVector(spaceMap[target])
                spaceMap[asteroid].addVector(vector, spaceMap[target].getId())
            }
        })
    })
    let maxAsteroidCount = 0
    let bestBase = null
    asteroids.forEach(asteroid => {
        const asteroidsInView = spaceMap[asteroid].getVectorCount()
        //console.log(asteroid, asteroidsInView)
        if (asteroidsInView > maxAsteroidCount) {
            maxAsteroidCount = asteroidsInView
            bestBase = asteroid
            //console.log(asteroid)
        }
    })
    console.log(maxAsteroidCount, bestBase)

    let rotations = 0
    let targetsDestroyed = 0
    while (targetsDestroyed < asteroids.length-1) {
        const allVectors = spaceMap[bestBase].getAllVectors()
        const targetList = Object.keys(allVectors).map(vector => Number(vector)).sort((a,b) => a-b)
        targetList.forEach(vector => {
            const vectorId = vector.toString()
            const destroyedAsteroid = spaceMap[bestBase].destroyTarget(vectorId)
            targetsDestroyed++
            if (targetsDestroyed === 200)
                console.log(`pew pew: ${destroyedAsteroid}`)
        })
        }
}   

main()