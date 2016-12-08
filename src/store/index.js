const RANDOM = 'RANDOM'

const randomColumns = (rng = Math.random.bind(this)) => store => next => action => {
    if(action.type === RANDOM && typeof action.fn === 'function'){
        const r = action.fn(rng, Object.assign({}, store.getState()))
        action.nextAction && store.dispatch(action.nextAction(r))
    }
    return next(action)
}

export const randomAction = fn => nextAction => ({
    type: RANDOM,
    fn,
    nextAction
})

export default randomColumns