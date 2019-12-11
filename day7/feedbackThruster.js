const Computer = require('./Computer')
const program = require('./input')

const generateInputValues = () => {
    const inputValues = []
    for (let a = 5; a < 10; a++) {
        for (let b = 5; b < 10; b++) {
            for (let c = 5; c < 10; c++) {
                for (let d = 5; d < 10; d++) {
                    for (let e = 5; e < 10; e++) {
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
    for ([phaseA, phaseB, phaseC, phaseD, phaseE] of inputValues) {
        try {
            let compA = new Computer(program, [phaseA, 0])
            let compB = new Computer(program, [phaseB])
            let compC = new Computer(program, [phaseC])
            let compD = new Computer(program, [phaseD])
            let compE = new Computer(program, [phaseE])
            compA.setOutput(compB.addInput)
            compB.setOutput(compC.addInput)
            compC.setOutput(compD.addInput)
            compD.setOutput(compE.addInput)
            compE.setOutput(compA.addInput)
            const result = await Promise.all([compA.compute(), compB.compute(), compC.compute(), compD.compute(), compE.compute()])
            iteration++
            //console.log('result', result)
            thrust = Math.max(thrust, result[4])
        //}
        //console.log(thrust, output.value)
        } catch(error) {
            console.log('main error', error)
        }
    }
    console.log('output', thrust)
}

main()