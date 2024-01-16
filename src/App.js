import React from 'react';
import './App.css';
import ChipInput from './components/ChipInput.tsx'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pick Users</h1>
      </header>
      <main>
        <ChipInput initialItems={['Soham', 'Ken', 'Denise', 'Tracy', 'Brad','Calvin']} />
      </main>
    </div>
  );
}

export default App;
