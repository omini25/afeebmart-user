import React, {useState} from 'react';
import {RxCross1} from "react-icons/rx";
import styles from "../../styles/styles.js";
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart} from "react-icons/ai";
import {useDispatch} from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { toast } from 'react-toastify';

export const ProductDetailsCard = ({setOpen, data}) => {
    const [click, setClick] = useState(false);
    const [count, setCount] = useState(1);
    const [select, setSelect] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart(data));
        toast.success("Product added to cart!");
    };

    const handleMessageSubmit = () => {

    }

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const incrementCount = () => {
        if (count < data.quantity) {
            setCount(count + 1);
        }
    }

    return (
        <>
            <div className="bg-white">
                {
                    data ? (
                        <div style={{backgroundColor: '#00000080'}} className="fixed w-full h-screen top-0 left-0 z-40 flex items-center justify-center">
                            <div className="w-[90] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow relative p-4">

                                <RxCross1 size={30} className="absolute top-3 right-3 z-50" onClick={() => setOpen(false)} />

                                <div className="block w-full 800px:flex">
                                    <div className="w-full 800px:w-[50%]">
                                        <img src={`https://afreebmart.com/images/products/${data.image}`}
                                             alt={data.product_name}/>
                                        <div className="flex">
                                            <img src={`https://afreebmart.com/images/products/${data.image}`}
                                                 alt={data.product_name}
                                                 className="w-[50px] h-[50px] rounded-full mr-2"/>

                                            <div>
                                                <h3 className={`${styles.shop_name}`}>
                                                    {data.store_name}
                                                </h3>
                                                <h5 className="pb-3 text-[15px]">
                                                    4.2 / Ratings
                                                </h5>
                                            </div>
                                        </div>
                                        <div className={`${styles.button} bg-black mt-4 rounded h-11`}
                                             onClick={handleMessageSubmit}>
                                                <span className="text-white flex items-center">
                                                    Send Message <AiOutlineMessage className="ml-1"/>
                                                </span>
                                        </div>
                                        <h5 style={{color: data.quantity === 0 ? 'red' : 'black'}}>
                                            {data.quantity === 0 ? 'Out of stock' : `${data.quantity} in stock`}
                                        </h5>
                                    </div>

                                    <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                                        <h1 className={`${styles.productTitle} text-[20px]`}>
                                            {data.product_name}
                                        </h1>
                                        <p>{data.description}</p>

                                        <div className="flex pt-3">
                                            <h4 className={`${styles.productDiscountPrice}`}>
                                                {data.discount ? data.discount : null}
                                            </h4>
                                            <h3 className={`${styles.price}`}>
                                                {data.price ? data.price + "$" : null}
                                            </h3>
                                        </div>

                                        <div className="flex items-center mt-12 justify-between pr-3">
                                            <div>
                                                <button
                                                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                    onClick={decrementCount}
                                                >
                                                    -
                                                </button>
                                                <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                              {count}
                                            </span>
                                                <button
                                                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                    onClick={incrementCount}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div>
                                                {click ? (
                                                    <AiFillHeart size={30} className="cursor-pointer"
                                                                 onClick={() => setClick(!click)}
                                                                 color={click ? "red" : "#333"}
                                                                 title="Remove from wishlist"
                                                    />
                                                ) : (
                                                    <AiOutlineHeart size={30} className="cursor-pointer"
                                                                    onClick={() => setClick(!click)}
                                                                    color={click ? "red" : "#333"}
                                                                    title="Add to wishlist"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                            onClick={handleAddToCart}
                                        >
                                          <span className="text-[#fff] flex items-center">
                                            Add to cart <AiOutlineShoppingCart className="ml-1"/>
                                          </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ) : null
                }
            </div>
        </>
    )
}

export default ProductDetailsCard;