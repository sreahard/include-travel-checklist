import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage, useMount } from 'react-use'
import './App.css'
import { useTravelReducer } from './reducers/travelItems'
import TravelItem from './TravelItem';
import sampleItems from './sampleItems'

function App() {
  const { addItem, initItems, items, removeAllItems, removeItem, togglePacked, updateQuantity } = useTravelReducer()
  // create a default item to handle resetting state after adding item
  const defaultItem = { name: '', quantity: 1, packed: false }
  const [newItem, setNewItem] = useState(defaultItem)

  // Store in localstorage to persist state
  const [localItems, setLocalItems, removeStorage] = useLocalStorage('travel-list', items)

  useMount(() => {
    // use default items on init if no items stored
    const itemsToSet = localItems.length > 0 ? localItems : items
    initItems(itemsToSet)
  })

  useEffect(() => {
    if (items.length < 1) removeStorage()
    setLocalItems(items)
  }, [items, setLocalItems, removeStorage])

  // create filtered lists so it's easier to see what needs to be packed
  const itemsToPack = items.filter(item => !item.packed)
  const packedItems = items.filter(item => item.packed)
  // Just to keep thing DRY
  const inputId = 'item-name'
  const sharedItemProps = { removeItem, togglePacked, updateQuantity }
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
          <TravelItem key={item.id} {...sharedItemProps} {...item} />
        )}
        {packedItems.length  > 0 && <h2>Packed</h2>}
        {packedItems.map((item, index) => 
          <TravelItem key={item.id} {...sharedItemProps} {...item} />
        )}
        {items.length > 0 && <button onClick={removeAllItems}>Remove All Items</button>}
      </header>
    </div>
  );
}

export default App;
