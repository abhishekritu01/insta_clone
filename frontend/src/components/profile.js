import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from './navbar'; // Import the Navbar component
import useSWR from 'swr'
import ProfilePicChange from "../components/changeProfilePic.js"
import { CameraIcon } from "@heroicons/react/solid";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [posts, setPosts] = useState([]);
    const [changeProfilePic, setChangeProfilePic] = useState(false);

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error, isLoading, mutate } = useSWR('http://localhost:8080/api/v1/user/posts', fetcher, {
        revalidateOnFocus: false, // Disable re-fetch on window focus
        refreshInterval: 10000 // Refresh data every 60 seconds (adjust the interval as needed)
    });


    const email = userDetails?.email;

    const { data: profile, error: Error, isLoading: Loading, mutate: isMutate } = useSWR(
        `http://localhost:8080/api/v1/user/profilepic?email=${encodeURIComponent(email)}`,
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 10000
        }
    );



    const filteredPosts = posts.filter(post => post?.email === userDetails?.email);
    const postCount = filteredPosts.length;

    useEffect(() => {
        const fetchUserData = async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                        console.log(docSnap.data(), "Document data:");
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("User is not logged in");
                setUserDetails(null); // clear user details on logout
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            fetchUserData(user);
        });

        return () => unsubscribe(); // cleanup the listener on component unmount
    }, []);

    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar userDetails={userDetails} />

            <div className="container mx-auto mt-8 py-20">
                {changeProfilePic && <ProfilePicChange userDetails={userDetails} changeProfilePic={changeProfilePic} setChangeProfilePic={setChangeProfilePic} />}

                {userDetails ? (
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-4">
                            <div className="relative">
                                <img
                                    src={profile?.profilePicture}
                                    width={"150"}
                                    alt="profile"
                                    className="rounded-full border-4 border-pink-500"
                                />
                                <CameraIcon className="h-10 w-10 text-gray-500 absolute right-0 bottom-0 transform translate-x-2/3 -translate-y-2/3 cursor-pointer" onClick={() => setChangeProfilePic(true)} />
                            </div>
                            <div className="ml-8">
                                <h3 className="text-2xl font-bold text-gray-800">{userDetails.firstName}</h3>
                                <p className="text-gray-600">{userDetails.email}</p>
                                <p className="text-gray-600">{profile?.bio}</p>
                                <div className="flex space-x-8 mt-2">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-800">{postCount}</h4>
                                        <p className="text-gray-600">Posts</p>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-800">44</h4>
                                        <p className="text-gray-600"

                                        >Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-800">80</h4>
                                        <p className="text-gray-600">Following</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horizontal line separator */}
                        <div className="w-3/4 border-t border-gray-300 my-6" />
                        <div className="text-center mt-4">
                            <h3 className="text-2xl font-bold text-gray-800">Posts</h3>
                        </div>

                        {/* User's posts grid */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {posts.length > 0 && posts.some(post => post.email === userDetails.email) ? (
                                posts.map((post) => (
                                    post?.email === userDetails?.email ? (
                                        <div key={post._id} className="relative w-full h-60 bg-gray-300 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                            <img src={post.image} alt={post.description} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex justify-center items-center">
                                                <p className="text-white text-lg font-bold">View Post</p>
                                            </div>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                <div className="col-span-3 flex justify-center items-center h-60">
                                    <h1 className="text-5xl text-center text-gray-500">
                                        No posts ...
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;





