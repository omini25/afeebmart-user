import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import {server} from "../../server.js";

const Ratings = ({ productId }) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch(`${server}/review/${productId}`)
            .then(response => response.json())
            .then(data => {
                const totalRating = data.reduce((total, rating) => total + rating, 0);
                setRating(totalRating / data.length);
            })
            .catch(error => console.error(error));
    }, [productId]);

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <AiFillStar
                    key={i}
                    size={20}
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                />
            );
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <BsStarHalf
                    key={i}
                    size={17}
                    color="#f6ba00"
                    className="mr-2 cursor-pointer"
                />
            );
        } else {
            stars.push(
                <AiOutlineStar
                    key={i}
                    size={20}
                    color="#f6ba00"
                    className="mr-2 cursor-pointer"
                />
            );
        }
    }

    return <div className="flex"> {stars}</div>;
};

export default Ratings;