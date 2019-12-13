const input = 
// [109, -1, 4, 1, 99] //outputs -1
// [109, -1, 104, 1, 99] //outputs 1
// [109, -1, 204, 1, 99] //outputs 109
// [109, 1, 9, 2, 204, -6, 99] //outputs 204
// [109, 1, 109, 9, 204, -6, 99] //outputs 204
// [109, 1, 209, -1, 204, -106, 99] //outputs 204
// [109, 1, 3, 3, 204, 2, 99] //outputs the input
// [109, 1, 203, 2, 204, 2, 99] // outputs the input
require('./input')
const Computer = require('../day7/Computer')

const main = async () => {
    try {
        const compA = new Computer(input, [2])
        const result = await compA.compute()
        //console.log(result)
    } catch(error) {
        console.log('>>>>', error)
    }
}

main()