import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './ChipInput.css';

interface ChipInputProps {
  initialItems: string[];
}

const ChipInput: React.FC<ChipInputProps> = ({ initialItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>(initialItems);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeFilteredItems = () => {
      setFilteredItems(initialItems.filter(item => !selectedItems.includes(item)));
    };
    initializeFilteredItems();
    return () => {
    };
  }, [initialItems, selectedItems]);

  const filterItems = (input: string) => {
    setFilteredItems(initialItems.filter(item => item.toLowerCase().includes(input.toLowerCase())));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    filterItems(event.target.value);
  };

  const handleItemClick = (item: string) => {
    setSelectedItems(prevItems => [...prevItems, item]);
    setFilteredItems(prevItems => prevItems.filter(filteredItem => filteredItem !== item));
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastSelectedItem);
    }
  };

  const handleChipRemove = (item: string) => {
    setSelectedItems(prevItems => prevItems.filter(chip => chip !== item));
    setFilteredItems(prevItems => [...prevItems, item]);
  };

  return (
    <div className="chip-input">
      <div className="chips">
        {selectedItems.map((item, index) => (
          <div key={index} className="chip">
            {item}
            <span className="remove" onClick={() => handleChipRemove(item)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Search Users"
        ref={inputRef}
      />
      <ul className="item-list">
        {filteredItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipInput;
