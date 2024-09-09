import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: [5, "Title must be in minimum 3 characters"],
        required: true
    },
    description: {
        type: String,
        trim: true,
        minlength: [50, "Description must be in minimum 50 characters"],
        required: true
    },
});

const noteModel = mongoose.model('Note', noteSchema);
export default noteModel