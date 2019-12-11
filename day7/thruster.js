const Computer = require('./Computer')
const program = require('./input')

const generateInputValues = () => {
    const inputValues = []
    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            for (let c = 0; c < 5; c++) {
                for (let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++) {
                        if (isUnique(a, b, c, d, e))
                            inputValues.push([a,b,c,d,e])
                    }
                }
            }
        }
    }
    return inputValues
}

const isUnique = (a, b, c, d, e) => {
    return (a !== b && a !== c && a !== d && a !== e &&
        b !== c && b !== d && b !== e &&
        c !== d && c !== e &&
        d !== e)
}

const main = async () => {

    const inputValues = generateInputValues()
    let thrust = 0
    let output = {}
    let iteration = 0
    for (let [phaseA, phaseB, phaseC, phaseD, phsaseE] of inputValues) {
        let compA = new Computer(program, [inputValues[iteration][0], 0], output)
        await compA.compute()
        let compB = new Computer(program, [inputValues[iteration][1], output.value], output)
        await compB.compute()
        let compC = new Computer(program, [inputValues[iteration][2], output.value], output)
        await compC.compute()
        let compD = new Computer(program, [inputValues[iteration][3], output.value], output)
        await compD.compute()
        let compE = new Computer(program, [inputValues[iteration][4], output.value], output)
        await compE.compute()
        iteration++
        thrust = Math.max(thrust, output.value)
    }
    console.log(thrust, output.value)
}

main()