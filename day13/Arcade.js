const XPOS = 'XPOS'
const YPOS = 'YPOS'
const TILE_TYPE = 'TILE_TYPE'

function Arcade(initialInput = null) {
    this.input = initialInput ? [initialInput] : []
    this.score = 0
    this.board = [[]]
    this.blockCount = 270
    this.xValue = 0
    this.yValue = 0
    this.ballPos = null
    this.prevBallPos = null
    this.paddlePos = null
    this.nextInstructionType = XPOS
    
    this.getScore = () => this.score
    this.getBlockCount = () => this.blockCount
    this.destroyBlock = () => this.blockCount = this.blockCount - 1
    this.updateScore = newScore => this.score = newScore

    this.receiveInstruction = (instruction) => {
        this.handleInstruction(instruction)
        this.next()
        
    }

    this.handleInstruction = instruction => {
        switch (this.nextInstructionType) {
            case XPOS: {
                this.xValue = instruction 
                break
            }
            case YPOS: {
                this.yValue = instruction
                break
            }
            case TILE_TYPE: {
                if (this.xValue === -1 && this.yValue === 0) {
                    this.updateScore(instruction)
                    return
                }

                this.handleTile(instruction)
                break
            }
            default: 
                console.log('ARCADE ERROR: unknown instruction')
        }
    }

    this.next = () => {
        if (this.nextInstructionType === XPOS) {
            this.nextInstructionType = YPOS
            return
        }
        if (this.nextInstructionType === YPOS) {
            this.nextInstructionType = TILE_TYPE
            return
        }
        if (this.nextInstructionType === TILE_TYPE) {
            this.nextInstructionType = XPOS
            return
        }
    }

    this.handleTile = tile => {
        if (this.board[this.yValue]) {
            this.placeTile(tile)
        }
        else {
            this.board[this.yValue] = []
            this.placeTile(tile)
        }
    }

    //0 is an empty tile. No game object appears in this tile.
    // 1 is a wall tile. Walls are indestructible barriers.
    // 2 is a block tile. Blocks can be broken by the ball.
    // 3 is a horizontal paddle tile. The paddle is indestructible.
    // 4 is a ball tile. The ball moves diagonally and bounces off objects.
    this.placeTile = tile => {
        if (tile === 4) {
            if (this.board[this.yValue][this.xValue] === 2) {
                this.board[this.yValue][this.xValue] = 0
                this.destroyBlock()
            }
            this.prevBallPos = this.ballPos
            this.ballPos = {
                y: this.yValue,
                x: this.xValue
            }
        }
        if (tile === 3) {
            this.paddlePos = {
                y: this.yValue,
                x: this.xValue
            }
        }
        this.board[this.yValue][this.xValue] = tile
    }

    this.getInput = () => {
        if (this.input.length > 0)
            return Promise.resolve(this.input.pop())

        return Promise.resolve(this.getNextPaddlePos())
    }

    this.close = () => {}

    this.getNextPaddlePos = () => {
        if (this.paddlePos.x < this.ballPos.x) {
            return 1
        }
        if (this.paddlePos.x > this.ballPos.x) {
            return -1
        }

        return 0
    }
}
module.exports = Arcade