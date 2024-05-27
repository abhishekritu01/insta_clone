import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InstIcon from '../icon.jpeg';
import axios from 'axios';
import { toast } from "react-toastify";

const PostPopUp = ({ setPopUP, userDetails }) => {
    const [open, setOpen] = useState(true);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setDescription('');
        setFile(null);
        setImagePreview('');
        setLoading(false);
    };

    const handlePost = async () => {
        try {
            if (!file) {
                console.error('No file selected.');
                return;
            }

            setLoading(true);
            console.log('Preparing form data');
            const formData = new FormData();
            formData.append('file', file);
            formData.append('description', description);
            formData.append('username', userDetails?.firstName); // Include username
            formData.append('email', userDetails?.email);
            formData.append('firstName', userDetails?.firstName);
            formData.append('photo', userDetails?.photo);

            console.log('Form data:', {
                description,
                username: userDetails?.firstName,
                file: file.name
            });

            const response = await axios.post('http://localhost:8080/api/v1/user/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message, {
                position: "top-right",
            });

            console.log('Post response:', response.data);

            resetForm();
            setOpen(false);
            setPopUP(false);
        } catch (error) {
            console.error('Error posting:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            setLoading(false);
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    setPopUP(false);
                    setOpen(false);
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto">
                                        <img src={InstIcon} alt="Instagram Icon" className="w-8 h-8" />
                                    </div>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mt-2">
                                        Create New Post
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <textarea
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                            rows="3"
                                            placeholder="Write a caption..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="file"
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Image Preview" className="mx-auto max-h-80 rounded-md" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-5 w-full sm:mt-6 sm:flex sm:flex-col sm:justify-center">
                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto sm:mx-2 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}
        `}
                                        onClick={handlePost}
                                        disabled={loading}
                                    >
                                        {loading ? 'Posting...' : 'Post'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex border w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:mx-2"
                                        onClick={() => {
                                            setPopUP(false);
                                            setOpen(false);
                                            resetForm();
                                        }}
                                    >
                                        Cancel
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

export default PostPopUp;
