const input = require('./input')

const getNextOp = index => {
    return {
        opCode: input[index],
        pos1: input[index+1],
        pos2: input[index+2],
        outPos: input[index+3]
    }
}

const performOp = op => {
    switch (op.opCode) {
        case 1: {
            input[op.outPos] = input[op.pos1] + input[op.pos2]
            return true
        }
        case 2: {
            input[op.outPos] = input[op.pos1] * input[op.pos2]
            return true
        }
        case 99: 
            return false
        default:
            console.log('ERROR!')        
    }
}

const main = () => {
    let index = 0;
    let keepGoing = true
    while (index < input.length-1 && keepGoing) {
        let op = getNextOp(index)
        keepGoing = performOp(op)
        index = index + 4
    }
    console.log(input[0])
}

main()