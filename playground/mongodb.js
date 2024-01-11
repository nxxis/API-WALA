const { MongoClient, ObjectId } = require('mongodb-legacy');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, (error, client) => {
  if (error) {
    return console.log('Unable to conenct');
  }
  const db = client.db(databaseName);

  db.collection('users')
    .updateMany(
      {
        name: 'Gaule',
      },
      {
        $set: {
          age: 24,
        },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
