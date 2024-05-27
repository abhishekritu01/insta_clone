import User from '../model/user.model.js';
import Follower from '../model/follower.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';



export const createProfilePic = async (req, res) => {
    try {
        // Delete existing users before creating a new one
        await User.deleteMany();

        const { firstName, email, bio } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!firstName || !email || !bio) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const fileUrl = await uploadOnCloudinary(file.path);

        if (!fileUrl) {
            return res.status(500).json({ message: 'Error uploading file' });
        }

        const user = new User({
            firstName,
            email,
            bio,
            ProfilePicture: fileUrl,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', data: { firstName, email, bio, ProfilePicture: fileUrl } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
};



export const getProfilePic = async (req, res) => {
    try {
        const { email } = req.query;

        // Find the user by email address
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user found, return their profile picture data
        res.status(200).json({
            profilePicture: user.ProfilePicture,
            firstName: user.firstName,
            email: user.email,
            bio: user.bio,
        });
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        res.status(500).json({ message: 'An error occurred while fetching profile picture' });
    }
};


export const follow = async (req, res) => {
    try {
        const { email, follow } = req.body;
        console.log('Received email:', email);
        console.log('Follow status:', follow);

        const existingFollower = await Follower.findOne({ email });

        if (existingFollower) {
            // Check if already following the user
            const alreadyFollowing = existingFollower.following.find(f => f.email === follow.email);
            if (alreadyFollowing) {
                return res.status(400).json({ message: 'Already following this user' });
            }
            // If not already following, add to the following array
            existingFollower.following.push({ email: follow.email, status: true });
            await existingFollower.save();
            return res.status(200).json({
                message: 'Follow status updated successfully',
                data: { email, follow }
            });
        }

        const newFollower = new Follower({ email, following: [{ email: follow.email, status: true }] });
        await newFollower.save();

        res.status(200).json({
            message: 'Follow request received successfully',
            data: { email, follow }
        });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'An error occurred while following user' });
    }
}



export const unfollow = async (req, res) => {
    try {
        const { email } = req.body;  // Extract email from the body
        console.log('Received email for unfollow:', email);

        // Find the follower by email and delete the document
        const deletedFollower = await Follower.findOneAndDelete({ email });

        if (!deletedFollower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        res.status(200).json({
            message: 'Unfollow request processed successfully',
            data: { email, follow: false } // Assuming you want to indicate the follow status as false
        });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'An error occurred while unfollowing user' });
    }
};



export const followerscount = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email parameter is required' });
        }

        // Find the follower document by email
        const follower = await Follower.findOne({ email });

        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        // Count the number of followers
        const followerCount = follower.following.length;

        res.status(200).json({ followerCount });
    } catch (error) {
        console.error('Error counting followers:', error);
        res.status(500).json({ message: 'An error occurred while counting followers' });
    }
};





















