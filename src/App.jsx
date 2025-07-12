import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import Product from './pages/product/product'
import Homepage from './pages/homepage/homepage'
import Error from './pages/error/error'

function App() {

  const [cartCount, setCartCount] = useState(0)
  const [price, setPrice] = useState(0)
  
  const [data, setData] = useState([])
    useEffect(()=>{
        async function getData() {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setData(data)
        }
        getData()
    }, [])

  return (
    <>
    <div className='cart'>
      <p>Cart: {cartCount}</p>
<button className='btncheckout' onClick={(e) => {
            alert("Chekout " + cartCount + " items totalling " + price)
        }}>Checkout</button>
    </div>
      
         <BrowserRouter>
         <Routes>

               <Route path="/" element={<Homepage  data={data}/>} />
               <Route path="product/:id" element={<Product  data={data} setCartCount={setCartCount} cartCount={cartCount} setPrice={setPrice}/>} />
               <Route path="*" element={<Error/>} />
              
         </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
