import {createAction} from 'redux-actions'
import {INITIAL_SET, UPDATE_DROPS, QUEUE_NEW_CHAR} from '../constants'
import {fetchJsonp} from 'fetch-jsonp'
import {randomAction} from '../store'
import { oneMoveDrops, getRandomInt } from '../utils'
import emojis from 'emojis-list'

import {WIKI_URL} from '../constants'

export const initializeMatrix = createAction(INITIAL_SET)

const updateDrops = createAction(UPDATE_DROPS)

export const queueNewText = createAction(QUEUE_NEW_CHAR)

export const moveDrops = () =>
    randomAction((rng, {drops, fontSize, height}) =>
        oneMoveDrops(drops, fontSize, height, rng)
    )(updateDrops)

export const queueRandomText = () =>
    randomAction((rng) =>
        emojis[getRandomInt(0, emojis.length, rng)]
    )(queueNewText)

