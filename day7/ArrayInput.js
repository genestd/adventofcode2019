const readline = require('readline')

function ArrayInput(array) {
    this.inputPointer = 0
    this.inputs = array
    this.interval = null
    this.getInput = () => {
        try {
            if (this.inputPointer < this.inputs.length ) {
                const result = this.inputs[this.inputPointer]
                this.inputPointer++
                //console.log(`input is ${result}`)
                return Promise.resolve(result)    
            } else {
                return new Promise((resolve, reject) => {
                    try {
                        this.interval = setInterval(() => {
                            if (this.inputPointer < this.inputs.length) {
                                const result = this.inputs[this.inputPointer]
                                this.inputPointer++
                                clearInterval(this.interval)
                                //console.log(`input is ${result}`)
                                resolve(result)    
                            }
                        }, 10)
                    } catch(error) {
                        console.log('caught interval error', error)
                    }
                })
            }
        } catch(error) {
            console.log('getinput error', error)
        }
    }
    
    this.addInput = input => {
        this.inputs.push(input)
    }
    this.close = () => {}
}

module.exports = ArrayInput