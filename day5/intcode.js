const readline = require('readline')
const program = require('./input')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const getInput = () => {
    return new Promise((resolve, reject) => {
        rl.on('line', line => {
            rl.close()
            resolve(line)
        })
    })
}

const parseOpCode = value => {
    //console.log('op code', value)
    const code = value.toString().split('')
    const opCode = Number(code.splice(code.length-2, 2).join(''))
    const param1Type = Number(code.pop() || 0)
    const param2Type = Number(code.pop() || 0)
    const param3Type = Number(code.pop() || 0)
    return {
        opCode,
        param1Type,
        param2Type,
        param3Type
    }
}

const handleNextOp = async (index, program) => {
    const val = parseOpCode(program[index])
    //console.log('checking', program[6])
    //console.log('handling next op: ', val)
    if (val.opCode === 1) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos: program[index+3],
            nextIndex: index+4,
            done: false
        }
        //console.log(`Op1 adds ${operation.pos1} and ${operation.pos2} and saves to ${operation.outPos}` )
        program[operation.outPos] = Number(operation.pos1) + Number(operation.pos2)
        
        return operation
    }
    if (val.opCode === 2) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos: program[index+3],
            nextIndex: index+4,
            done: false
        }
        //console.log('handling op1', operation)
        program[operation.outPos] = Number(operation.pos1) * Number(operation.pos2)
        return operation    }
    if (val.opCode === 3) {
        const answer = await getInput()
        const operation = {
            opCode: val.opCode,
            pos1: program[index+1],
            nextIndex: index + 2,
            done: false
        }
        program[operation.pos1] = answer
        //console.log('>>>>answer', answer, program[operation.pos1])
        return operation
    }
    if (val.opCode === 4) {
        const operation = {
            opCode: val.opCode,
            pos1: program[index+1],
            nextIndex: index + 2,
            done: false
        }
        console.log("OUTPUT", program[operation.pos1])
        return operation
    }   
    // if the first parameter is non-zero,
    // it sets the instruction pointer to the value from the second parameter.
    // Otherwise, it does nothing.
    if (val.opCode === 5) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos: program[index+3],
            nextIndex: index+3,
            done: false
        }
        if (operation.pos1 !== 0)
            operation.nextIndex = operation.pos2
        return operation
    }

    if (val.opCode === 6) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos: program[index+3],
            nextIndex: index+3,
            done: false
        }
        if (operation.pos1 === 0)
            operation.nextIndex = operation.pos2
        return operation
    }

    if (val.opCode === 7) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos: program[index+3],
            nextIndex: index+4,
            done: false
        }
        program[operation.outPos] = (operation.pos1 < operation.pos2) ? 1 : 0
        return operation
    }

    if (val.opCode === 8) {
        const operation = {
            opCode: val.opCode,
            pos1: val.param1Type === 0 ? Number(program[program[index+1]]) : Number(program[index+1]),
            pos2: val.param2Type === 0 ? Number(program[program[index+2]]) : Number(program[index+2]),
            outPos:  program[index+3],
            nextIndex: index+4,
            done: false
        }
        program[operation.outPos] = (operation.pos1 === operation.pos2) ? 1 : 0
        return operation
    }

    if (val.opCode === 99) {
        return {
            opCode: val.opCode,
            done: true
        }
    }
        
    console.log('ERROR, invalid op code', val)
}

const main = async () => {
    let test = await handleNextOp(0, program)
    while (!test.done) {
        console.log(`next index: ${test.nextIndex}, (${program[test.nextIndex]})`)
        test = await handleNextOp(test.nextIndex, program)
    }
    //console.log('last line', test1)
}

main()
