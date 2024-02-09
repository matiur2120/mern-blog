import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'uncategorize'
    },
    image: {
        type: String,
        default: 'https://www.achieversit.com/management/uploads/blog/reactjs.png'
    }

},
{timestamps: true}
)


const Post = mongoose.model('Post', postSchema)
export default Post;