## node-chat-cli

#### simple node command line chat with encryption
- Uses 'net' to create sever and client connections on TCP sockets, a 'readline' interface for comand-line messaging, and 'crypto' for (deprecated) encryption and decryption of messages.
- Run the server in one terminal (it is set to port 5000 by default), run clients in different instances, passing arguments for username, a secret term, and the port (5000) as follows: `node client.js <your username> <your secret> 5000`
- messages you send will be encrypted and only decipherable by another client registered with the same secret term
- clients registered with different term will see messages passed between other users as encrypted strings