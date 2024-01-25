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
const sideBarTemplate = document.querySelector('#sidebar-template').innerHTML;
console.log(sideBarTemplate);

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  const newMessage = messages.lastElementChild;

  const newMessageStyle = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = messages.offsetHeight;

  const containerHeight = messages.scrollHeight;

  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('locationMessage', (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    message: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sideBarTemplate, {
    room,
    users,
  });
  document.querySelector('#sidebar').innerHTML = html;
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

socket.emit('join', username, room, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
