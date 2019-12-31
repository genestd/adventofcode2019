const Computer = require('../day7/Computer')
const program = require('./input')

function Scanner() {
    this.computer = {}
    this.map = []
    this.nextX = 0
    this.nextY = 0
    this.nextValueType = 'x'

    this.getInput = () => {
        let input
        if (this.nextValueType = 'x') {
            input = this.nextX
        }
        else {
            input = this.nextY
        }
        this.nextValueType = this.nextValueType === 'x' ? 'y' : 'x'

        return Promise.resolve(input)
    }

    this.receiveData = data => {
        if (!this.map[this.nextY])
            this.map[this.nextY] = [data]
        else
            this.map[this.nextY].push(data)
    }

    this.displayMap = () => {
        console.log('Map: ', this.map)
    }
    this.close = () => {}

    this.scan = async () => {
        let counter = 0
        for (let y = 0; y < 50; y++) {
            for (let x = 0; x < 50; x++) {
                this.nextX = x
                this.nextY = y
                this.computer = new Computer(program, [x,y], this.receiveData)
                await this.computer.compute()
            }
        }
    }

    this.computeBeam = () => {
        return this.map.reduce((total, next) => total + next.reduce((tot, nx) => tot + nx, 0), 0)
    }
}

module.exports = Scanner