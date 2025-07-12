import { useState } from "react";
import styles from "./styles.module.css"
import { useNavigate, useParams } from "react-router-dom"

export default function Product({ cartCount, setCartCount, data, setPrice }){

    const navigate = useNavigate();
    const {id} = useParams()
    const [quantity, setQuantity] = useState(1)

    return(
        <>
        <h1>Product</h1>
        <div className={styles.product}>
            <h2>{data[id-1].title}</h2>
            <img className={styles.image} src={data[id-1].image}></img>
            <p className={styles.desc}>{data[id-1].description}</p>
            <h3>${data[id-1].price}</h3>
        </div>
        <label>Quantity</label>
        <input className={styles.input} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
        <button className={styles.addtocard} onClick={()=>{setCartCount(parseInt(cartCount)+parseInt(quantity))
        setPrice(parseInt(quantity) * data[id-1].price)
        navigate("/")
        }}>Add to Cart</button>
        </>
    )
}