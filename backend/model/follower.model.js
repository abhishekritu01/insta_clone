import mongoose from 'mongoose';
const followerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    following: [{
        email: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Follower = mongoose.model('Follower', followerSchema);

export default Follower;