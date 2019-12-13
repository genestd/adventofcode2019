const program = require('./input')
const PaintRobot = require('./PaintRobot')
const Computer = require('../day7/Computer')

const getPanelCount = panels => {
    const yList = Object.keys(panels) //.map(key => Number(key)).sort((a,b) => a-b)
    let row = []
    let counter = 0
    yList.forEach(y => {
        const xList = Object.keys(panels[y]) //.map(key => Number(key)).sort((a,b) => a-b)
        xList.forEach(x => {
            counter++
            row.push(panels[y][x].color > 0 ? 'X' : ' ')
        })
        //console.log(row.join(''))
    })
    console.log(counter)
}

const processPanels = panels => {
    const yList = Object.keys(panels).map(key => Number(key)).sort((a,b) => b-a)
   yList.forEach(y => {
        let row = []
         const xList = Object.keys(panels[y]).map(key => Number(key)).sort((a,b) => a-b)
        xList.forEach(x => {
            row.push(panels[y][x].color > 0 ? 'X' : ' ')
        })
        console.log(row.join(''))
    })
}

const main = async () => {
    const robot = new PaintRobot()
    const computer = new Computer(program, robot, robot.receiveInstruction)
    const result = await computer.compute()
    const paintedPanels = robot.getPaintedPanels()
    const output = getPanelCount(paintedPanels)
    const reg = processPanels(paintedPanels)
}
main()