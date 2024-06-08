import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { server } from "../../server.js";
import styles from "../../styles/styles.js";

export const DropDown = ({setDropDown}) => {
    const navigate = useNavigate();
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const response = await axios.get(`${server}/categories`);
                setCategoriesData(response.data.categories);
            } catch (error) {
                console.error('Failed to fetch categories data: ', error);
            }
        };

        fetchCategoriesData();
    }, []);

    const submitHandle = (i) => {
        navigate(`/products/?category=${i.category_name}`);
        setDropDown(false);
        window.location.reload();
    }
    return (
        <>
            <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
                {
                    categoriesData && categoriesData.map((i, index) => {
                        return (
                            <div key={i.category_name} className={`${styles.normalFlex}`}
                                 onClick={() => submitHandle(i)}>
                                <img src={`https://afreebmart.com/images/categories/${i.category_icon}`}
                                     alt={i.category_name} style={{width:"25px", height:"25px", objectFit:"contain", marginLeft:"10px", userSelect:"none"}}/>
                                <h3 className="m-3 cursor-pointer select-none">{i.category_name}</h3>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}