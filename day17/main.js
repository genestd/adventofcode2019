const program = require('./input')
const Camera = require('./Camera')
const Computer = require('../day7/Computer')

const main = async () => {
    const camera = new Camera()
    const computer = new Computer(program, null, camera.receiveData)
    await computer.compute()
    console.log(camera.arrayMap[0])
    camera.displayMap()
    console.log(camera.findIntersections())
}

main()