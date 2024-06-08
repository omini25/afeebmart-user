import Header from "../components/Layouts/Header.jsx";
import {CheckoutSteps} from "../components/Checkout/CheckoutSteps.jsx";
import Footer from "../components/Layouts/Footer.jsx";
import {Checkout} from "../components/Checkout/Checkout.jsx";
import { useLocation } from 'react-router-dom';

export const CheckoutPage = () => {
    const location = useLocation();
    const cartDetails = location.state ? location.state.cartDetails : {};

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