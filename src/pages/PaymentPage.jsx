import React from 'react'
import Payment from "../components/Payment/Payment";
import Footer from "../components/Layouts/Footer.jsx";
import Header from "../components/Layouts/Header.jsx";
import CheckoutSteps from "../components/Payments/CheckoutSteps.jsx";

const PaymentPage = () => {
    return (
        <div className='w-full min-h-screen bg-[#f6f9fc]'>
            <Header />
            <br />
            <br />
            <CheckoutSteps active={2} />
            <Payment />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default PaymentPage