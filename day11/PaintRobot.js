const BLACK = 0
const WHITE = 1
const PAINT_INSTRUCTION = 'PAINT_INSTRUCTION'
const MOVE_INSTRUCTION = 'MOVE_INSTRUCTION'

function PaintRobot(x=0, y=0) {
    this.coordinates = {
        x: x,
        y: y,
        direction: 0
    }
    this.paintedPanels = {
        0: {
            0: {
                color: WHITE,
                painted: 0
            }
        }
    }
    this.cameraObservers = []
    this.nextInstructionType = PAINT_INSTRUCTION

    this.on = (eventType, callback) => {
        if (eventType === 'checkCamera') {
            this.cameraObservers.push(callback)
        }
    }

    this.getInput = () => {
        return new Promise((resolve, reject) => {
            const currentColor = this.paintedPanels[this.coordinates.y][this.coordinates.x].color
            resolve(currentColor)
        })
    }
    
    this.close = () => console.log('Thank you for using Paint Robot')

    this.receiveInstruction = instruction => {
        console.log(this.coordinates.x, this.coordinates.y, this.nextInstructionType, instruction)
        if (this.nextInstructionType === PAINT_INSTRUCTION) {
            this.paint(instruction)
            this.nextInstructionType = MOVE_INSTRUCTION
        } else {
            this.turn(instruction === 0 ? -90 : 90)
            this.nextInstructionType = PAINT_INSTRUCTION
        }

    }

    this.getLocation = () => this.coordinates
    
    this.turn = (degrees = 90) => {
        this.coordinates.direction = this.coordinates.direction + degrees
        if (this.coordinates.direction >= 360)
            this.coordinates.direction = this.coordinates.direction % 360
        if (this.coordinates.direction < 0) 
            this.coordinates.direction = this.coordinates.direction + 360
        this.move()
    }
    
    this.move = (distance = 1) => {
        switch (this.coordinates.direction) {
            case 0:
                this.coordinates.y = this.coordinates.y + 1                    
                break
            case 90:
                this.coordinates.x = this.coordinates.x + 1
                break;
            case 180:
                this.coordinates.y = this.coordinates.y - 1
                break
            case 270:
                this.coordinates.x = this.coordinates.x - 1
                break
            default:
                console.log("MOVE ERROR - invalid direction", this.coordinates.direction)
        }
        this.initializePanel()
    }

    this.initializePanel = () => {
        if (!this.paintedPanels[this.coordinates.y]) {
            this.paintedPanels[this.coordinates.y] = {
                [this.coordinates.x]: {
                    color: BLACK,
                    painted: 0
                }
            }
        } else {
            if (!this.paintedPanels[this.coordinates.y][this.coordinates.x]) {
                this.paintedPanels[this.coordinates.y][this.coordinates.x] = {
                    color: BLACK,
                    painted: 0
                }
            }
        }
    }

    // Returns 0 for black, 1 for white
    this.checkPanelColor = () => {
        return this.paintedPanels[this.coordinates.x][this.coordinates.y].color 
    }

    this.paint = color => {
        this.paintedPanels[this.coordinates.y][this.coordinates.x].color = color
        this.paintedPanels[this.coordinates.y][this.coordinates.x].painted = this.paintedPanels[this.coordinates.y][this.coordinates.x].painted + 1
    }

    this.getPaintedPanels = () => this.paintedPanels

}

module.exports = PaintRobot