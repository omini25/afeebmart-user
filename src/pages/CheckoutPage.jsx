import Header from "../components/Layouts/Header.jsx";
import {CheckoutSteps} from "../components/Checkout/CheckoutSteps.jsx";
import Footer from "../components/Layouts/Footer.jsx";
import {Checkout} from "../components/Checkout/Checkout.jsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {toast} from "react-toastify";

export const CheckoutPage = () => {
    const location = useLocation();
    const cartDetails = location.state ? location.state.cartDetails : {};

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); // Access the isLoggedIn state from the local storage // Access the isLoggedIn state from the Redux store
    const navigate = useNavigate(); // Hook from react-router-dom for navigation

    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('Please login to access profile page.');
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Header />
            <br />
            <br />
            <CheckoutSteps active={1} />
            <Checkout cartDetails={cartDetails} />
            <br />
            <br />
            <Footer />
        </>
    )
}