## Node Chat Cli

### simple command-line chat with encryption

#### Libs:

- `net` for client-server communication over TCP sockets
- `readline` interface for comand-line messaging
- `crypto` for 'aes-192' encryption/decryption
- `events` for event bus managing socket connections

#### Usage:

- `npm run build` to output the dist to `/bin`
- `chmod u+x ./bin/cli.js` to own the executable
- Host sever with `./bin/cli.js host <port?> <max-listeners?>` (port defaults to
8000; max-listeners to ∞) e.g.
```bash
./bin/cli.js host 5678
```
- Open client connection with `./bin/cli.js open <port? | host?>` (port defaults
to 8000; hostname to 'localhost'); application expects `USER_NAME` and `SECRET`
envs e.g.
```bash
export USER_NAME=my-user-name SECRET=shared-secret-key && ./bin/cli.js open 5678
```
- Expose server instance on the network with ngrok e.g.
```bash
ngrok tcp <port> # tcp://<ngrok-host>:<ngrok-port> -> localhost:<port>
```

#### Features:
- messages encrypted on the client and broadcast by server
- messaged decipherable only on a client registering the secret
- messages displayed only if decipherable
- secure and highly inefficient 😁
