export const createInitialDrops = (columns, textArray, rng) =>
    new Array(Math.floor(columns)).fill({pos:1, text: textCreator(textArray, rng)})

export const oneMoveDrops = (drops, fontSize, height, textArray, rng) => {
    const newDrops = []
    for (let i = 0; i < drops.length; i++) {
        const newDrop = Object.assign({}, drops[i])
        newDrops[newDrops.length] = newDrop
        if (newDrop.pos * fontSize > height && rng() > 0.975)
            newDrop.pos = 0;
        newDrop.pos++
        newDrop.text = textCreator(textArray, rng)
    }
    return newDrops
}

export const getRandomInt = (min, max, rng) => {
    return Math.floor(rng() * (max - min + 1)) + min;
}

const textCreator = (textArray, rng) =>
    textArray[Math.floor(rng() * textArray.length)]
