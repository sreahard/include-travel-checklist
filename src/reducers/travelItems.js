import { useReducer } from "react"

const actionTypes = {
    addItem: 'ADD_ITEM',
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
        case actionTypes.togglePacked: {
            const { isPacked, id } = payload
            const newState = updateItemsByIdAndKey(id, 'packed', isPacked)
            console.log(newState)
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
    const [{ items }, dispatch] = useReducer(travelItemsReducer, { items: [] })
    const addItem = item => dispatch({ type: actionTypes.addItem, payload: item })
    const togglePacked = (isPacked, id) => dispatch({ type: actionTypes.togglePacked, payload: { isPacked, id } })
    const updateQuantity = (quantity, id) => dispatch({ type: actionTypes.updateQuantity, payload: { quantity, id } })
    return { items, addItem, togglePacked, updateQuantity }
}

export { useTravelReducer }