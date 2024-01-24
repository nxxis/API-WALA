const socket = io();

// HTML elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const sendLocationButton = document.getElementById('send-location');
const messages = document.getElementById('messages');

// HTML templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;

socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    message: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

sendButton.addEventListener('click', () => {
  sendButton.setAttribute('disabled', 'disabled');
  socket.emit('sent', messageInput.value, (error) => {
    if (error) {
      sendButton.removeAttribute('disabled');
      return console.log(error);
    }
    sendButton.removeAttribute('disabled');
    messageInput.value = '';
    messageInput.focus();
    console.log('Message delivered');
  });
});

sendLocationButton.addEventListener('click', () => {
  sendLocationButton.setAttribute('disabled', 'disabled');
  if (!navigator.geolocation) {
    sendButton.removeAttribute('disabled');
    return alert('geo location not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'location',
      {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      },
      (error) => {
        if (error) {
          sendButton.removeAttribute('disabled');
          return console.log(error);
        }
        sendLocationButton.removeAttribute('disabled');
        console.log('location acquired');
      }
    );
  });
});
