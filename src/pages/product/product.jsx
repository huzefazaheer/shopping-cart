import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

export default function Product(){

    const [data, setData] = useState([])
    const { cartCount, setCartCount } = useOutletContext();
const navigate = useNavigate();
    const {id} = useParams()

    useEffect(()=>{
        async function getData() {
            const response = await fetch('https://fakestoreapi.com/products/'+id)
            const data = await response.json()
            setData(data)
        }
        getData()
    },[])

    return(
        <>
        <h1>Product</h1>
        {data.title}
        <button onClick={()=>{setCartCount(cartCount+1)
        navigate("/")
        }}>Add to Cart</button>
        <p>{cartCount}</p>
        </>
    )
}