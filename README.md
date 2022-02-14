## Node Chat Cli

### simple command-line chat with encryption

#### Libs:

- `net` for client-server communication over TCP sockets
- `readline` interface for comand-line messaging
- `crypto` for 'aes-192' encryption/decryption
- `events` for event bus managing socket connections

#### Features:
- server broadcasts all messages to all registered clients
- messages are decipherable only with shared key
- all encryption and decryption takes place on client
- messages displayed only if deciphered
- secure and inefficient 😁

#### @TODO:
- Better cli
- Shared types + stricter & less dynamic

#### Usage:

```bash
npm run build # compile output to `/dist`

npm link # publish the package locally

# see the help test
silly help

# to run the chat server
# default port: 8000
# default max listeners: Infinity
silly host <options>

# specify port
silly host 3000

# specify max listeners and port
silly host 3:4000

# to run a client
# default port: 8000
# default hostname: localhost
# requires `USERNAME` & `SECRET` envs
export USERNAME=my-username SECRET=shared-secret && silly open <options>

# specify port
export USERNAME=my-username SECRET=shared-secret && silly open 3000

# specify host
export USERNAME=my-username SECRET=shared-secret && silly open 127.0.0.1:3000

```

```bash
# expose server instance on the network with ngrok e.g.

silly host 3000 # -> run chat server on localhost 3000
...
ngrok tcp 3000 # -> tcp://<ngrok-host>:<ngrok-port> -> localhost:3000
...
silly open <ngrok-host>:<ngrok-port> # connect over the network
```

```bash
# run dockerised chat server
docker compose up # -> container port published at host port 8000
```

