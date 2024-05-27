import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    ProfilePicture: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    }
});
const User = mongoose.model("User", userSchema);

export default User;