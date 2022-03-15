import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import { useTravelReducer } from './reducers/travelItems'
import TravelItem from './TravelItem';

function App() {
  const { addItem, items, togglePacked, updateQuantity } = useTravelReducer()
  // create a default item to handle resetting state after adding item
  const defaultItem = { name: '', quantity: 1, packed: false }
  const [newItem, setNewItem] = useState(defaultItem)

  // create filtered lists so it's easier to see what needs to be packed
  const itemsToPack = items.filter(item => !item.packed)
  const packedItems = items.filter(item => item.packed)
  // Just to keep thing DRY
  const inputId = 'item-name'

  const handleAddItem = () => {
    // add item with reducer and give it a uuid
    addItem({ ...newItem, id: uuidv4() })
    // reset state to default
    setNewItem(defaultItem)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Packing List</h1>
        <div className='App-add-item'>
          <label htmlFor={inputId}>New Item</label>
          <input 
            id={inputId} 
            onChange={event => setNewItem({ ...newItem, name: event.target.value })}
            // Handle form submit
            onKeyUp={event => { if (event.key === 'Enter') handleAddItem() }}
            value={newItem.name}
          />
          <button disabled={newItem.name.length < 1} onClick={handleAddItem}>
            Add Item
          </button>
        </div>
        {itemsToPack.length > 0 && <h2>To Pack</h2>}
        {itemsToPack.map(item => 
          <TravelItem key={item.id} togglePacked={togglePacked} updateQuantity={updateQuantity} {...item} />
        )}
        {packedItems.length  > 0 && <h2>Packed</h2>}
        {packedItems.map((item, index) => 
          <TravelItem key={item.id} togglePacked={togglePacked} updateQuantity={updateQuantity} {...item} />
        )}
      </header>
    </div>
  );
}

export default App;
