import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary with environment variables for security
cloudinary.config({
    cloud_name: 'dt06yhhea',
    api_key: '979626664518318',
    api_secret: 'H4E7AGdsi4s307SzMk_foYs5Zc0'
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded Successfully on Cloudinary", response.url);
        fs.unlinkSync(localFilePath); // remove the file from local storage
        return response.url;
    } catch (error) {
        // If there's an error, remove the file from local storage
        fs.unlinkSync(localFilePath);
        console.log("Error uploading file on Cloudinary", error);
        return null;
    }
};
