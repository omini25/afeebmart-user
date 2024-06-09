import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUp from "../components/SignUp.jsx";

export const SignUpPage = () => {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            toast.error('You are already logged in and cannot access this page.');
            navigate('/'); // Redirect to home page
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <SignUp />
        </>
    )
};

export default SignUpPage;