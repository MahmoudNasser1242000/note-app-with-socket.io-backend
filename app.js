import express, { json } from 'express'
import { Server } from 'socket.io';
import dbConnection from './database/dbConnection.js';

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
});