module.exports = {
    parseOpCode: value => {
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
    },
    interpretParamType: (paramNum, paramType, index, program) => {
        return paramType === 0 ? program[program[index+paramNum]] : program[index+paramNum]
    },
    performOp: async (index, program, input, output, save) => {
        const newProgram = [...program]
        const val = module.exports.parseOpCode(newProgram[index])
        //console.log('handling next op: ', val)
        if (val.opCode === 1) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: newProgram[index+3],
                nextIndex: index+4,
                done: false
            }
            //console.log(`Op1 adds ${operation.pos1} and ${operation.pos2} and saves to ${operation.outPos}` )
            newProgram[operation.outPos] = Number(operation.pos1) + Number(operation.pos2)
            
            return { operation, program: newProgram }
        }
        if (val.opCode === 2) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: newProgram[index+3],
                nextIndex: index+4,
                done: false
            }
            //console.log('handling op1', operation)
            newProgram[operation.outPos] = Number(operation.pos1) * Number(operation.pos2)
            return { operation, program: newProgram }
        }
        if (val.opCode === 3) {
            try {
                const answer = await input.getInput()
                const operation = {
                    opCode: val.opCode,
                    pos1: newProgram[index+1],
                    nextIndex: index + 2,
                    done: false
                }
                newProgram[operation.pos1] = answer
                //console.log('>>>>answer', answer, newProgram[operation.pos1])
                return { operation, program: newProgram }
            } catch(error) {
                console.log(error)
            }
        }
        if (val.opCode === 4) {
            try {
                const operation = {
                    opCode: val.opCode,
                    pos1: newProgram[index+1],
                    nextIndex: index + 2,
                    done: false
                }
                if (output) {
                    if (typeof output === 'function')
                        output(newProgram[operation.pos1])
                    else
                        output.value = newProgram[operation.pos1]
                }
                console.log("OUTPUT", newProgram[operation.pos1])
    
                save(newProgram[operation.pos1])
                return { operation, output, program: newProgram }
            } catch(error) {
                console.log(`opcode 4 error: `, error)
            }
        }   
        // if the first parameter is non-zero,
        // it sets the instruction pointer to the value from the second parameter.
        // Otherwise, it does nothing.
        if (val.opCode === 5) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: null,
                nextIndex: index+3,
                done: false
            }
            if (operation.pos1 !== 0)
                operation.nextIndex = operation.pos2
            return { operation, program: newProgram }
        }
    
        if (val.opCode === 6) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: null,
                nextIndex: index+3,
                done: false
            }
            if (operation.pos1 === 0)
                operation.nextIndex = operation.pos2
            return { operation, program: newProgram }
        }
    
        if (val.opCode === 7) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: newProgram[index+3],
                nextIndex: index+4,
                done: false
            }
            newProgram[operation.outPos] = (operation.pos1 < operation.pos2) ? 1 : 0
            return { operation, program: newProgram }
        }
    
        if (val.opCode === 8) {
            const operation = {
                opCode: val.opCode,
                pos1: module.exports.interpretParamType(1, val.param1Type, index, newProgram),
                pos2: module.exports.interpretParamType(2, val.param2Type, index, newProgram),
                outPos: newProgram[index+3],
                nextIndex: index+4,
                done: false
            }
            newProgram[operation.outPos] = (operation.pos1 === operation.pos2) ? 1 : 0
            return { operation, program: newProgram }
        }
    
        if (val.opCode === 99) {
            return {
                operation: {
                    opCode: val.opCode,
                    done: true
                }, newProgram
            }
        }
            
        console.log('ERROR, invalid op code', val)
    }
}
