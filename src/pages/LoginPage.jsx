import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from "../components/Login.jsx";

export const LoginPage = () => {
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
            <div className={`h-screen bg-gray-50`}>
                <Login />
            </div>
        </>
    );
};