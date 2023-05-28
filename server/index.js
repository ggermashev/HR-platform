require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// const path = require('path')
const {Message} = require('./models/models')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)



// const WSServer = require('express-ws')(app)
// app.ws('/', (ws, res) => {
//     ws.on('message', async (msgId)=> {
//         const msg = await Message.findOne({where: {id: msgId}})
//         ws.send(`${msg.contactId} ${msg.userIdFrom} ${msg.userIdTo}`)
//         console.log(res)
//     })
//     ws.on('open', () => {
//         console.log("*")
//     })
// })

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('chat message', async (msgId) => {
        // console.log(msgId)
        const msg = await Message.findOne({where: {id: msgId}})
        io.emit('chat message', `${msg.contactId} ${msg.userIdFrom} ${msg.userIdTo}`)
    })
})
server.listen(4000, () => {
    console.log('listening on *:4000');
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()