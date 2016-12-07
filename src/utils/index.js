export const createInitialDrops = (columns) => {
    return new Array(Math.floor(columns)).fill(null).map(a => 1)
}

export const oneMoveDrops = (drops, fontSize, height, rng) => {
    const newDrops = drops.concat()
    for (let i = 0; i < newDrops.length; i++) {
        if (newDrops[i] * fontSize > height && rng() > 0.975)
            newDrops[i] = 0;
        newDrops[i]++
    }
    return newDrops
}

export const getRandomInt = (min, max, rng) => {
    return Math.floor(rng() * (max - min + 1)) + min;
}
