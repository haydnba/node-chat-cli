module.exports = (counter, store) => (socket) => {

  socket.id = ++counter

  socket
    .setEncoding('utf8')
    .on('data', data => {
      if (!store[socket.id]) {
        const message = JSON.parse(data.toString())
        const { username, ts } = message

        socket.time = ts
        socket.name = username
        store[socket.id] = socket

        socket.write(`§ connected - ${new Date(ts).toLocaleTimeString()}`)
        console.log(`@${username} connected - ${ts}`)

        return
      }

      Object.entries(store).forEach(([key, client]) => {
        if (socket.id != key) client.write(data)
      })
    })
    .on('end', _data => {
      delete store[socket.id]

      Object.entries(store).forEach(([_key, client]) => {
        client.write(`§ ${socket.name}: has disconnected`)
      })

      console.log(`${socket.name}/${socket.time} disconnected`)
    })
}