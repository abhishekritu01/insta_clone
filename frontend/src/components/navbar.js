import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ChatAltIcon, PlusCircleIcon } from '@heroicons/react/solid';
import PostPopUp from "../components/postPopUp";
import instaIcon from "../icon.jpeg";
import { auth } from "./firebase";
import UserDetails from "./UserDetails"
import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'


const Navbar = ({ userDetails }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [popUP, setPopUP] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetailsPopUp, setUserDetailsPopUp] = useState(false);
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/searchuser?name=${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                    console.log("Search results:", data);
                } else {
                    console.error("Failed to fetch search results");
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    const handleSearchResultClick = (user) => {
        setSelectedUser(user);
    };

    console.log(searchResults, "searchResults")


    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50 ">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-shrink-0">
                            <img className="block lg:hidden h-8 w-auto" src="/logo.png" alt="Logo" />
                            <img className="hidden lg:block h-8 w-auto" src={instaIcon} alt="Logo" />
                        </div>
                        <div className="hidden sm:flex sm:flex-grow space-x-4">
                            <Link to="/home" className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/profile" className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {searchResults.length > 0 && (
                                <div className="absolute mt-1 bg-white w-auto border border-gray-300 rounded-md shadow-lg z-10">
                                    {searchResults.map((result) => (
                                        <div

                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={
                                                () => {
                                                    setUserData(result)
                                                    setUserDetailsPopUp(true)
                                                }
                                            }
                                        >
                                            {result.username}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="ml-2">
                            <ChatAltIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="ml-2">
                            <PlusCircleIcon className="h-12 w-12 text-gray-400" onClick={() => setPopUP(true)} />
                        </div>
                        <div className="ml-2">
                            <img className="inline-block h-12 w-12 rounded-full" src={userDetails?.photo} alt="photo" />
                        </div>
                        <div className="ml-2">
                            <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        {/* Mobile menu button */}
                    </div>
                </div>
            </div>
            <div>
                {/* <UserDetails userDetails={selectedUser} /> */}
            </div>
            {popUP && <PostPopUp setOpen={setPopUP} popUP={popUP} setPopUP={setPopUP} userDetails={userDetails} />}
            {selectedUser && <UserDetails userDetails={selectedUser} />}
            <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/home" className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                    <Link to="/profile" className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                </div>
            </div>

            {userDetailsPopUp && (<UserDetail userDetails={userData}
                userDetailsPopUp={userDetailsPopUp}
                setUserDetailsPopUp={setUserDetailsPopUp}

            />)}

        </nav>
    );
};

export default Navbar;






const UserDetail = ({ userDetails, userDetailsPopUp, setUserDetailsPopUp }) => {
    const [open, setOpen] = useState(true);

    return (
        <Transition show={open} as={React.Fragment}>
            <Dialog
                className="relative z-10"
                onClose={() => {
                    setUserDetailsPopUp(false);
                    setOpen(false);
                }}
            >
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="flex flex-col items-center">
                                    <img
                                        className="h-24 w-24 rounded-full object-cover"
                                        src={userDetails?.photo}
                                        alt="User photo"
                                    />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">{userDetails?.username}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{userDetails?.email}</p>
                                    <p className="mt-4 text-sm text-gray-700">{userDetails?.description}</p>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="bg-pink-500 text-white w-full py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        onClick={() => {
                                            setOpen(false);
                                            setUserDetailsPopUp(false);
                                        }}
                                    >
                                        Go back to profile
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


