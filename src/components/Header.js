import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logoutUser } from "../utils/redux/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const handleOnClick = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            //Error page
            console.log(error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(logoutUser());
                navigate("/");
            }
        });
    }, []);

    return (
        <div className="absolute w-screen px-6 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="Logo"
                className="w-40"
            />
            <div>
                {user && (
                    <button
                        onClick={handleOnClick}
                        type="button"
                        className="m-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Log Out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
