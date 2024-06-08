import {Header} from "../components/Layouts/Header.jsx";
import styles from "../styles/styles.js";
import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";
import ProductCard from "../components/Products/ProductCard.jsx";
import axios from 'axios';
import {server} from "../server.js";
import Footer from "../components/Layouts/Footer.jsx";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/products`)
            .then(response => {
                if (response.data && Array.isArray(response.data.products)) {
                    const products = response.data.products;
                    if (categoryData === null) {
                        const d = products.sort((a, b) => a.createdAt - b.createdAt);
                        setData(d);
                    } else {
                        const d = products.filter((i) => i.category === categoryData);
                        setData(d);
                    }
                } else {
                    console.error('Error: response.data.products is not an array', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, [categoryData]);

    return (
        <>
            <div>
                <Header activeHeading={3} />
                <br />
                <br />
                <div className={`${styles.section}`}>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                        {
                            data.length === 0 ? (
                                <h1 className="text-center w-full pb-[100px] text-[20px]">
                                    No products found!
                                </h1>
                            ):null
                        }
                    </div>
                </div>
                <br />
                <br />
                <Footer />
            </div>
        </>
    )
}