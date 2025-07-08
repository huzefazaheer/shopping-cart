import { Outlet } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/homepage'
import { useState } from 'react'

function App() {

  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      <Outlet context={{cartCount, setCartCount}}/>
    </>
  )
}

export default App
