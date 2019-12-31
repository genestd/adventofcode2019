const program = require('./input')
const Computer = require('../day7/Computer')
const Scanner = require('./Scanner')

const main = async () => {
    const scanner = new Scanner()
    //const computer = new Computer(program, scanner, scanner.receiveData)
    //await computer.compute()
    await scanner.scan()
    console.log(scanner.computeBeam())
}

main()