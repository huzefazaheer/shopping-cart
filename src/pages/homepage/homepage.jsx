import { Link, useNavigate, useOutletContext } from "react-router-dom"
import styles from "./styles.module.css"

export default function Homepage({ data }){

    const navigate = useNavigate()
    
    const products = data.map(item => {
        return(
            <div className={styles.product} onClick={() =>{ navigate("product/"+item.id)
            }}>
                <h3>{item.title}</h3>
                <img src={item.image}></img>
                <h4>${item.price}</h4>
            </div>
        )
    })

    return(
        <>
        <h1>Home</h1>
        <div className={styles.productholder}>
        {products}    
        </div>
        </>
    )
}