const utils = require('./utils')

function Camera() {
  this.asciiMap = ''
  this.arrayMap = [[]]
  this.close = () => {}
  this.row = 0

  this.receiveData = data => {
    const chr = String.fromCharCode(data)
    this.asciiMap = this.asciiMap.concat(chr)
    if (data === 10) {
      this.row++
      this.arrayMap[this.row] = []
    } else {
      this.arrayMap[this.row].push(chr)
    }
  }

  this.displayMap = () => {
    console.log(this.asciiMap)
  }

  this.findIntersections = () => {
    let intersections = 0
    let alignmentParameters = 0
    for (let row = 0; row < this.arrayMap.length; row++) {
      for (let col = 0; col < this.arrayMap[row].length; col++) {
        if (this.arrayMap[row][col] !== '#')
          continue
      
        let exits = 0
        // check above
        if (row !== 0) {
          if (this.arrayMap[row-1][col] === '#') {
            exits++
          }
        }
        // check below
        if (row !== this.arrayMap.length - 1) {
          if (this.arrayMap[row+1][col] === '#') {
            exits++
          }
        }
        // check left
        if (col !== 0) {
          if (this.arrayMap[row][col-1] === '#') {
            exits++
          }
        }
        // check right 
        if (col !== this.arrayMap[row].length - 1) {
          if (this.arrayMap[row][col+1] === '#') {
            exits++
          }
        }

        if (exits > 2) {
          intersections++
          alignmentParameters = alignmentParameters + (row * col)
        }
      }
    }
    return alignmentParameters
  }
}


module.exports = Camera