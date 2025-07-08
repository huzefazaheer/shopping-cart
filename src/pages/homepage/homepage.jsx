import { Link, useOutletContext } from "react-router-dom"
import styles from "./styles.module.css"

import { useEffect, useState } from "react"

export default function Homepage(){

    const [data, setData] = useState([])
    const { cartCount, setCartCount } = useOutletContext();

    useEffect(()=>{
        async function getData() {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setData(data)
        }
        getData()
    }, [])

    const products = data.map(item => {
        return(
            <div className={styles.product}>
                <Link to={"/product/"+item.id}>{item.title}</Link>
            </div>
        )
    })

    return(
        <>
        <h1>Home</h1>
        <p>{cartCount}</p>
        {products}</>
    )
}