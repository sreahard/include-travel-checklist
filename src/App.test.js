import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('renders list of items', () => {
  render(<App />)
  const addItemButton = screen.getByText('Add Item')
  const removeAllButton = screen.getByText('Remove All Items')
  
  expect(addItemButton).toBeInTheDocument()
  
  fireEvent.click(addItemButton)
  const unpackedHeader = screen.getByText('To Pack')
  const packItemButtons = screen.getAllByText('Pack')
  expect(unpackedHeader).toBeInTheDocument()
  expect(packItemButtons[0]).toBeInTheDocument()
  
  fireEvent.click(packItemButtons[0])
  const packedHeader = screen.getByText('Packed')
  const unpackItemButtons = screen.getAllByText('Unpack')
  expect(packedHeader).toBeInTheDocument()
  expect(unpackItemButtons[0]).toBeInTheDocument()
  expect(removeAllButton).toBeInTheDocument()

  fireEvent.click(removeAllButton)
  expect(removeAllButton).not.toBeInTheDocument()
  expect(unpackedHeader).not.toBeInTheDocument()
  expect(packedHeader).not.toBeInTheDocument()
})
