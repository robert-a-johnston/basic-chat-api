const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const PORT = 3001

app.use(cors())



const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
})

io.on('connection', (socket) => {
  console.log('socket id', socket.id)
  // event of joining room named join_room from front end
  socket.on('join_room', (roomData) => {
    socket.join(roomData)
    console.log(`Socket with id: ${socket.id} joined room: ${roomData}`)
  })
  // handles message data sent from server
  socket.on('send_message', (messageData) => {
    console.log('message data from client', messageData)
    // emits message data to front end to specific room
    socket.to(messageData.room).emit('receive_message', messageData)
  })

  socket.on('disconnect', () =>{
    console.log('User disconnect', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
