import express, { json } from 'express'
import { Server } from 'socket.io';
import dbConnection from './database/dbConnection.js';
import noteModel from './database/models/note.model.js';

const app = express()
const port = 3000
app.use(json())

dbConnection()

app.get('/', (req, res) => res.status(200).json({msg: 'Hello World!'}))
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = new Server(server, {
    cors: "*"
});
io.on('connection', (socket) => {
    console.log('soccket.io connected');
    socket.on("disconnect", () => {
        console.log("app disconnected");
    })

    socket.on("load", async () => {
        const notes = await noteModel.find({});
        socket.emit("display-notes", notes)
    })

    socket.on("add-note", async (note_data) => {
        const note = await noteModel.insertMany({title: note_data.title, description: note_data.description});

        const notes = await noteModel.find({});
        socket.emit("display-notes", notes)
    })
});