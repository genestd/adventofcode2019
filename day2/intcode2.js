const input = require('./input')

const getNextOp = (index, input) => {
    return {
        opCode: input[index],
        pos1: input[index+1],
        pos2: input[index+2],
        outPos: input[index+3]
    }
}

const performOp = (op, input) => {
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
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const newInput = [...input]
            newInput[1] = noun
            newInput[2] = verb
            let index = 0;
            let keepGoing = true
            while (index < newInput.length-1 && keepGoing) {
                let op = getNextOp(index, newInput)
                keepGoing = performOp(op, newInput)
                index = index + 4
            }
            answer = newInput[0]
            if (answer === 19690720)
                console.log(answer, noun, verb)
        }
    }
}

main()