const { parseOpCode, interpretParamType, performOp } = require('../utils')

describe('parseOpCodeTests', () => {
    it('handles an op code in position mode', () => {
        const operation = parseOpCode('01')
        expect(operation).toEqual({
            opCode: 1,
            param1Type: 0,
            param2Type: 0,
            param3Type: 0
        })
    })
    it('handles an op code in parameter mode with 1 parameter', () => {
        const operation = parseOpCode('102')
        expect(operation).toEqual({
            opCode: 2,
            param1Type: 1,
            param2Type: 0,
            param3Type: 0
        })
    })
    it('handles an op code in parameter mode with 2 parameters', () => {
        const operation = parseOpCode('1102')
        expect(operation).toEqual({
            opCode: 2,
            param1Type: 1,
            param2Type: 1,
            param3Type: 0
        })
    })
    it('handles an op code in parameter mode with 3 parameters', () => {
        const operation = parseOpCode('11102')
        expect(operation).toEqual({
            opCode: 2,
            param1Type: 1,
            param2Type: 1,
            param3Type: 1
        })
    })
})
describe('interpretParamType tests', () => {
    let program, index
    beforeEach(() => {
        index = 0
        program = [1,5,6,0,4,100,200]
    })
    it('returns the value of the program at the position the parameter value for type 0', () => {
        const op = parseOpCode('1')
        const result1 = interpretParamType(1, op.param1Type, 0, program)
        const result2 = interpretParamType(2, op.param2Type, 0, program)
        expect(result1).toEqual(100)
        expect(result2).toEqual(200)
    })
    it('returns the value of the program at the position of the parameter for type 1', () => {
        const op = parseOpCode('1101')
        const result1 = interpretParamType(1, op.param1Type, 0, program)
        const result2 = interpretParamType(2, op.param2Type, 0, program)
        expect(result1).toEqual(5)
        expect(result2).toEqual(6)
    })
})
describe('performOp tests', () => {
    let index
    beforeEach(() => {
        index = 0
    })
    it('performs an addition op', async () => {
        const program = [1,0,0,4,99]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 1,
                pos1: 1,
                pos2: 1,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [1,0,0,4,2]
        })
    })
    it('performs a multiplication op', async () => {
        const program = [2,0,0,4,99]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 2,
                pos1: 2,
                pos2: 2,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [2,0,0,4,4]
        })
    })
    xit('performs a get input op', async () => {
        const program = [3,3,0,4,99]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 2,
                pos1: 2,
                pos2: 2,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [2,0,0,4,4]
        })
    })
    xit('performs an output op', async () => {
        const program = [4,3,0,4,99]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 2,
                pos1: 2,
                pos2: 2,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [2,0,0,4,4]
        })
    })
    it('performs a jump-if-true op with true', async () => {
        const program = [5,2,4,4,3]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 5,
                pos1: 4,
                pos2: 3,
                outPos: null,
                nextIndex: 3,
                done: false
            },
            program: [5,2,4,4,3]
        })
    }) 
    it('performs a jump-if-true op with false', async () => {
        const program = [105,0,2,4,99]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 5,
                pos1: 0,
                pos2: 2,
                outPos: null,
                nextIndex: 3,
                done: false
            },
            program: [105,0,2,4,99]
        })
    })
    it('performs a jump-if-false op with true', async () => {
        const program = [6,2,4,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 6,
                pos1: 4,
                pos2: 8,
                outPos: null,
                nextIndex: 3,
                done: false
            },
            program: [6,2,4,4,8]
        })
    }) 
    it('performs a jump-if-false op with false', async () => {
        const program = [106,0,4,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 6,
                pos1: 0,
                pos2: 8,
                outPos: null,
                nextIndex: 8,
                done: false
            },
            program: [106,0,4,4,8]
        })
    })
    it('performs a less-than comparison op with true', async () => {
        const program = [1107,2,3,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 7,
                pos1: 2,
                pos2: 3,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [1107,2,3,4,1]
        })
    }) 
    it('performs a less-than comparison op with false', async () => {
        const program = [1107,4,0,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 7,
                pos1: 4,
                pos2: 0,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [1107,4,0,4,0]
        })
    })
    it('performs an equals comparison op with true', async () => {
        const program = [1108,2,2,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 8,
                pos1: 2,
                pos2: 2,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [1108,2,2,4,1]
        })
    }) 
    it('performs an equals comparison op with false', async () => {
        const program = [1108,4,0,4,8]
        const result = await performOp(0, program)
        expect(result).toEqual({
            operation: {
                opCode: 8,
                pos1: 4,
                pos2: 0,
                outPos: 4,
                nextIndex: 4,
                done: false
            },
            program: [1108,4,0,4,0]
        })
    })
})