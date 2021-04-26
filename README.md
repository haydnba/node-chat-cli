## Node Chat Cli

### simple command line chat with encryption

#### Libs:

- `net` for client-server communication over TCP sockets
- `readline` interface for comand-line messaging
- `crypto` for 'aes-192' encryption/decryption
- `events` for event bus managing socket connections

#### Usage:

- Run server with `node src/server.js` (port defaults to 5000)
- Run clients with `node src/client.js <your username> <your secret> <port>`

#### Features:
- messages are encrypted on the client and then broadcast by server
- messaged are decipherable only by a client registering the identical secret
- messages are displayed only if deciperable
- secure and highly inefficient 😁
