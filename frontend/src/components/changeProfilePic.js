import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { toast } from "react-toastify";
import useSWR from 'swr';

const ChanneProfilePic = ({
    userDetails,
    changeProfilePic,
    setChangeProfilePic
}) => {
    const [open, setOpen] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [bio, setBio] = useState(userDetails.bio || '');

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const email = userDetails.email;

    // const { data, error, isLoading, mutate } = useSWR(
    //     `http://localhost:8080/api/v1/user/profilepic?email=${encodeURIComponent(email)}`,
    //     fetcher,
    //     {
    //         revalidateOnFocus: false,
    //         refreshInterval: 10000
    //     }
    // );

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select a file to upload.');
            return;
        }

        if (!bio) {
            toast.error('Please enter your bio.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('firstName', userDetails.firstName);
        formData.append('email', userDetails.email);
        formData.append('bio', bio);

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/profilePic', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Profile picture uploaded successfully');
                console.log('Profile picture uploaded successfully:', data);
                setChangeProfilePic(false);
                // Handle successful upload (e.g., update user details)
            } else {
                console.error('Failed to upload profile picture:', await response.json());
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <Transition show={open}>
            <Dialog className="relative z-10" onClose={() => {
                setOpen(false);
                setChangeProfilePic(false);
            }}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <DialogTitle>Upload Profile Picture</DialogTitle>
                                <div className="mt-2">
                                    <input type="file" onChange={handleFileChange} />
                                    {previewUrl && (
                                        <img src={previewUrl} alt="Selected Profile" className="mt-4 w-32 h-32 rounded-full object-cover" />
                                    )}
                                    <textarea
                                        className="mt-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="Enter your bio"
                                        value={bio}
                                        required={true}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleUpload}
                                    >
                                        Upload Photo
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => {
                                            setOpen(false);
                                            setChangeProfilePic(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ChanneProfilePic;
