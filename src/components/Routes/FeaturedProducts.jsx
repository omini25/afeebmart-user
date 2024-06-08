import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import {server} from "../../server.js";

export const FeaturedProducts = () => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/products`)
            .then(response => {
                if (response.data && Array.isArray(response.data.products)) {
                    setProductsData(response.data.products);
                } else {
                    console.error('Error: response.data.products is not an array', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);

    return (
        <>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1> Products </h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {
                        productsData && productsData.map((i, index) => <ProductCard data={i} key={index} />)
                    }
                </div>
            </div>
        </>
    )
}