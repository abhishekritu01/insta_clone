// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from '../components/firebase';
// import { toast } from "react-toastify";
// import SignInwithGoogle from "./signInWIthGoogle";
// import instaIcon from "../icon.jpeg";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             console.log("User logged in Successfully");
//             window.location.href = "/home";
//             toast.success("User logged in Successfully", {
//                 position: "top-center",
//             });
//         } catch (error) {
//             console.log(error.message);

//             toast.error(error.message, {
//                 position: "bottom-center",
//             });
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//             <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
//                 <div className="flex justify-center">
//                     <img src={instaIcon} alt="Instagram" className="h-12 w-12" />
//                 </div>

//                 <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h3>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <input
//                             type="email"
//                             className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <input
//                             type="password"
//                             className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex justify-center">
//                         <button
//                             type="submit"
//                             className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 focus:outline-none focus:from-pink-600 focus:to-red-600"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>

//                 <p className="mt-4 text-center text-gray-600">
//                     New user? <a href="/register" className="text-pink-500 hover:underline">Register Here</a>
//                 </p>

//                 <div className="mt-6">
//                     <SignInwithGoogle />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;




import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from '../components/firebase';
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import instaIcon from "../icon.jpeg";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            toast.success("User logged in Successfully", {
                position: "top-center",
            });
            window.location.href = "/home";
            toast.success("User logged in Successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error.message);

            toast.error(error.message, {
                position: "top-left",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex justify-center">
                    <img src={instaIcon} alt="Instagram" className="h-12 w-12" />
                </div>

                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 focus:outline-none focus:from-pink-600 focus:to-red-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    New user? <a href="/register" className="text-pink-500 hover:underline">Register Here</a>
                </p>

                <div className="mt-6">
                    <SignInwithGoogle />
                </div>
            </div>
        </div>
    );
}

export default Login;
