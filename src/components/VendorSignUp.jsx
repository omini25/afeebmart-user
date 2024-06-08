import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import axios from "axios";
import { server } from "../server";
import {toast} from "react-toastify";
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/actions/userActions';

export const VendorSignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeDiscription, setSToreDiscription] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // use the useDispatch hook to get the dispatch function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const newForm = new FormData();

        // newForm.append("file", image);
        newForm.append("name", name);
        newForm.append("password", password);
        newForm.append("email", email);

        try {
            const response = await axios.post(`${server}/vendor-register`, newForm);
            if (response.data.success) {
                // Handle successful registration
                toast.success("Registration successful!")
                dispatch(userSignup(response.data.user)); // Dispatch the userSignup action with the user's data
                navigate('/activation');
            } else {
                // Handle registration error
                toast.error("Registration failed!")
            }
        } catch (error) {
            // Handle request error
            console.error(error);
            toast.error("An error occurred while registering. Please try again.")
        }
    };

    const checkPasswordMatch = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-10 w-auto"
                                src="https://afreebmart.com/backend/images/logo/afreemart-logo.png"
                                alt="Afreebmart Logo"
                            />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign Up to Afreebmart
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-primary hover:text-secondary">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="text"
                                                type="text"
                                                autoComplete="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Store Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="storeName"
                                                name="store_name"
                                                type="text"
                                                autoComplete="name"
                                                value={storeName}
                                                onChange={e => setStoreName(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Store Description
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="storeDiscription"
                                                name="store_discription"
                                                type="text"
                                                autoComplete="name"
                                                value={storeDiscription}
                                                onChange={e => setSToreDiscription(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="image"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Upload Image
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={e => setImage(e.target.files[0])}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={visible ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                            {
                                                visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirm-password"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="confirm-password"
                                                name="confirm-password"
                                                type={visible ? 'text' : 'password'}
                                                required
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                onBlur={checkPasswordMatch}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                            {
                                                visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
};

export default VendorSignUp;