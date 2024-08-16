import {Schema, model, models} from 'mongoose';


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    avatar: {
        type: String
    },
   bookmarks: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }
   ]
}, {
    timestamps: true
});

const User = models.User || model('User', userSchema);
export default User