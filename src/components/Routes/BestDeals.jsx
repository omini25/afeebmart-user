import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import {server} from "../../server.js";

const BestDeals = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/ad-products`)
            .then(response => {
                if (response.data && Array.isArray(response.data.ad_products)) {
                    const firstFive = response.data.ad_products.slice(0, 5);
                    setData(firstFive);
                } else {
                    console.error('Error: response.data.ads_products is not an array', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Ads</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {
                        data && data.length !== 0 &&(
                            <>
                                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BestDeals;