const broadcast = (data, store, id = undefined) => {
  for (const [ key, client ] of Object.entries(store)) {
    if (id && id === key) return
    
    client.write(data)
  }
}

const register = (data, socket, store) => {
  const message = JSON.parse(data.toString())
  const { username, ts } = message

  socket.time = ts
  socket.name = username
  store[socket.id] = socket
}

module.exports = (registry) => (socket) => {

  const { counter, sockets: store } = registry
  
  socket.id = ++counter

  socket
    .setEncoding('utf8')
    .on('data', data => {
      if (!store[socket.id]) {
        register(data, socket, store)

        socket.write(`§ connected - ${new Date(ts).toLocaleTimeString()}`)
        console.log(`@${username} connected - ${ts}`)

        return
      }

      broadcast(data, socket.id, store)
    })
    .on('end', _data => {
      delete store[socket.id]

      broadcast(`§ ${socket.name}: has disconnected`, store)

      console.log(`${socket.name}/${socket.time} disconnected`)
    })
}