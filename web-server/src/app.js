const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/help', (req, res) => {
  res.send('Help page');
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
