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
    interpretParamType: (paramNum, paramType, index, program, relativeBase) => {
        let newIndex
        switch (paramType) {
            //val.param1Type === 0 ? newProgram[newProgram[Number(index+1)]] : 
            //val.param1Type === 1 ? newProgram[Number(index+1)] :
            //newProgram[(newProgram[Number(index+1)] + Number(getRelativeBase()))]
            case 0: {
                newIndex = program[Number(index)+Number(paramNum)]
                if (newIndex >= program.length)
                    program[newIndex] = 0
                return BigInt(newIndex || 0)
            }
            case 1: {
                newIndex = BigInt(Number(index)+Number(paramNum) || 0)
                return newIndex
            }
            case 2: {
                newIndex = program[Number(index)+Number(paramNum)]
                return BigInt(newIndex+Number(relativeBase) || 0)
                //console.log('HERE', param, relativeBase, Number(param+relativeBase))
                if (newIndex >= program.length)
                    program[newIndex] = 0
                return BigInt(program[newIndex] || 0)
            }
            default:
                return 0
        }
        
    },
    performOp: async (index, program, input, output, save, getRelativeBase, setRelativeBase) => {
        const newProgram = [...program]

        const val = module.exports.parseOpCode(newProgram[index])
        //console.log('handling next op: ', val)
        if (val.opCode === 1) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                param3: module.exports.interpretParamType(3, val.param3Type, index, newProgram, getRelativeBase()),
                nextIndex: Number(index)+4,
                done: false
            }
            //console.log(`Op1 adds ${operation.param1} and ${operation.param2} and saves to ${operation.param3}` )
            newProgram[operation.param3] = program[(operation.param1)] + program[(operation.param2)]
            
            return { operation, program: newProgram }
        }
        if (val.opCode === 2) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                param3: module.exports.interpretParamType(3, val.param3Type, index, newProgram, getRelativeBase()),
                nextIndex: Number(index)+4,
                done: false
            }
            //console.log('handling op1', operation)
            newProgram[operation.param3] = program[(operation.param1)] * program[(operation.param2)]
            return { operation, program: newProgram }
        }
        if (val.opCode === 3) {
            try {
                const answer = await input.getInput()
                //console.log('answer', answer)
                const operation = {
                    opCode: val.opCode,
                    param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                    //val.param1Type !== 2 ? newProgram[Number(index+1)] : newProgram[Number(index+1)] + Number(getRelativeBase()),

                    nextIndex: index + 2,
                    done: false
                }
                newProgram[operation.param1] = answer
                //console.log('>>>>answer', answer, newProgram[operation.param1])
                return { operation, program: newProgram }
            } catch(error) {
                console.log(error)
            }
        }
        if (val.opCode === 4) {
            try {
                const operation = {
                    opCode: val.opCode,
                    param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                    //val.param1Type === 0 ? newProgram[Number(index+1)] : val.param1Type === 1 ? Number(index+1) :  program[Number(index+1)] + Number(getRelativeBase()),
                    nextIndex: Number(index) + 2,
                    done: false
                }
                if (output) {
                    if (typeof output === 'function')
                        output(newProgram[operation.param1])
                    else
                        output.value = newProgram[operation.param1]
                }
                //console.log("OUTPUT", newProgram[operation.param1])
    
                save(operation.param1)
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
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                nextIndex: Number(index)+3,
                done: false
            }
            if (newProgram[operation.param1] !== 0 && newProgram[operation.param1] !== 0n)
                operation.nextIndex = newProgram[operation.param2]
            return { operation, program: newProgram }
        }
    
        if (val.opCode === 6) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                nextIndex: Number(index)+3,
                done: false
            }
            if (newProgram[operation.param1] === 0 || newProgram[operation.param1] === 0n)
                operation.nextIndex = newProgram[operation.param2]
            return { operation, program: newProgram }
        }
        // check first param < second param, put result in 3rd param
        if (val.opCode === 7) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                param3: module.exports.interpretParamType(3, val.param3Type, index, newProgram, getRelativeBase()),
                //param3: val.param3Type !== 2 ? newProgram[Number(index+3)] : newProgram[Number(index+3)] + Number(getRelativeBase()),
                nextIndex: Number(index)+4,
                done: false
            }
            newProgram[operation.param3] = (newProgram[operation.param1] < newProgram[operation.param2]) ? 1 : 0
            return { operation, program: newProgram }
        }
    
        // Check equality of params; update output position with 1 for equal
        if (val.opCode === 8) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                param2: module.exports.interpretParamType(2, val.param2Type, index, newProgram, getRelativeBase()),
                param3: module.exports.interpretParamType(3, val.param3Type, index, newProgram, getRelativeBase()),
                //param3: val.param3Type !== 2 ? newProgram[Number(index+3)] : newProgram[Number(index+3)] + Number(getRelativeBase()),
                nextIndex: Number(index)+4,
                done: false
            }
            newProgram[operation.param3] = (newProgram[operation.param1] === newProgram[operation.param2]) ? 1 : 0
            return { operation, program: newProgram }
        }
        // Adjust Relative Base
        if (val.opCode === 9) {
            const operation = {
                opCode: val.opCode,
                param1: module.exports.interpretParamType(1, val.param1Type, index, newProgram, getRelativeBase()),
                //param1: val.param1Type === 0 ? newProgram[newProgram[Number(index+1)]] : val.param1Type === 1 ? newProgram[Number(index+1)] : newProgram[(newProgram[Number(index+1)] + Number(getRelativeBase()))],
                nextIndex: Number(index)+2,
                done: false
            }
            setRelativeBase(program[operation.param1])
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
            
        console.log('ERROR, invalid op code at index', index, val)
    }
}
