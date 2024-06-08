import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../../styles/styles.js";
import {EventCard} from "./EventCard.jsx";
import {server} from "../../server.js";

export const Events = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${server}/group-products`)
            .then(response => {
                if (response.data && Array.isArray(response.data.group_products)) {
                    setData(response.data.group_products);
                } else {
                    console.error('Error: response.data.group_products is not an array', response.data);
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
                    <h1> Bulk Products </h1>
                </div>

                <div className="w-full gird">
                    {data ? data.map((item, index) => <EventCard data={item} key={index} />) : 'Loading...'}
                </div>
            </div>
        </>
    )
}