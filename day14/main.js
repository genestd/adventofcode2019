const utils = require('./utils')
const input = require('./input')

const main = () => {
    const reactions = utils.parseInput(input)

    const ore = utils.decompose(reactions, 'FUEL', 1, {}, 0)

    console.log(ore)
}

main()