function Asteroid( id, xCoord, yCoord) {
    this.id = id
    this.x = xCoord
    this.y = yCoord
    this.vectors = {}

    this.getId = () => this.id
    this.getX = () => this.x
    this.getY = () => this.y
    this.getAllVectors = () => this.vectors

    this.getVector = target => {
        const targetX = target.getX()
        const targetY = target.getY()
        const thisX = this.getX()
        const thisY = this.getY()

        const angle = this.calcAngleDegrees(-1*(targetY - thisY), (targetX - thisX))
        const distance = Math.sqrt(Math.pow(targetY - thisY, 2) + Math.pow(targetX - thisX, 2))
        // let direction
        // if (targetY - thisY !== 0) {
        //     direction = (targetY - thisY) > 0 ? 1 : -1
        // } else {
        //     direction = (targetX - thisX) > 0 ? 1 : -1
        // }
             
        return {
            angle,
            distance
        }
    }

    this.addVector = (vector, id) => {
        if (this.vectors[vector.angle]) {
                this.vectors[vector.angle].distance = Math.min(this.vectors[vector.angle].distance, vector.distance) 
                this.vectors[vector.angle].targetList.push(id)
        } else {
            this.vectors[vector.angle] = {
                distance: vector.distance,
                targetList: [id]
            }
        }
    }

    this.getVectorCount = (log=false) => {
        return Object.keys(this.vectors).reduce((total, vector) => {
            if (this.vectors[vector].distance !== null) {
                if (log)
                    console.log(this.vectors[vector].targetList)
                total = total + 1
            }

            return total
        }, 0)
    }

    this.destroyTarget = vector => {
        let target = null
        if (this.vectors[vector] && this.vectors[vector].targetList.length > 0) {
            target = this.vectors[vector].targetList.splice(0,1)[0]
        }
        if (this.vectors[vector] && this.vectors[vector].targetList.length === 0) {
            this.removeVector(vector)
        }
        return target
    }

    this.removeVector = vector => {
        delete this.vectors[vector]
    }

    this.calcAngleDegrees = (x, y) => Math.atan2(-y, -x) * (180 / Math.PI) + 180
}
Asteroid.prototype.toString = function() {
    return {
        id: this.id,
        x: this.x,
        y: this.y,
        vectors: this.vectors
    }
}

module.exports = Asteroid