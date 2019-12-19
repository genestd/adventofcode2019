const input = require('./input')

const getPattern = (repeats, size) => {
    const base = [0, 1, 0, -1]
    let newArray = []
    baseIndex = 0
    repeatCount = 0
    for (let i = 0; i <= size; i++) {
        if (repeatCount >= repeats) {
            repeatCount = 0
            baseIndex++
            if (baseIndex >= base.length) {
                baseIndex = 0
            }
        }
        newArray.push(base[baseIndex])
        repeatCount++
    }
    const first = newArray.shift()
    return newArray
}

const multiplyAndSumAndTrim = (input, pattern, start) => {
    const tempArray = []
    for (let i = start; i < input.length; i++) {
        tempArray.push(input[i] * pattern[i])
    }
    const sum = tempArray.reduce((result, value) => result + value, 0)
    return Math.abs(sum) % 10

}    

const getPhase = (input) => {
    let phaseArray = []
    for (let count = 0; count < 10000; count++) {
        for (let x = 0; x < input.length; x++) {
            const pattern = getPattern(x+1,input.length)
            const newVal = multiplyAndSumAndTrim(input, pattern, x)
            phaseArray.push(newVal)
        }
        count++
    }
    return phaseArray
}

const main = () => {
    let numberInput = input.split('').map(val => Number(val))
    const iterations =  100
    let counter = 0
    while (counter < iterations) {
        numberInput = getPhase(numberInput)
        console.log(numberInput.join('').substring(0, 8))
        counter++
    }
    console.log(numberInput.join('').substring(0, 8))
}

main()