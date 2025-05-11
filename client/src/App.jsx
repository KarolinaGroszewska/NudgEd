import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [ping, setPing] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/ping').then(res => setPing(res.data));
  }, []);

  return (
    <>
      <h1>Backend says: {ping}</h1>
    </>
  )
}

export default App
