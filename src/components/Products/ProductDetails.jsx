import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import styles from "../../styles/styles.js";
import {data} from "autoprefixer";
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart} from "react-icons/ai";
import {addToCart} from "../../redux/actions/cartActions.js";
import {toast} from "react-toastify";
import Ratings from "./Raitings.jsx";
import {useDispatch} from "react-redux";

export const ProductDetails = ({product}) => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [select, setSelect] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Pass the count as a quantity to the addToCart action
        dispatch(addToCart(product.product, count));
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
        if (count < product.product.quantity) {
            setCount(count + 1);
        }
    }

    console.log(product);

    return (
        <>
            <div className="bg-white">
                {
                    product ? (
                        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                            <div className="w-full py-5">
                                <div className="block w-full 800px:flex">

                                    <div className="w-full 800px:w-[50%]">
                                        <img
                                            src={`https://afreebmart.com/images/products/${product.product.image}`}
                                            alt=""
                                            className="w-[80%]"
                                        />
                                        <div className="w-full flex">
                                            <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                                <img
                                                    src={`https://afreebmart.com/images/products/${product.product.image}`}
                                                    alt=""
                                                    className="h-[200px]"
                                                    onClick={() => setSelect(0)}
                                                />
                                            </div>
                                            <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                                                <img
                                                    src={`https://afreebmart.com/images/products/${product.product.image}`}
                                                    alt=""
                                                    className="h-[200px]"
                                                    onClick={() => setSelect(1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full 800px:w-[50%] pt-3">
                                        <h1
                                            className={`${styles.productTitle}`}>
                                            {product.product.product_name}
                                        </h1>
                                        <p className={`${styles.shop_name} mt-0.5 mb-0.5`}>
                                            {product.product.category}
                                        </p>
                                        <p>
                                            {product.product.description}
                                        </p>
                                        <div className="flex pt-3 mb-5">
                                            <h2 className={`${styles.productDiscountPrice}`}>
                                                ${product.product.price}
                                            </h2>
                                            {/*<h4 className={`${styles.price}`}>*/}
                                            {/*    ${product.product.discount ? product.product.discount + "$" : null}*/}
                                            {/*</h4>*/}

                                            <div className="flex items-center mt-12 justify-between pt-8">
                                                <div>
                                                    <button
                                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                        onClick={decrementCount}
                                                    >
                                                        -
                                                    </button>
                                                    <span
                                                        className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                                      {count}
                                                    </span>
                                                    <button
                                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                        onClick={incrementCount}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className={`pl-8`}>
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

                                        </div>
                                        <div
                                            className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                            onClick={handleAddToCart}
                                        >
                                            <span className="text-[#fff] flex items-center">
                                                Add to cart <AiOutlineShoppingCart className="ml-1"/>
                                            </span>
                                        </div>

                                        <div className={`flex items-center pt-8`}>
                                            <img src={product.image} alt=""
                                                 className={`w-[50px] h-[50px] rounded-full mr-2`}/>

                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                {product.product.store_name}
                                            </h3>
                                            <h5 className="pb-3 text-[15px]">

                                                <Ratings rating={product.product.id}/>

                                            </h5>

                                        </div>
                                        <div className={`${styles.button} bg-[#6443d1] mt-4 rounded !h-11`}>
                                            <span className="text-white flex items-center">
                                                Send Message <AiOutlineMessage className="ml-1"/>
                                            </span>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <ProductDetailsInfo product={product.product}/>

                            <br/>
                            <br/>
                        </div>
                    ) : null
                }
            </div>
        </>
    )
}

const ProductDetailsInfo = ({product}) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
                {/*<div className="relative">*/}
                {/*    <h5*/}
                {/*        className={*/}
                {/*            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"*/}
                {/*        }*/}
                {/*        onClick={() => setActive(3)}*/}
                {/*    >*/}
                {/*        Seller Information*/}
                {/*    </h5>*/}
                {/*    {active === 3 ? (*/}
                {/*        <div className={`${styles.active_indicator}`}/>*/}
                {/*    ) : null}*/}
                {/*</div>*/}
            </div>
            {active === 1 ? (
                <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        {product.description}
                    </p>
                </>
            ) : null}

                {active === 2 ? (
                    <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                        {product && product.reviews && product.reviews.map((item, index) => (
                            <div className="w-full flex my-2" key={index}>
                                <div className="pl-2 ">
                                    <div className="w-full flex items-center">
                                        <h1 className="font-[500] mr-3">{item.user.name}</h1>
                                        <Ratings rating={product.id} />
                                    </div>
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                    ))}

                    <div className="w-full flex justify-center">
                        {product && product.reviews && product.reviews.length === 0 && (
                            <h5>No Reviews have for this product!</h5>
                        )}
                    </div>
                </div>
            ) : null}

            {/*{active === 3 && (*/}
            {/*    <div className="w-full block 800px:flex p-5">*/}
            {/*        <div className="w-full 800px:w-[50%]">*/}
            {/*            <Link to={`/shop/preview/${product.store_name}`}>*/}
            {/*                <div className="flex items-center">*/}
            {/*                    <img*/}
            {/*                        src={`${product.image}`}*/}
            {/*                        className="w-[50px] h-[50px] rounded-full"*/}
            {/*                        alt=""*/}
            {/*                    />*/}
            {/*                    <div className="pl-3">*/}
            {/*                        <h3 className={`${styles.shop_name}`}>{product.store_name}</h3>*/}
            {/*                        /!*<h5 className="pb-2 text-[15px]">*!/*/}
            {/*                        /!*    ({averageRating}/5) Ratings*!/*/}
            {/*                        /!*</h5>*!/*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Link>*/}
            {/*            /!*<p className="pt-2">{data.shop.description}</p>*!/*/}
            {/*        </div>*/}
            {/*        <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">*/}
            {/*            <div className="text-left">*/}
            {/*                /!*<h5 className="font-[600]">*!/*/}
            {/*                /!*    Joined on:{" "}*!/*/}
            {/*                /!*    <span className="font-[500]">*!/*/}
            {/*                /!*      {data.shop?.createdAt?.slice(0, 10)}*!/*/}
            {/*                /!*    </span>*!/*/}
            {/*                /!*                </h5>*!/*/}
            {/*                /!*                <h5 className="font-[600] pt-3">*!/*/}
            {/*                /!*                    Total Products:{" "}*!/*/}
            {/*                /!*                    <span className="font-[500]">*!/*/}
            {/*                /!*      {products && products.length}*!/*/}
            {/*                /!*    </span>*!/*/}
            {/*                /!*</h5>*!/*/}
            {/*                <h5 className="font-[600] pt-3">*/}
            {/*                    Total Reviews:{" "}*/}
            {/*                    <span className="font-[500]">{totalReviewsLength}</span>*/}
            {/*                </h5>*/}
            {/*                <Link to="/">*/}
            {/*                    <div*/}
            {/*                        className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}*/}
            {/*                    >*/}
            {/*                        <h4 className="text-white">Visit Shop</h4>*/}
            {/*                    </div>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}




