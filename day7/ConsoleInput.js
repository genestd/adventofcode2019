const readline = require('readline')

function ConsoleInput() {
    this.device = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
    this.getInput = () => {
        return new Promise((resolve, reject) => {
            this.device.on('line', line => {
                resolve(line)
            })
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