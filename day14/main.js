const utils = require('./utils')
const input = require('./input')

const main = () => {
    const reactions = utils.parseInput(input)
    let ore = 0
    let fuel = 0
    let leftovers = {}
    while (ore < 1000000000000) {
        ore = ore + utils.decompose(reactions, 'FUEL', 1, leftovers)
        fuel++
    }

    console.log(ore, fuel)
}

main()