import {BrowserRouter,Routes,Route} from "react-router-dom";
import {
    ActivationPage,
    BulkPage, CheckoutPage,
    FAQPage,
    HomePage,
    LoginPage,
    ProductDetailsPage,
    ProductsPage, ProfilePage,
    SignUpPage
} from "./routes/Routes.js";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import {useEffect} from "react";


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            dispatch({ type: 'USER_LOGIN', payload: user }); // Load the user data from localStorage into the Redux store
        }
    }, [dispatch]);


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/activation" element={<ActivationPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:name" element={<ProductDetailsPage />} />
                    <Route path="/bulk-shop" element={<BulkPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />

                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition: Bounce
                />
            </BrowserRouter>
        </>
    );
}

export default App;