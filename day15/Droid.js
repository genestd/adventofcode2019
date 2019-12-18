const Graph = require('./Graph')

const WALL = 0
const FLOOR = 1
const OXYGEN_SYSTEM = 2

const NORTH = 1
const SOUTH = 2
const EAST = 4
const WEST = 3

function Droid() {
    // this.inputValue = null
    // this.device = readline.createInterface({
    //         input: process.stdin,
    //         output: process.stdout
    //     })
    // this.device.on('line', line => {
    //     if (this.inputValue) {
    //         console.log('not ready for new input')
    //     } else {
    //         this.inputValue = line
    //     }
    // })
    this.close = () => {}
    this.getInput = () => {
        return new Promise((resolve, reject) => {
            this.interval = setInterval(() => {
                if (this.inputValue) {
                    //if (this.inputValue === 'm')
                        //console.log(this.showMap())
                    //else {
                        if ([1,2,3,4,99].indexOf(Number(this.inputValue)) > -1) {
                            this.lastMove = Number(this.inputValue)
                            clearInterval(this.interval)
                            //console.log(`input is ${result}`)
                            resolve(Number(this.inputValue))   
                        }
                    //}
                    this.inputValue = null 
                }
            }, 10)
        })
    }

    // this.close = () => {
    //     this.device.close()
    // }
    this.inputValue = 1
    this.map = {
        0: {
            0: 1
        }
    }
    this.x = 0
    this.y = 0
    this.nextX = 0
    this.nextY = 0
    this.lastMove = 1
    this.moveCount = 0
    this.graph = new Graph()

    this.receiveResponse = type => {
        this.getObjectPosition()
        this.placeObject(Number(type))
        if (type !== WALL)
            this.move(Number(type))
        else 
            this.resetNextPosition()
        this.determineNextMove(type)
    }
    this.getObjectPosition = () => {
        switch (this.lastMove) {
            case NORTH:
                this.nextY = this.y + 1
                break
            case SOUTH:
                this.nextY = this.y - 1
                break
            case EAST:
                this.nextX = this.x + 1
                break
            case WEST:
                this.nextX = this.x - 1
                break
            default:
                console.log('ERROR: Unable to update position', this.lastMove)
        }
    }

    this.resetNextPosition = () => {
        switch (this.lastMove) {
            case NORTH:
                this.nextY = this.nextY - 1
                break
            case SOUTH:
                this.nextY = this.nextY + 1
                break
            case EAST:
                this.nextX = this.nextX - 1
                break
            case WEST:
                this.nextX = this.nextX + 1
                break
            default:
                console.log('ERROR: Unable to update position', this.lastMove)
        }
    }
    this.placeObject = object => {
        if (object === 2)
            this.oxygenSystem = `x${this.nextX}y${this.nextY}`
        if (this.map[this.nextY])
            this.map[this.nextY][this.nextX] = object
        else 
            this.map[this.nextY] = {
                [this.nextX]: object
            }

        if (object > 0)
            this.graph.addEdge(`x${this.x}y${this.y}`, `x${this.nextX}y${this.nextY}`)
        //console.log(`Placed ${this.getObjectType(object)} at ${this.nextX}, ${this.nextY}`)
    }
    this.move = type => {
        switch (this.lastMove) {
            case NORTH:
                this.y = this.y + 1
                break
            case SOUTH:
                this.y = this.y - 1
                break
            case EAST:
                this.x = this.x + 1
                break
            case WEST:
                this.x = this.x - 1
                break
            default:
                console.log('ERROR: Unable to move')
        }
        //console.log(`Moved to ${this.x}, ${this.y}`)
    }
    this.getObjectType = object => {
        switch (object) {
            case 0:
                return 'WALL'
            case 1:
                return 'FLOOR'
            case 2:
                return 'OXYGEN'
            default:
                return 'UNKNOWN_OBJECT'
        }
    }

    this.objectToArray = () => {
        let yValues = Object.keys(this.map).map(key => Number(key)).sort((a, b) => a-b)
        let minY = yValues[0]
        let maxY = yValues[yValues.length - 1]
        let minX = 0
        let maxX = 0
        for (let row = 0; row < yValues.length; row++) {
            const xValues = Object.keys(this.map[yValues[row]]).map(key => Number(key))
            for (let tile = 0; tile < xValues.length; tile++) {
                if (xValues[tile] < minX)
                minX = xValues[tile]
                if (xValues[tile] > maxX)
                maxX = xValues[tile]
            }
        }
        //console.log(minX, maxX, minY, maxY)
        let rowData = []
        for (let y = maxY; y >= minY; y--) {
            for (let x = minX; x <= maxX; x++) {
                if (!Array.isArray(rowData[y]))
                    rowData[y] = []
                rowData[y].push(this.map[y][x] === 1 || this.map[y][x] === 2 ? this.map[y][x] : 0)
            }
            //console.log(rowData.join(''))
        }
        return rowData
    }

    this.determineNextMove = type => {
        if (this.moveCount > 4 && this.x === 0 && this.y === 0) {
            this.inputValue = 99
            return
        }
        let nextMove = 0
        if (type === WALL) {
            nextMove = this.turnRight()
        } else {
            nextMove = this.turnLeft()
        }
        // console.log(nextMove)
        this.inputValue = nextMove
        this.moveCount++
        // if (this.moveCount > 100)
        //     this.showMap()
    }

    this.turnRight = () => {
        if (this.lastMove === 1)
            return 4
        if (this.lastMove === 4)
            return 2
        if (this.lastMove === 2)
            return 3
        return 1
    }

    this.turnLeft = () => {
        if (this.lastMove === 1)
            return 3
        if (this.lastMove === 3)
            return 2
        if (this.lastMove === 2)
            return 4
        return 1
    }

    this.findShortestPath = () => {
        //const arr = this.objectToArray()
        //this.graph.shortestPath(`x0y0`, this.oxygenSystem)
        this.graph.djikstra(this.oxygenSystem)
    }
}

module.exports = Droid