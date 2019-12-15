const program = require('./input')
const Arcade = require('./Arcade')
const Computer = require('../day7/Computer')


const main = async () => {
    const arcade = new Arcade()
    const computer = new Computer(program, arcade, arcade.receiveInstruction)
    await computer.compute()
    console.log(`Final score: ${arcade.getScore()}`)
}

main()