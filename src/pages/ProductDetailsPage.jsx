import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Layouts/Header.jsx';
import Footer from '../components/Layouts/Footer.jsx';
import { ProductDetails } from '../components/Products/ProductDetails.jsx';
import {server} from "../server.js";
import SuggestProducts from "../components/Products/SuggestProducts.jsx";

export const ProductDetailsPage = () => {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const productName = name.replace(/-/g, ' ');

    useEffect(() => {
        axios.get(`${server}/product/${productName}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [productName]);



    return (
        <>
            <Header />
            {product && <ProductDetails product={product} />}
            {
                product && <SuggestProducts vendorId={product.product.vendor_id} />
            }
            <Footer />
        </>
    );
};