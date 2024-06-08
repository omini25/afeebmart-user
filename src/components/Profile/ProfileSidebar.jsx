import React from 'react'
import {useNavigate} from "react-router-dom";
import {RxPerson} from "react-icons/rx";
import {HiOutlineReceiptRefund, HiOutlineShoppingBag, HiOutlineUserGroup} from "react-icons/hi";
import {AiOutlineDelete, AiOutlineLogin, AiOutlineMessage} from "react-icons/ai";
import {MdOutlineTrackChanges} from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri";
import {TbAddressBook} from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions.js';
import { toast } from 'react-toastify';


export const ProfileSidebar = ({setActive, active}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        // Clear session
        sessionStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Clear Redux state
        dispatch(logout());

        // Display success message
        toast.success('Successfully logged out');

        // Redirect to main page
        navigate('/');
    };

    return (
        <>
            <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(1)}
                >
                    <RxPerson size={20} color={active === 1 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 1 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Profile
                    </span>
                </div>
                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(2)}
                >
                    <HiOutlineShoppingBag size={20} color={active === 2 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 2 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Orders
                    </span>
                </div>

                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(3)}
                >
                    <HiOutlineReceiptRefund size={20} color={active === 3 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 3 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Refunds
                    </span>
                </div>

                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(4) || navigate("/inbox")}
                >
                    <AiOutlineMessage size={20} color={active === 4 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 4 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Inbox
                    </span>
                </div>

                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(5)}
                >
                    <MdOutlineTrackChanges size={20} color={active === 5 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 5 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Track Order
                    </span>
                </div>

                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(9)}
                >
                    <HiOutlineUserGroup size={20} color={active === 9 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 6 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                        Bulk Group
                    </span>
                </div>

                <div
                    className="flex items-center cursor-pointer w-full mb-8"
                    onClick={() => setActive(7)}
                >
                    <TbAddressBook size={20} color={active === 7 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 7 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                      Address
                    </span>
                </div>

                <div
                    className="single_item flex items-center cursor-pointer w-full mb-8"
                    onClick={logoutHandler}
                >
                    <AiOutlineLogin size={20} color={active === 8 ? "#6de768" : ""}/>
                    <span
                        className={`pl-3 ${
                            active === 8 ? "text-primary" : ""
                        } 800px:block hidden`}
                    >
                  Log out
                </span>
                </div>

            </div>
        </>
    )
}
