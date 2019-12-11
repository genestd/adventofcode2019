const imageData = require('./input')

const parseImageData = (data, imageSize) => {
    let pixelIndex = 0
    let layerIndex = 0
    let imageLayers = {
        [`layer${layerIndex}`]: []
    }
    while (pixelIndex < data.length) {
        let rowData = []
        for (let h = 0; h < imageSize.height; h++ ) {
           for (let w = 0; w < imageSize.width; w++) {
                if (w === 0)
                    rowData[h] = []

                rowData[h].push(data[pixelIndex])
                pixelIndex++
            }
        }
        imageLayers[`layer${layerIndex}`] = rowData
        layerIndex++
    }

    return imageLayers
}

const findValuesInLayer = (layer, value) => {
    let zeroCount = 0
    for (let row = 0; row < layer.length; row++) {
        zeroCount = zeroCount + layer[row].filter(pixel => Number(pixel) === value).length
    }
    return zeroCount
}

const main = () => {
    const IL = parseImageData(imageData, { width: 25, height: 6 })
    let fewestZeroesLayer = -1
    let fewestZeroes = 300

    Object.keys(IL).forEach((layer, index) => {
        const zeroesInLayer = findValuesInLayer(IL[layer], 0)
        if (zeroesInLayer < fewestZeroes) {
            fewestZeroesLayer = index
            fewestZeroes = zeroesInLayer
        }
    })

    const targetLayer = IL[`layer${fewestZeroesLayer}`]
    const onesInLayer = findValuesInLayer(targetLayer, 1)
    const twosInLayer = findValuesInLayer(targetLayer, 2)
    const result = onesInLayer * twosInLayer
    console.log(result)
}

main()