import { Router } from 'express';
import { createPost, getAllPost, getPostCount, searchUserByName } from '../controller/post.controller.js';
import { createProfilePic, getProfilePic, follow, unfollow, followerscount } from '../controller/user.controller.js';
import { upload } from "../middleweres/multer.middleweres.js"


const router = Router();

// Apply the upload middleware to handle file uploads
router.route('/posts').post(upload.single('file'), createPost);

router.route('/posts').get(getAllPost);
router.route('/postcount').get(getPostCount);
router.route('/searchuser').get(searchUserByName);

//for profile picture
router.route('/profilePic').post(upload.single('file'), createProfilePic);
router.route('/profilePic').get(getProfilePic);


//follow user 
router.route('/follow').post(follow);
router.route('/unfollow').post(unfollow);


//count followers
router.route('/followerscount').get(followerscount);



export default router;
