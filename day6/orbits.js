const input = require('./input')

const parseInput = input => {
    const orbits = {}
    input.forEach(record => {
        const [body1, body2] = record.split(')')
        orbits[body2] = body1
    })
    return orbits
}

const getOrbitCount = (data, body) => {
    let temp = 0
    if (body === 'COM') {
        return temp
    }
    else {
        temp = temp + 1 + getOrbitCount(data, data[body])
    }
    return temp
}

const main = () => {
    const data = parseInput(input)
    let count = 0
    Object.keys(data).forEach(body => {
        console.log(body)
        count = count + getOrbitCount(data, body)
    })
    console.log(count)
}

main()