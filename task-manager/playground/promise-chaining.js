require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteTaskAndCount = async (id) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('659fcfe1340fefe96f47c554')
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
