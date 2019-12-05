const input = require('./input')

const checkLength = input => input.toString().length === 6

const hasDoubleDigit = input => {
    const test = input.toString()
    for (let i=0; i < test.length-1; i++) {
        if (test[i] === test[i+1])
            return true
    }
    return false
}

const alwaysIncreases = input => {
    const test = input.toString()
    for (let i=1; i < test.length; i++) {
        //console.log(parseInt(test[i]), parseInt(test[i-1]))
        if (parseInt(test[i]) < parseInt(test[i-1]))
            return false
    }
    return true
}

const main = () => {
    let candidates = []
    for(let i=input[0]; i<=input[1]; i++) {
        if (checkLength(i) && hasDoubleDigit(i) && alwaysIncreases(i))
            candidates.push(i)
    }

    console.log(candidates.length)
}

main()