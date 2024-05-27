import Post from "../model/post.model.js";
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

export const createPost = async (req, res) => {
    try {
        const { description, email, firstName, photo, username } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!description || !email || !firstName || !username || !photo) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Upload the file to Cloudinary
        const fileUrl = await uploadOnCloudinary(file.path);

        if (!fileUrl) {
            return res.status(500).json({ message: 'Error uploading file' });
        }

        // Create a new post
        const post = new Post({
            description,
            email,
            firstName,
            photo,
            username, // Include username
            image: fileUrl, // Include image
        });

        // Save the post to the database
        await post.save();
        res.status(201).json({ message: 'Post created successfully', data: { description, email, firstName, photo, username, image: file.originalname } });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'An error occurred while creating the post' });
    }
};

// Get all posts
export const getAllPost = async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        // console.log('Posts:', posts);

        // Respond with the fetched posts
        res.status(200).json(posts);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'An error occurred while fetching posts' });
    }
};



// get count of all posts

export const getPostCount = async (req, res) => {
    try {
        const count = await Post.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting post count:', error);
        res.status(500).json({ message: 'An error occurred while getting post count' });
    }
}



export const searchUserByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required for searching users' });
        }

        // Perform a case-insensitive search for users with a matching username or first name
        const searchResults = await Post.find({
            $or: [
                { username: { $regex: name, $options: 'i' } },
                { firstName: { $regex: name, $options: 'i' } }
            ]
        });

        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error searching users by name:', error);
        res.status(500).json({ message: 'An error occurred while searching users' });
    }
};

