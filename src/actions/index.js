import {createAction} from 'redux-actions'
import {INITIAL_SET, UPDATE_DROPS, QUEUE_NEW_CHAR} from '../constants'
import {randomAction} from '../store'
import { oneMoveDrops, getRandomInt, createInitialDrops } from '../utils'
import emojis from 'emojis-list'

import {WIKI_URL} from '../constants'

const initializeMatrixAction = createAction(INITIAL_SET)

const updateDropsAction = createAction(UPDATE_DROPS)

export const queueNewText = createAction(QUEUE_NEW_CHAR)

export const initMatrix = (payload) =>
    randomAction((rng, {textArray}) =>
        Object.assign(payload, {
            drops: createInitialDrops(payload.width / payload.fontSize, textArray, rng)
        })
    )(initializeMatrixAction)

export const moveDrops = () =>
    randomAction((rng, {drops, fontSize, height, textArray}) =>
        oneMoveDrops(drops, fontSize, height, textArray, rng)
    )(updateDropsAction)

export const queueRandomText = () =>
    randomAction((rng) =>
        emojis[getRandomInt(0, emojis.length, rng)]
    )(queueNewText)

