import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Product(){

    const [data, setData] = useState([])

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
        </>
    )
}