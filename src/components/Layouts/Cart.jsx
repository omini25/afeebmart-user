import React, {useEffect, useState} from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, decreaseQuantity, loadCart, removeFromCart} from "../../redux/actions/cartActions.js";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


export const Cart = ({setOpenCart}) => {
    const dispatch = useDispatch();
    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    };

    let cart = useSelector(state => state.cart || []);

    const totalPrice = Array.isArray(cart) ? cart.reduce(
        (acc, item) => {
            const qty = Number(item.qty);
            const price = Number(item.price);
            if (isNaN(qty) || isNaN(price)) {
                console.error(`Invalid quantity or price for item: ${item}`);
                return acc;
            }
            return acc + qty * price;
        },
        0
    ).toFixed(2) : '0.00';




    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data));
    };

    useEffect(() => {
        let cartItems = [];
        try {
            cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error("Error parsing cart data from local storage:", error);
        }
        if (cartItems) {
            dispatch(loadCart(cartItems)); // dispatch the loadCart action
            console.log("Cart Items loaded from session storage");
            console.log(cartItems);
        } else {
            console.log("No cart items found in session storage");
        }
    }, [dispatch]);

    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[40%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
                {cart.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                            <RxCross1
                                size={25}
                                className="cursor-pointer"
                                onClick={() => setOpenCart(false)}
                            />
                        </div>
                        <h5>Cart Items is empty!</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="flex w-full justify-end pt-5 pr-5">
                                <RxCross1
                                    size={25}
                                    className="cursor-pointer"
                                    onClick={() => setOpenCart(false)}
                                />
                            </div>
                            {/* Item length */}
                            <div className={`${styles.normalFlex} p-4`}>
                                <IoBagHandleOutline size={25}/>
                                <h5 className="pl-2 text-[20px] font-[500]">
                                    {cart && cart.length} items
                                </h5>
                            </div>

                            {/* cart Single Items */}
                            <br/>
                            <div className="w-full border-t">
                                {Array.isArray(cart) && cart.map(item => (
                                    <CartSingle
                                        key={uuidv4()} // generate a new UUID for each item
                                        data={item}
                                        cart={cart}
                                        quantityChangeHandler={quantityChangeHandler}
                                        removeFromCartHandler={removeFromCartHandler}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="px-5 mb-3">
                            {/* checkout buttons */}
                            <Link to={{
                                pathname: "/checkout",
                                state: { cartDetails: cart }
                            }}>
                                <div
                                    className={`h-[45px] flex items-center justify-center w-[100%] bg-primary rounded-[5px]`}
                                >
                                    <h1 className="text-[#fff] text-[18px] font-[600]">
                                        Checkout Now (USD${totalPrice})
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const CartSingle = ({ data, cart, quantityChangeHandler }) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.price * value;
    const dispatch = useDispatch();

    const increment = (data) => {
        if (data.quantity < value) {
            toast.error("Product stock limited!");
        } else {
            setValue(value + 1);
            const updateCartData = { ...data, qty: value + 1 };
            quantityChangeHandler(updateCartData);
        }
    };

    const decrement = (data) => {
        if (value > 1) {
            setValue(value - 1);
            const updateCartData = {...data, qty: value - 1 };
            dispatch(decreaseQuantity(updateCartData));
        }
    };

    const productInCart = cart.find(item => item.id === data.id);

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));

        // Update local storage
        const updatedCart = cart.filter(item => item.id !== data.id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center relative">
                <div>
                    <div
                        className={`bg-primary border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
                        onClick={() => increment(data)}
                    >
                        <HiPlus size={18} color="#fff"/>
                    </div>
                    <span className="pl-[10px]">{data.qty}</span>
                    <div
                        className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => decrement(data)}
                    >
                        <HiOutlineMinus size={16} color="#7d879c"/>
                    </div>
                </div>
                <img
                    src={`https://afreebmart.com/images/products/${data.image}`}
                    alt=""
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.product_name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        {productInCart ? productInCart.qty : 0} products in the cart
                    </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-primary font-Roboto">
                        ${data.price}
                    </h4>
                </div>
                <div className="absolute top-0 right-0">
                    <RxCross1
                        className="cursor-pointer"
                        onClick={() => removeFromCartHandler(data)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;
