import { handleActions } from 'redux-actions';

const InitialText = '0123456789'
const initialState = {
    ctx: null,
    fontSize: 16,
    fontColor: '#0F0',
    drops: [{text: null, pos: 0}],
    height: 0,
    width: 0,
    textArray: InitialText.split('')
}

const reducer = handleActions({
    INITIAL_SET: (state, action) => {
        return Object.assign({}, state, action.payload)
    },
    UPDATE_DROPS: (state, action) => {
        return {...state, drops: action.payload}
    },
    QUEUE_NEW_CHAR: (state, action) => {
        const newText = action.payload
        const oldTextArray = state.textArray
        oldTextArray.push(newText)
        return {...state, textArray: oldTextArray.slice(1, oldTextArray.length)}
    }
}, initialState)

export default reducer