const { parseOpCode, interpretParamType, performOp } = require('./utils')
const ConsoleInput = require('./ConsoleInput')
const ArrayInput = require('./ArrayInput')
function Computer(program, input, output) {

    this.memory = -1
    this.program = program
    if (input && Array.isArray(input)) {
        this.input = new ArrayInput(input)
    } else {
        this.input = new ConsoleInput()
    }

    if (output) {
        this.output = output
    } else {
        this.output = null
    }
    this.compute = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this.performOp(0, this.program, this.input, this.output, this.save)
                while (!response.operation.done) {
                    //console.log(`next index: ${response.operation.nextIndex.nextIndex}, (${program[response.operation.nextIndex.nextIndex]})`)
                    response = await this.performOp(response.operation.nextIndex, response.program, this.input, this.output, this.save)
                    //console.log('response', response, this.input)
                }
                this.input.close()
                resolve(this.memory)
            } catch(error) {
                console.log('error in compute', error)
                reject(error)
            }
        })
    }
    this.parseOpCode = parseOpCode
    this.interpretParamType = interpretParamType
    this.performOp = performOp
    this.addInput = input => {
        this.input.addInput(input)
    }
    this.setOutput = output => this.output = output
    this.save = value => this.memory = value
}

module.exports = Computer