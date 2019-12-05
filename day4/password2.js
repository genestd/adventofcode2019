const input = require('./input')

const checkLength = input => input.toString().length === 6

const hasDoubleDigit = input => {
    const test = input.toString()
    if (test[0] === test[1] && test[1] !== test[2])
        return true
    else if (test[1] === test[2] && test[2] !== test[3] && test[1] !== test[0])
        return true
    else if (test[2] === test[3] && test[3] !== test[4] && test[2] !== test[1])
        return true
    else if (test[3] === test[4] && test[4] !== test[5] && test[3] !== test[2])
        return true
    else if (test[4] === test[5] && test[5] !== test[6] && test[4] !== test[3])
        return true
    else if (test[5] === test[6] && test[4] !== test[5])
        return true
        
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