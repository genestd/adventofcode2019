const input = require('./input')

const parseInput = input => {
    const orbits = {}
    input.forEach(record => {
        const [body1, body2] = record.split(')')
        orbits[body2] = body1
    })
    return orbits
}

const getPathToCOM = (data, body, path) => {
    const parent = data[body]
    if (parent !== 'COM') {
        path = path.concat([parent])
        path = getPathToCOM(data, parent, path)
    }
    return path
}

const checkCommonOrbit = (body, santaPath) => santaPath.indexOf(body) > -1

const main = () => {
    const data = parseInput(input)
    const santaPath = getPathToCOM(data, 'SAN', [])
    let jumps = 0
    let parent = data.YOU
    while (!checkCommonOrbit(parent, santaPath)) {
        jumps = jumps + 1
        parent = data[parent]
    }
    jumps = jumps + santaPath.indexOf(parent)
    console.log(jumps)
    
}

main()