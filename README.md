# simple-socket-stream

A simple wrapper to make [socket.io-stream] easier use. Same API works for both sender and receiver, with interchangeable roles.

[socket.io-stream]: https://github.com/nkzawa/socket.io-stream#usage

## Install

```sh
npm i simple-socket-stream
```

## Usage

```js
const sss = require('simple-stream-socket');

// For both, server:
const io = require('socket.io');
const socket = io.connect(server);
// and client:
const io = require('socket.io-client');
const socket = io.listen(3000);


// just pass it the "socket" instance and two callbacks:
const initiate = streamSocket(socket,

  // This gives you a stream onto which you send (pipe) the data
  function send(stream, filename) {
    fs.createReadStream(filename).pipe(stream)
  },

  // This gives you the received stream
  function received(stream, filename) {
    stream.pipe(fs.createWriteStream(filename));
  }
);

// The returned function initiates the whole sending/receiving process
initiate(filename)
// where "filename" is any arbitrary data which is passed to the above callbacks
```

