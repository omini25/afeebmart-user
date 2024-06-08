import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import React from "react";


export const Hero = () => {
    return (
        <>
        <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
        style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1611754349119-9516a4e426dd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover"
        }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1 className={`text-[70px] leading-[1.2] 800px:text[60px] text-primary font-[600] capitalize`}>
                    Your Go-To for Fast and <br /> Fresh Groceries
                </h1>
                <p className={`pt-5 text-[16px] font-[400] text-white`}>
                    Better ingredients, better food, and beverages, at low prices
                </p>
                <Link to="/products" className={`inline-block`}>
                    <div className={`${styles.button} mt-5`}>
                        <span className={`text-[18px] text-white`}>
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
        </>
    )
}