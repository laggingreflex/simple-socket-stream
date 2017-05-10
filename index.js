const ss = require('socket.io-stream');

module.exports = (socket, send, receive) => {
  const streamSocket = ss(socket);

  // 2. receiver upon seeing this request,
  // creates a writable socket stream to which the sender can now pipe
  // and sends this steam object to the sender
  socket.on('send-file', data => {
    const stream = ss.createStream();
    streamSocket.emit('stream-file', stream, data);

    // 4. receiver can take this stream and write it to a file
    receive(stream, data);
  });


  // 3. sender now has a channel on which he can push whatever he wanted to send
  streamSocket.on('stream-file', (stream, data) => {
    send(stream, data)
  });


  // 1. sender wants to send a file - he just calls this function
  return data => socket.emit('send-file', data)
}
