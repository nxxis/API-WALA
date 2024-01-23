const socket = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const sendLocationButton = document.getElementById('send-location-button');

socket.on('message', (message) => {
  console.log(message);

  sendButton.addEventListener('click', () => {
    socket.emit('sent', messageInput.value, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message delivered');
    });
  });
});

sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geo location not support by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('location', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  });
});
