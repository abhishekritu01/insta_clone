
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import instaIcon from "../icon.jpeg";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: ""
                });
            }
            console.log("User Registered Successfully!!");
            toast.success("User Registered Successfully!!", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex justify-center">
                    <img src={instaIcon} alt="Instagram" className="h-12 w-12" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h3>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>

                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="First name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Last name"
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>

                    <div>

                        <input
                            type="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 focus:outline-none focus:from-pink-600 focus:to-red-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already registered? <a href="/login" className="text-pink-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
