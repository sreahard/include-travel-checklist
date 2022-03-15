import { v4 as uuidv4 } from 'uuid'

const sampleItems = [
    { name: 'Towel', quantity: 2, packed: false, id: uuidv4() },
    { name: 'Swim Trunks', quantity: 2, packed: false, id: uuidv4() },
    { name: 'Sunscreen', quantity: 2, packed: false, id: uuidv4() },   
    { name: 'Socks', quantity: 2, packed: false, id: uuidv4() },
    { name: 'Toothbrush', quantity: 1, packed: false, id: uuidv4() },
    { name: 'Toothpaste', quantity: 1, packed: false, id: uuidv4() },
    { name: 'Brush', quantity: 1, packed: false, id: uuidv4() },
]

export default sampleItems