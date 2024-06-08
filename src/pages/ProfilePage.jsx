import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layouts/Header.jsx";
import {ProfileSidebar} from "../components/Profile/ProfileSidebar.jsx";
import {ProfileContent} from "../components/Profile/ProfileContent.jsx";
import styles from "../styles/styles.js";
import {toast} from "react-toastify";

export const ProfilePage = () => {
    const [active, setActive] = useState(1);
    const user = useSelector(state => state.user); // Access the user state from the Redux store
    const navigate = useNavigate(); // Hook from react-router-dom for navigation

    // Redirect to login page if user is not logged in
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('Please login to access profile page.');
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
            </div>
        </>
    )
}