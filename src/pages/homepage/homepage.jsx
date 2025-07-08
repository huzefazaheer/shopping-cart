import { Link, useOutletContext } from "react-router-dom"
import styles from "./styles.module.css"

export default function Homepage(){

    
    const { cartCount, setCartCount,data } = useOutletContext();


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