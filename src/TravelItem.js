import './TravelItem.css'

const TravelItem = ({ name, packed, quantity, id, togglePacked, updateQuantity}) => { 
    const cssPrefix = 'TravelItem'
    return (
        <div className={`${cssPrefix}-container`}>
            {name}
            <button disabled={quantity === 1} onClick={() => updateQuantity(quantity - 1, id)}>
                -
            </button> 
            {quantity}
            <button onClick={() => updateQuantity(quantity + 1, id)}>
                +
            </button>
            <button onClick={() => togglePacked(!packed, id)}>
                {packed ? 'Unpack' : 'Pack'}
            </button>
          </div>
)}

export default TravelItem