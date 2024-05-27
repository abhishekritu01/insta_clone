import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
    },
    likes: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;






