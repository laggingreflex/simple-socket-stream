# simple-socket-stream

A simple wrapper to make [socket.io-stream] easier to use.

Same API works for both sender and receiver, with interchangeable roles.

[socket.io-stream]: https://github.com/nkzawa/socket.io-stream#usage

## Install

```sh
npm i simple-socket-stream
```

## Usage

```js
const sss = require('simple-stream-socket');
```
```js
// Server:
const io = require('socket.io').listen(300);
io.on('connection', socket => {
  const init = sss(socket, send, receive);
});
```
```js
// Client:
const io = require('socket.io-client');
const socket = io.connect(3000);
const init = sss(socket, send, receive);

```

```js

// just pass it the "socket" instance and two callbacks:
const initiate = sss(socket,

  // This gives you a stream onto which you send (pipe) the data
  function send(stream, filename) {
    fs.createReadStream(filename).pipe(stream)
  },
  // It'll be fired after the sender calls the `initiate` method below, to stream the data to be sent

  // This gives you the received stream
  function received(stream, filename) {
    stream.pipe(fs.createWriteStream(filename));
  }
  // It'll be fired whenever the receiver gets a stream sent to it

);

// The returned function initiates the whole sending/receiving process
initiate(filename)
// where "filename" is any arbitrary data which is passed to the above callbacks
// It can be called from either server or client, whoever wants to send the file,
// and the relevant callbacks will be fired (on the relevant sides - server/client) for sending/receiving the stream.
```

