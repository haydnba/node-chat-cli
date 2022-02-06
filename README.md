## Node Chat Cli

### simple command line chat with encryption

#### Libs:

- `net` for client-server communication over TCP sockets
- `readline` interface for comand-line messaging
- `crypto` for 'aes-192' encryption/decryption
- `events` for event bus managing socket connections

#### Usage:
- Serve with `node server/app.mjs` (port defaults to 8000)
- Connect with `node client/app.mjs <your username> <your secret> <port>`

#### Features:
- messages encrypted on the client and broadcast by server
- messaged decipherable only on a client registering the secret
- messages displayed only if decipherable
- secure and highly inefficient 😁
