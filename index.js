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

  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`User with id: ${socket.id} joined room: ${roomId}`)
  })

  socket.on('disconnect', () =>{
    console.log('User disconnect', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
