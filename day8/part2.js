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

const condenseLayers = pixelArray => pixelArray.find(pixel => Number(pixel) !== 2)

const main = () => {
    const layeredImage = parseImageData(imageData, { width: 25, height: 6 })
    const flattenedImage = []

    const layerKeys = Object.keys(layeredImage)
    const driver = layeredImage[layerKeys[0]]
    let pixelSet, finalPixel
    for(let row = 0; row < driver.length; row++) {
        for (let pixel = 0; pixel < driver[row].length; pixel++) {
            pixelSet = []
            layerKeys.forEach(layerId => {
                pixelSet.push(layeredImage[layerId][row][pixel])
            })
            finalPixel = condenseLayers(pixelSet)
            if (flattenedImage[row])
                flattenedImage[row][pixel] = finalPixel
            else
                flattenedImage[row] = [finalPixel]

        }
    }
    flattenedImage.forEach(row => {
        //console.log(row)
        row = row.map(pixel => Number(pixel) === 0 ? ' ' : pixel)
        console.log(row.join(''))
    })
}

main()