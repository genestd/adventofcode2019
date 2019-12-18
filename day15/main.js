const program = require('./input')
const Computer = require('../day7/Computer')
const Droid = require('./Droid')

const main = async () => {
    console.log('Droid Check')
    const droid = new Droid
    const computer = new Computer(program, droid, droid.receiveResponse)
    await computer.compute()
    const path = droid.findShortestPath()
    console.log('Shortest path is: ', path)
}

main()