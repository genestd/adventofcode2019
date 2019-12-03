const data = require('./input')

const calc = value => Math.floor(value/3) -2

const main = () => {
    const total = data.reduce((result, input) => { return result + calc(input) }, 0)
    console.log(total)
}

main()