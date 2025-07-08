import styles from "./styles.module.css"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

export default function Product(){

    const { cartCount, setCartCount, data } = useOutletContext();
    const navigate = useNavigate();
    const {id} = useParams()


    return(
        <>
        <h1>Product</h1>
        <div className={styles.product}>
            <h2>{data[id].title}</h2>
            <img src={data[id].image}></img>
            <p>{data[id].price}</p>
        </div>
        <button className={styles.addtocard} onClick={()=>{setCartCount(cartCount+1)
        navigate("/")
        }}>Add to Cart</button>
        <p>{cartCount}</p>
        </>
    )
}