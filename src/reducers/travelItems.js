import { useReducer } from 'react'
import sampleItems from '../sampleItems'


// create const for action types so we aren't passing magic strings
const actionTypes = {
    addItem: 'ADD_ITEM',
    initItems: 'INIT_ITEMS',
    removeAllItems: 'REMOVE_ALL_ITEMS',
    removeItem: 'REMOVE_ITEM',
    togglePacked: 'TOGGLE_PACKED',
    updateQuantity: 'UPDATE_QUANTITY'
}

const travelItemsReducer = (state, { type, payload }) => {
    // helper function for updating items in state by id
    const updateItemsByIdAndKey = (id, key, value) =>  {
        const newState = state.items 
        newState.forEach(item => { 
            if (item.id === id) item[key] = value
            return item
        })
        return newState
    }
    switch(type) {
        case actionTypes.addItem: {
            return { items: [payload, ...state.items] }
        }
        case actionTypes.initItems: {
            return { items: payload }
        }
        case actionTypes.removeAllItems: {
            return { items: [] }
        }
        case actionTypes.removeItem: {
            return { items: state.items.filter(item => item.id !== payload)}
        }
        case actionTypes.togglePacked: {
            const { isPacked, id } = payload
            const newState = updateItemsByIdAndKey(id, 'packed', isPacked)
            return { items: newState }
        }
        case actionTypes.updateQuantity: {
            const { quantity, id } = payload
            const newState = updateItemsByIdAndKey(id, 'quantity', quantity)
            return { items: newState }
        }
        default: {
            return state
        }
    }
}
// Prefer to use a reducer for more sane state management and updating.
const useTravelReducer = () => {
    const [{ items }, dispatch] = useReducer(travelItemsReducer, { items: sampleItems })
    const addItem = item => dispatch({ type: actionTypes.addItem, payload: item })
    const initItems = items => dispatch({ type: actionTypes.initItems, payload: items })
    const removeAllItems = items => dispatch({ type: actionTypes.removeAllItems })
    const removeItem = id => dispatch({ type: actionTypes.removeItem, payload: id })
    const togglePacked = (isPacked, id) => dispatch({ type: actionTypes.togglePacked, payload: { isPacked, id } })
    const updateQuantity = (quantity, id) => dispatch({ type: actionTypes.updateQuantity, payload: { quantity, id } })
    return { items, initItems, addItem, removeAllItems, removeItem, togglePacked, updateQuantity }
}

export { useTravelReducer }