import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/note-app(socjet-io)');
        console.log("connection database");
    } catch (error) {
        console.log("database disconnected", error);
    }
}

export default dbConnection