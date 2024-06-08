import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from "../../styles/styles.js";
import {Link} from "react-router-dom";
import {AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart} from "react-icons/ai";
import { server } from "../../server.js";
import axios from 'axios';
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {BiMenuAltLeft} from "react-icons/bi";
import {DropDown} from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import {CgProfile} from "react-icons/cg";
import { useSelector } from 'react-redux';
import {Cart} from "./Cart.jsx";
import {Wishlist} from "./Wishlist.jsx";
import {RxCross1} from "react-icons/rx"; // import useSelector from react-redux

export const Header = ({activeHeading}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [productData, setProductData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const user = useSelector(state => state.user);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${server}/products`);
                setProductData(response.data.products);
            } catch (error) {
                console.error('Failed to fetch product data: ', error);
            }
        };

        fetchProductData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('access_token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`${server}/user`, config);
            }
        };
        fetchUserData();
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (Array.isArray(productData)) {
            const filteredProducts = productData.filter((product) => {
                return product.product_name.toLowerCase().includes(term.toLowerCase());
            });
            setSearchData(filteredProducts);
        } else {
            console.error('productData is not an array:', productData);
        }
    }

    window.addEventListener("scroll", () =>{
        if (window.scrollY > 70){
            setActive(true);
        }else{
            setActive(false);
        }
    })

    return (
        <>
            <div className={`${styles.section}`}>
                <div className={`hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between`}>

                    <div>
                        <Link to={`/`}>
                            <img src="https://afreebmart.com/backend/images/logo/afreemart-logo.png"
                                 alt="Afreebmart Logo" style={{width: '240px', height: '50px'}}/>
                        </Link>
                    </div>

                    {/* search box */}
                    <div className={`w-[50%] relative`}>
                        <input type="text" placeholder="Search Product ..."
                               value={searchTerm} onChange={handleSearchChange}
                               className={`h-[40px] w-full px-2 border-primary border-[2px] rounded-md`}
                        />
                        <AiOutlineSearch className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-[#333]`}/>
                        {
                            searchData && searchData.length !== 0 ? (
                                <div className={`absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full`}>
                                    {searchData && searchData.map((i, index) => {
                                        const d = i.product_name;
                                        const Product_name = d.replace(/\s+/g, "-");
                                        return (
                                            <Link to={`/product/${Product_name}`} key={index}>
                                                <div className="w-full flex items-start-py-3 mt-1">
                                                    <img src={`https://afreebmart.com/images/products/${i.image}`}
                                                         alt={i.product_name} className="w-[40px] h-[40px] mr-3"/>
                                                    <h1>{i.product_name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : null
                        }
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to="/seller">
                            <h1 className="text-white flex items-center">
                                Vendors <IoIosArrowForward className="ml-1"/>
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-primary h-[70px]`}>
                <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
                    {/* categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2"/>
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font[500] select-none rounded-t-md`}>
                                Categories
                            </button>
                            <IoIosArrowDown size={20} className="absolute right-2 top-4 cursor-pointer"
                                            onClick={() => setDropDown(!dropDown)}
                            />
                            {
                                dropDown ? (
                                    <DropDown setDropDown={setDropDown}/>
                                ) : null
                            }
                        </div>
                    </div>

                    {/* navitems */}
                    <div className={`${styles.normalFlex}`}>
                        <Navbar active={activeHeading}/>
                    </div>

                    <div className={`flex`}>
                        <div className={`${styles.normalFlex}`}>
                            <div className={`relative cursor-pointer mr-[15px]`}
                                 onClick={() => setOpenWishlist(true)}
                            >
                                <AiOutlineHeart size={30} color="text-black"/>
                                <span
                                    className="absolute right-0 top-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-secondary font-mono text-[12px] leading-tight text-center">
                                    0
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.normalFlex}`}>
                            <div className={`relative cursor-pointer mr-[15px]`}
                                 onClick={() => setOpenCart(true)}
                            >
                                <AiOutlineShoppingCart size={30} color="text-black"/>
                                <span
                                    className="absolute right-0 top-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-secondary font-mono text-[12px] leading-tight text-center">
                                    {cartItems && cartItems.cartItems ? cartItems.cartItems.length : 0}
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.normalFlex}`}>
                            <div className={`relative cursor-pointer mr-[15px]`}>
                                {user && user.user ? (
                                    <Link to={`/profile`}>
                                        <img src={`http://localhost:8000/images/users/${user.user.image}`}
                                             alt={user.user.name}
                                             className="w-[35px] h-[35px] rounded-full"/>
                                        {/*<span>{user.user.name}</span>*/}
                                    </Link>
                                ) : (
                                    <Link to={`/login`}>
                                        <CgProfile size={30} color="text-black"/>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* cart popup */}
                        {openCart ? <Cart setOpenCart={setOpenCart}/> : null}

                        {/* wishlist popup */}
                        {openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist}/>
                        ) : null}

                    </div>
                </div>
            </div>


            {/* mobile header */}
            <div
                className={`${
                    active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                }
                w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
            >
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft
                            size={40}
                            className="ml-4"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <div>
                        <Link to="/">
                            <img
                                src="https://afreebmart.com/backend/images/logo/afreemart-logo.png"
                                alt=""
                                className="mt-3 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div>
                        <div
                            className="relative mr-[20px]"
                            onClick={() => setOpenCart(true)}
                        >
                            <AiOutlineShoppingCart size={30} />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                {cartItems && cartItems.cartItems ? cartItems.cartItems.length : 0}
                            </span>
                        </div>
                    </div>
                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    {/* wishlist popup */}
                    {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
                </div>

                {/* header sidebar */}
                {open && (
                    <div
                        className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
                    >
                        <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                            <div className="w-full justify-between flex pr-3">
                                <div>
                                    <div
                                        className="relative mr-[15px]"
                                        onClick={() => setOpenWishlist(true) || setOpen(false)}
                                    >
                                        <AiOutlineHeart size={30} className="mt-5 ml-3" />
                                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                          {/*{wishlist && wishlist.length}*/}
                                        </span>
                                    </div>
                                </div>
                                <RxCross1
                                    size={30}
                                    className="ml-4 mt-5"
                                    onClick={() => setOpen(false)}
                                />
                            </div>

                            <div className="my-8 w-[92%] m-auto h-[40px relative]">
                                <input
                                    type="search"
                                    placeholder="Search Product..."
                                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchData && (
                                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                                        {searchData && searchData.map((i, index) => {
                                            const d = i.product_name;
                                            const Product_name = d.replace(/\s+/g, "-");
                                            return (
                                                <Link to={`/product/${Product_name}`} key={index}>
                                                    <div className="w-full flex items-start-py-3 mt-1">
                                                        <img src={`https://afreebmart.com/images/products/${i.image}`}
                                                             alt={i.product_name} className="w-[40px] h-[40px] mr-3"/>
                                                        <h1>{i.product_name}</h1>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <Navbar active={activeHeading} />
                            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                <Link to="/shop-create">
                                    <h1 className="text-[#fff] flex items-center">
                                        Become Seller <IoIosArrowForward className="ml-1" />
                                    </h1>
                                </Link>
                            </div>
                            <br />
                            <br />
                            <br />

                            <div className="flex w-full justify-center">
                                {user && user.user ? (
                                    <div>
                                        <Link to="/profile">
                                            <img
                                                src={`http://localhost:8000/images/users/${user.user.image}`}
                                                alt=""
                                                className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                                            />
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="text-[18px] pr-[10px] text-[#000000b7]"
                                        >
                                            Login /
                                        </Link>
                                        <Link
                                            to="/sign-up"
                                            className="text-[18px] text-[#000000b7]"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Header;