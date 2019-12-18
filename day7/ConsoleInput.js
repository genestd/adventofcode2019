const readline = require('readline')

function ConsoleInput() {
    this.input
    this.device = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    this.device.on('line', line => {
        if (this.input) {
            console.log('not ready for new input')
        } else {
            this.input = line
        }
    })
    
    this.getInput = () => {
        return new Promise((resolve, reject) => {
            this.interval = setInterval(() => {
                if (this.input) {
                    const result = this.input
                    clearInterval(this.interval)
                    //console.log(`input is ${result}`)
                    resolve(result)  
                    this.input = null  
                }
            }, 10)
        })
    }
    this.setInput = (input) => {
        this.device.write(input)
    }

    this.close = () => {
        this.device.close()
    }
}

module.exports = ConsoleInput