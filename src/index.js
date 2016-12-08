import {compose, applyMiddleware, createStore} from 'redux'
import randomColumns from './store'
import reducer from './reducers'

import './tags/matrix.tag'
import './tags/matrix-header.tag'

const createStoreWithMiddleware = compose(
    applyMiddleware(randomColumns())
)(createStore)

var reduxStore = createStoreWithMiddleware(reducer)

document.addEventListener('DOMContentLoaded', () => {
    riot.mount('matrix',{store:reduxStore, fontSize: 16, frameRate: 100, newTextInterval: 30000})
})
