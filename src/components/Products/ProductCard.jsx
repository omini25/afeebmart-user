import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../../styles/styles.js";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { addToCart } from "../../redux/actions/cartActions.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ratings from "./Raitings.jsx";
import WishlistButton from "../Layouts/WishlistButton.jsx";


export const ProductCard = ({data}) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const d = data && data.product_name ? data.product_name : '';
    const product_name = d.replace(/\s/g, '-');

    const dispatch = useDispatch();

    const handleAddToCart = () => {
    dispatch(addToCart(data));
    toast.success("Product added to cart!");
    };


    return (
        <>
            <div className={`w-full h-{370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer`}>

                <Link to={`/product/${product_name}`}>
                    <img src={`https://afreebmart.com/images/products/${data.image}`} alt={`${product_name}`}/>
                </Link>

                <Link to="/">
                    <h5 className={`${styles.shop_name}`}>{data.store_name}</h5>
                </Link>

                <Link to={`/product/${product_name}`}>
                    <h4 className={`pb-3 font-[500]`}>
                        {data.product_name.lenght > 40 ? data.name.slice(0, 40) + "..." : data.product_name}
                    </h4>
                </Link>
                <div className="flex">
                    <Ratings data={data}/>
                </div>

                <div className={`py-2 flex items-center jsutify-between`}>
                    $
                    <h2 className="font-[400] text-[17px] text-primary">
                         {data.price}
                    </h2>
                    <div className={`flex`}>
                        {/*<h5 className={`${styles.productDiscountPrice}`}>*/}

                        {/*    {data.price === 0*/}
                        {/*        ? data.price : data.discount*/}
                        {/*    }*/}
                        {/*</h5>*/}
                        {/*<h4 className={`${styles.price}`}>*/}
                        {/*    {data.price ? data.price + "$" : null}*/}
                        {/*</h4>*/}
                    </div>
                </div>

                {/* side options */}
                <div>
                    {/*{click ? (*/}
                    {/*    <AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5"*/}
                    {/*                 onClick={() => setClick(!click)}*/}
                    {/*                 color={click ? "red" : "#333"}*/}
                    {/*                 title="Remove from wishlist"*/}
                    {/*    />*/}
                    {/*) : (*/}
                    {/*    <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5"*/}
                    {/*                    onClick={() => setClick(!click)}*/}
                    {/*                    color={click ? "red" : "#333"}*/}
                    {/*                    title="Add to wishlist"*/}
                    {/*    />*/}
                    {/*)}*/}
                    <WishlistButton productId={data.id} />

                    <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14"
                                  onClick={() => setOpen(!open)}
                                  color="#333"
                                  title="Quick view"
                    />
                    <AiOutlineShoppingCart size={25} className="cursor-pointer absolute right-2 top-24"
                                           onClick={handleAddToCart}
                                           color="#444"
                                           title="Add to cart"
                    />
                    {
                        open ? (
                            <ProductDetailsCard setOpen={setOpen} open={open} data={data}/>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCard;