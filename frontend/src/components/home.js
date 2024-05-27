// import React, { useEffect, useState } from "react";
// import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";
// import Navbar from './navbar'; // Import the Navbar component
// import { ThumbUpIcon } from "@heroicons/react/solid";
// import useSWR from 'swr'


// function Home() {
//     const [userDetails, setUserDetails] = useState(null);
//     const [posts, setPosts] = useState([]);
//     const [follow, setFollow] = useState(false);

//     const fetcher = (url) => fetch(url).then((res) => res.json())

//     const { data, error, isLoading } = useSWR('http://localhost:8080/api/v1/user/posts', fetcher, {
//         refreshInterval: 10000
//     });

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             console.log(user);
//             fetchUserData(user);
//         });
//         return () => unsubscribe(); // cleanup the listener on component unmount
//     }, []);

//     useEffect(() => {
//         if (data) {
//             // Map over the data array and extract required fields to set posts
//             const formattedPosts = data.map(post => ({
//                 id: post._id,
//                 username: post.username,
//                 userImage: post?.photo, // Assign post.photo to userImage
//                 imageUrl: post.image,
//                 caption: post.description,
//                 description: post.description,
//                 email: post.email

//             }));
//             setPosts(formattedPosts);
//         }
//     }, [data, userDetails]);



//     const fetchUserData = async (user) => {
//         if (user) {
//             try {
//                 const docRef = doc(db, "Users", user.uid);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     setUserDetails(docSnap.data());
//                     console.log(docSnap.data());
//                 } else {
//                     console.log("No such document!");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         } else {
//             console.log("User is not logged in");
//             setUserDetails(null); // clear user details on logout
//         }
//     };
//     // console.log(userDetails, 'userDetails');


//     const handleFollow = (post) => {

//         const followData = {
//             email: userDetails.email,
//             follow: {
//                 email: post.email,
//                 follow: true

//             }
//         }
//         fetch('http://localhost:8080/api/v1/user/follow', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(followData)
//         })
//             .then(response => response.json())
//             .then(data => {       
//                 console.log('Success:', data);
//                 setFollow(!follow);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     }


//     const handleUnfollow = (post) => {
//         const unfollowData = {
//             email: userDetails.email,
//             unfollow: {
//                 email: post.email,
//                 follow: false
//             }
//         }
//         fetch('http://localhost:8080/api/v1/user/unfollow', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(unfollowData)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//                 setFollow(!follow);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     }


//     return (
//         <>
//             <Navbar userDetails={userDetails} />
//             <div className="container mx-auto py-20">
//                 <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto"> {/* Adjusted width */}
//                     {posts.map((post) => (
//                         <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
//                             <div className="flex items-center mb-2">
//                                 <img src={post?.userImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
//                                 <p className="text-gray-700 semi-bold">{post.username}</p>
//                                 {follow && <button onClick={() => handleFollow(post)} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-md">unfollow</button>}
//                                 {!follow && <button onClick={() => handleFollow(post)} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-md">Follow</button>}
//                             </div>
//                             <img src={post.imageUrl} alt={post.caption} className="w-full h-auto mb-2" />
//                             <p className="text-gray-800">{post.description}</p> {/* Display description */}
//                             <div className="flex justify-between">
//                                 <button className="text-blue-500">
//                                     <ThumbUpIcon className="h-5 w-5" /> 3
//                                 </button>
//                                 <button className="text-blue-500">Comment</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Home;




import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from './navbar'; // Import the Navbar component
import { ThumbUpIcon } from "@heroicons/react/solid";
import useSWR from 'swr'


function Home() {
    const [userDetails, setUserDetails] = useState(null);
    const [posts, setPosts] = useState([]);


    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR('http://localhost:8080/api/v1/user/posts', fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            fetchUserData(user);
        });
        return () => unsubscribe(); // cleanup the listener on component unmount
    }, []);

    useEffect(() => {
        if (data) {
            // Map over the data array and extract required fields to set posts
            const formattedPosts = data.map(post => ({
                id: post._id,
                username: post.username,
                userImage: post?.photo, // Assign post.photo to userImage
                imageUrl: post.image,
                caption: post.description,
                description: post.description,
                email: post.email,
                followed: false // Initially, assume the user is not following the post author
            }));
            setPosts(formattedPosts);
        }
    }, [data, userDetails]);

    const fetchUserData = async (user) => {
        if (user) {
            try {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log(docSnap.data());
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


    const handleFollow = (post) => {
        const alreadyFollowing = posts.find(p => p.id === post.id && p.followed);
        if (alreadyFollowing) {
            console.log('Already following this user');
            return;
        }

        const followData = {
            email: userDetails.email,
            follow: {
                email: post.email,
                following: true
            }
        };

        fetch('http://localhost:8080/api/v1/user/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(followData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPosts(posts.map(p => p.id === post.id ? { ...p, followed: true } : p));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log('Followed:', data);
    };


    const handleUnfollow = (post) => {
        const unfollowData = {
            email: userDetails.email,
            unfollow: {
                email: post.email,
                follow: false // Assuming you want to indicate the follow status as false
            }
        };

        fetch('http://localhost:8080/api/v1/user/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unfollowData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPosts(posts.map(p => p.id === post.id ? { ...p, followed: false } : p));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <Navbar userDetails={userDetails} />
            <div className="container mx-auto py-20">
                <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto"> {/* Adjusted width */}
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-2">
                                <img src={post?.userImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
                                <p className="text-gray-700 semi-bold">{post.username}</p>
                                {post.followed ? (
                                    <button onClick={() => handleUnfollow(post)} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-md">Unfollow</button>
                                ) : (
                                    <button onClick={() => handleFollow(post)} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-md">Follow</button>
                                )}
                            </div>
                            <img src={post.imageUrl} alt={post.caption} className="w-full h-auto mb-2" />
                            <p className="text-gray-800">{post.description}</p> {/* Display description */}
                            <div className="flex justify-between">
                                <button className="text-blue-500">
                                    <ThumbUpIcon className="h-5 w-5" /> 3
                                </button>
                                <button className="text-blue-500">Comment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
