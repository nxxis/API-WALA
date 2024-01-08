const request = require('request');

const employee = (id, callback) => {
  const url = 'https://dummy.restapiexample.com/api/v1/employee/' + id;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('connection error');
    } else if (response.body.data == null) {
      callback('incorrect id');
    } else {
      callback(undefined, response.body.data);
    }
  });
};

module.exports = employee;
