import { Outlet } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/homepage'
import { useEffect, useState } from 'react'

function App() {
  
  const [data, setData] = useState([])
    useEffect(()=>{
        async function getData() {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setData(data)
        }
        getData()
    }, [])

  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      <Outlet context={{cartCount, setCartCount, data}}/>
    </>
  )
}

export default App
