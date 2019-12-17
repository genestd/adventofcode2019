module.exports = {
    parseInput: input => {
        const reactions = {}
        input.forEach(reaction => {
            const parts = reaction.split('=>')
            const inputs = parts[0].trim().split(',').map(input => {
                const [amount, type] = input.trim().split(' ')
                return {
                    chemical: type,
                    amount: Number(amount)
                }
            })
            const [quantity, output] = parts[1].trim().split(' ')
            reactions[output] = {
                quantity: Number(quantity),
                inputs
            }
        })
        return reactions
    },
    decompose: (reactions, id, amountNeeded = 1, leftovers = {}) => {
        let ore = 0
        let inputMultiplier = 1
        let surplus = 0
        
        // Use surplus if available
        if (leftovers[id]) {
            if (leftovers[id] >= amountNeeded) {
                leftovers[id] = leftovers[id] - amountNeeded
                return ore
            } else {
                amountNeeded = amountNeeded - leftovers[id]
                leftovers[id] = 0
            }
        }

        // Amount Needed > Amount produced by 1 reaction
        // Add excess back to surplus
        if (amountNeeded > reactions[id].quantity) {
            inputMultiplier = Math.ceil(amountNeeded/reactions[id].quantity)
            surplus = inputMultiplier * reactions[id].quantity - amountNeeded
            leftovers[id] = (leftovers[id] || 0) + surplus  
        }

        if (reactions[id].inputs.length === 1 && reactions[id].inputs[0].chemical === 'ORE') {
            if (reactions[id].quantity > amountNeeded) {
                leftovers[id] = (leftovers[id] || 0) + (reactions[id].quantity - amountNeeded)
            }
            ore = inputMultiplier * reactions[id].inputs[0].amount
            return ore
        } else {
            if (reactions[id].quantity > amountNeeded) {
                leftovers[id] = (leftovers[id] || 0) + (reactions[id].quantity - amountNeeded)
            }
            reactions[id].inputs.forEach(input => {
                ore = ore + module.exports.decompose(reactions, input.chemical, input.amount * inputMultiplier, leftovers)
            })
            //console.log(leftovers)
            return ore
        }
    }
}