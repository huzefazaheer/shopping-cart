import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Product from './pages/product/product.jsx'
import Error from './pages/error/error.jsx'
import Homepage from './pages/homepage/homepage.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "product/:id",
        element: <Product/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
