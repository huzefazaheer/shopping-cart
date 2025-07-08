import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

export default function Product(){

    const { cartCount, setCartCount, data } = useOutletContext();
    const navigate = useNavigate();
    const {id} = useParams()


    return(
        <>
        <h1>Product</h1>
        {data[id].title}
        <button onClick={()=>{setCartCount(cartCount+1)
        navigate("/")
        }}>Add to Cart</button>
        <p>{cartCount}</p>
        </>
    )
}