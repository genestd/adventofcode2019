const data = require('./input')

const calc = value => Math.floor(value/3) -2

const main = () => {
    const total = data.reduce((result, input) => { 
        let fuelMass = calc(input)
        while (fuelMass > 0) {
            result = result + fuelMass
            fuelMass = calc(fuelMass)
        }
        return result
    }, 0)
    console.log(total)
}
main()