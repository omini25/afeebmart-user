import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUp from "../components/SignUp.jsx";

export const SignUpPage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            toast.error('You are already logged in and cannot access this page.');
            navigate('/'); // Redirect to home page or any other page
        }
    }, [user, navigate]);

    return (
        <>
            <SignUp />
        </>
    )
};

export default SignUpPage;