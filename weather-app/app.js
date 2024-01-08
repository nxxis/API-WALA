const employee = require('./utils/employee');
const deleteEmployee = require('./utils/deleteEmployee');

employee(1, (error, data) => {
  console.log('error', error);
  console.log('data', data);
});

deleteEmployee(1, (error, data) => {
  console.log('error', error);
  console.log('data', data);
});
