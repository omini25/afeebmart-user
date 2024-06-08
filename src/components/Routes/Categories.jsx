import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "../../styles/styles.js";
import {brandingData, categoriesData} from "../../static/data.jsx";
import {useNavigate} from "react-router-dom";
import {server} from "../../server.js";
import {toast} from "react-toastify";

export const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${server}/categories`)
            .then(response => {
                if (response.data && Array.isArray(response.data.categories)) {
                    setCategories(response.data.categories);
                } else {
                    toast.error
                }
            })
    }, []);

    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div className={`branding my-12 flex justify-between w-full shadow bg-white p-5 rounded-md`}>
                    {
                        brandingData && brandingData.map((i, index) => {
                            return (
                                <div className={`flex items-start`} key={index}>
                                    {i.icon}
                                    <div className={`px-3`}>
                                        <h3 className={`font-bold text-sm md:text-base`}>
                                            {i.title}
                                        </h3>
                                        <p className={`text-xs md:text-sm`}>
                                            {i.Description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div
                className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
                id="categories"
            >
                <div
                    className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {categories &&
                        categories.map((category) => {

                            if (category.sub_categories && typeof category.sub_categories === 'string') {
                                let subCategoriesArray = category.sub_categories.split(',');
                                // Randomize the array
                                subCategoriesArray = subCategoriesArray.sort(() => Math.random() - 0.5);
                                // Limit the array to 8 elements
                                subCategoriesArray = subCategoriesArray.slice(0, 3);
                                const handleSubmit = (subCategory) => {
                                    navigate(`/products?category=${subCategory}`);
                                };
                                return subCategoriesArray.map((subCategory) => (
                                    <div
                                        className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                                        key={subCategory}
                                        onClick={() => handleSubmit(subCategory)}
                                    >
                                        <h5 className={`text-[18px] leading-[1.3]`}>{subCategory}</h5>
                                        <img
                                            src={`https://afreebmart.com/images/categories/${category.category_icon}`}
                                            className="w-[50px] object-cover"
                                            alt=""
                                        />
                                    </div>
                                ));
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}